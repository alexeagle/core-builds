/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export let LifecycleHooks = {};
LifecycleHooks.OnInit = 0;
LifecycleHooks.OnDestroy = 1;
LifecycleHooks.DoCheck = 2;
LifecycleHooks.OnChanges = 3;
LifecycleHooks.AfterContentInit = 4;
LifecycleHooks.AfterContentChecked = 5;
LifecycleHooks.AfterViewInit = 6;
LifecycleHooks.AfterViewChecked = 7;
LifecycleHooks[LifecycleHooks.OnInit] = "OnInit";
LifecycleHooks[LifecycleHooks.OnDestroy] = "OnDestroy";
LifecycleHooks[LifecycleHooks.DoCheck] = "DoCheck";
LifecycleHooks[LifecycleHooks.OnChanges] = "OnChanges";
LifecycleHooks[LifecycleHooks.AfterContentInit] = "AfterContentInit";
LifecycleHooks[LifecycleHooks.AfterContentChecked] = "AfterContentChecked";
LifecycleHooks[LifecycleHooks.AfterViewInit] = "AfterViewInit";
LifecycleHooks[LifecycleHooks.AfterViewChecked] = "AfterViewChecked";
export var /** @type {?} */ LIFECYCLE_HOOKS_VALUES = [
    LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges,
    LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit,
    LifecycleHooks.AfterViewChecked
];
/**
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * `ngOnChanges` is called right after the data-bound properties have been checked and before view
 * and content children are checked if at least one of them has changed.
 * The `changes` parameter contains the changed properties.
 *
 * See {\@linkDocs guide/lifecycle-hooks#onchanges "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class OnChanges {
    /**
     * @abstract
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) { }
}
/**
 * initialized.
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
 * first time, and before any of its children have been checked. It is invoked only once when the
 * directive is instantiated.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class OnInit {
    /**
     * @abstract
     * @return {?}
     */
    ngOnInit() { }
}
/**
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * `ngDoCheck` gets called to check the changes in the directives in addition to the default
 * algorithm. The default change detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs.
 *
 * Note that a directive typically should not use both `DoCheck` and {\@link OnChanges} to respond to
 * changes on the same input, as `ngOnChanges` will continue to be called when the default change
 * detector detects changes.
 *
 * See {\@link KeyValueDiffers} and {\@link IterableDiffers} for implementing custom dirty checking
 * for collections.
 *
 * See {\@linkDocs guide/lifecycle-hooks#docheck "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class DoCheck {
    /**
     * @abstract
     * @return {?}
     */
    ngDoCheck() { }
}
/**
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
 * instance is destroyed.
 *
 * See {\@linkDocs guide/lifecycle-hooks "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class OnDestroy {
    /**
     * @abstract
     * @return {?}
     */
    ngOnDestroy() { }
}
/**
 *
 * initialized.
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class AfterContentInit {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterContentInit() { }
}
/**
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * See {\@linkDocs guide/lifecycle-hooks#aftercontent "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class AfterContentChecked {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterContentChecked() { }
}
/**
 * initialized.
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class AfterViewInit {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterViewInit() { }
}
/**
 * {\@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * See {\@linkDocs guide/lifecycle-hooks#afterview "Lifecycle Hooks Guide"}.
 *
 * @abstract
 */
export class AfterViewChecked {
    /**
     * @abstract
     * @return {?}
     */
    ngAfterViewChecked() { }
}
//# sourceMappingURL=lifecycle_hooks.js.map