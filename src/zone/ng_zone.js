/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '../facade/async';
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {\@link runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {\@link run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example
 * ```
 * import {Component, NgZone} from '\@angular/core';
 * import {NgIf} from '\@angular/common';
 *
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 */
export class NgZone {
    /**
     * @param {?} __0
     */
    constructor({ enableLongStackTrace = false }) {
        this._hasPendingMicrotasks = false;
        this._hasPendingMacrotasks = false;
        this._isStable = true;
        this._nesting = 0;
        this._onUnstable = new EventEmitter(false);
        this._onMicrotaskEmpty = new EventEmitter(false);
        this._onStable = new EventEmitter(false);
        this._onErrorEvents = new EventEmitter(false);
        if (typeof Zone == 'undefined') {
            throw new Error('Angular requires Zone.js prolyfill.');
        }
        Zone.assertZonePatched();
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
            this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (enableLongStackTrace && Zone['longStackTraceZoneSpec']) {
            this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.forkInnerZoneWithAngularBehavior();
    }
    /**
     * @return {?}
     */
    static isInAngularZone() { return Zone.current.get('isAngularZone') === true; }
    /**
     * @return {?}
     */
    static assertInAngularZone() {
        if (!NgZone.isInAngularZone()) {
            throw new Error('Expected to be in Angular Zone, but it is not!');
        }
    }
    /**
     * @return {?}
     */
    static assertNotInAngularZone() {
        if (NgZone.isInAngularZone()) {
            throw new Error('Expected to not be in Angular Zone, but it is!');
        }
    }
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {\@link runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     * @param {?} fn
     * @return {?}
     */
    run(fn) { return this.inner.run(fn); }
    /**
     * Same as `run`, except that synchronous errors are caught and forwarded via `onError` and not
     * rethrown.
     * @param {?} fn
     * @return {?}
     */
    runGuarded(fn) { return this.inner.runGuarded(fn); }
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {\@link run} to reenter the Angular zone and do work that updates the application model.
     * @param {?} fn
     * @return {?}
     */
    runOutsideAngular(fn) { return this.outer.run(fn); }
    /**
     * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
     * @return {?}
     */
    get onUnstable() { return this._onUnstable; }
    /**
     * Notifies when there is no more microtasks enqueue in the current VM Turn.
     * This is a hint for Angular to do change detection, which may enqueue more microtasks.
     * For this reason this event can fire multiple times per VM Turn.
     * @return {?}
     */
    get onMicrotaskEmpty() { return this._onMicrotaskEmpty; }
    /**
     * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
     * implies we are about to relinquish VM turn.
     * This event gets called just once.
     * @return {?}
     */
    get onStable() { return this._onStable; }
    /**
     * Notify that an error has been delivered.
     * @return {?}
     */
    get onError() { return this._onErrorEvents; }
    /**
     * Whether there are no outstanding microtasks or macrotasks.
     * @return {?}
     */
    get isStable() { return this._isStable; }
    /**
     * @return {?}
     */
    get hasPendingMicrotasks() { return this._hasPendingMicrotasks; }
    /**
     * @return {?}
     */
    get hasPendingMacrotasks() { return this._hasPendingMacrotasks; }
    /**
     * @return {?}
     */
    checkStable() {
        if (this._nesting == 0 && !this._hasPendingMicrotasks && !this._isStable) {
            try {
                this._nesting++;
                this._onMicrotaskEmpty.emit(null);
            }
            finally {
                this._nesting--;
                if (!this._hasPendingMicrotasks) {
                    try {
                        this.runOutsideAngular(() => this._onStable.emit(null));
                    }
                    finally {
                        this._isStable = true;
                    }
                }
            }
        }
    }
    /**
     * @return {?}
     */
    forkInnerZoneWithAngularBehavior() {
        this.inner = this.inner.fork({
            name: 'angular',
            properties: /** @type {?} */ ({ 'isAngularZone': true }),
            onInvokeTask: (delegate, current, target, task, applyThis, applyArgs) => {
                try {
                    this.onEnter();
                    return delegate.invokeTask(target, task, applyThis, applyArgs);
                }
                finally {
                    this.onLeave();
                }
            },
            onInvoke: (delegate, current, target, callback, applyThis, applyArgs, source) => {
                try {
                    this.onEnter();
                    return delegate.invoke(target, callback, applyThis, applyArgs, source);
                }
                finally {
                    this.onLeave();
                }
            },
            onHasTask: (delegate, current, target, hasTaskState) => {
                delegate.hasTask(target, hasTaskState);
                if (current === target) {
                    // We are only interested in hasTask events which originate from our zone
                    // (A child hasTask event is not interesting to us)
                    if (hasTaskState.change == 'microTask') {
                        this.setHasMicrotask(hasTaskState.microTask);
                    }
                    else if (hasTaskState.change == 'macroTask') {
                        this.setHasMacrotask(hasTaskState.macroTask);
                    }
                }
            },
            onHandleError: (delegate, current, target, error) => {
                delegate.handleError(target, error);
                this.triggerError(error);
                return false;
            }
        });
    }
    /**
     * @return {?}
     */
    onEnter() {
        this._nesting++;
        if (this._isStable) {
            this._isStable = false;
            this._onUnstable.emit(null);
        }
    }
    /**
     * @return {?}
     */
    onLeave() {
        this._nesting--;
        this.checkStable();
    }
    /**
     * @param {?} hasMicrotasks
     * @return {?}
     */
    setHasMicrotask(hasMicrotasks) {
        this._hasPendingMicrotasks = hasMicrotasks;
        this.checkStable();
    }
    /**
     * @param {?} hasMacrotasks
     * @return {?}
     */
    setHasMacrotask(hasMacrotasks) { this._hasPendingMacrotasks = hasMacrotasks; }
    /**
     * @param {?} error
     * @return {?}
     */
    triggerError(error) { this._onErrorEvents.emit(error); }
}
function NgZone_tsickle_Closure_declarations() {
    /** @type {?} */
    NgZone.prototype.outer;
    /** @type {?} */
    NgZone.prototype.inner;
    /** @type {?} */
    NgZone.prototype._hasPendingMicrotasks;
    /** @type {?} */
    NgZone.prototype._hasPendingMacrotasks;
    /** @type {?} */
    NgZone.prototype._isStable;
    /** @type {?} */
    NgZone.prototype._nesting;
    /** @type {?} */
    NgZone.prototype._onUnstable;
    /** @type {?} */
    NgZone.prototype._onMicrotaskEmpty;
    /** @type {?} */
    NgZone.prototype._onStable;
    /** @type {?} */
    NgZone.prototype._onErrorEvents;
}
//# sourceMappingURL=ng_zone.js.map