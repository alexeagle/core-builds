/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BaseError, WrappedError } from '../facade/errors';
import { stringify } from '../facade/lang';
/**
 * @param {?} keys
 * @return {?}
 */
function findFirstClosedCycle(keys) {
    const /** @type {?} */ res = [];
    for (let /** @type {?} */ i = 0; i < keys.length; ++i) {
        if (res.indexOf(keys[i]) > -1) {
            res.push(keys[i]);
            return res;
        }
        res.push(keys[i]);
    }
    return res;
}
/**
 * @param {?} keys
 * @return {?}
 */
function constructResolvingPath(keys) {
    if (keys.length > 1) {
        const /** @type {?} */ reversed = findFirstClosedCycle(keys.slice().reverse());
        const /** @type {?} */ tokenStrs = reversed.map(k => stringify(k.token));
        return ' (' + tokenStrs.join(' -> ') + ')';
    }
    return '';
}
/**
 * Base class for all errors arising from misconfigured providers.
 * \@stable
 */
export class AbstractProviderError extends BaseError {
    /**
     * @param {?} injector
     * @param {?} key
     * @param {?} constructResolvingMessage
     */
    constructor(injector, key, constructResolvingMessage) {
        super('DI Error');
        this.keys = [key];
        this.injectors = [injector];
        this.constructResolvingMessage = constructResolvingMessage;
        this.message = this.constructResolvingMessage(this.keys);
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
        this.message = this.constructResolvingMessage(this.keys);
    }
}
function AbstractProviderError_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.message;
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.keys;
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.injectors;
    /**
     * \@internal
     * @type {?}
     */
    AbstractProviderError.prototype.constructResolvingMessage;
}
/**
 * Thrown when trying to retrieve a dependency by key from {\@link Injector}, but the
 * {\@link Injector} does not have a {\@link Provider} for the given key.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 * \@stable
 */
export class NoProviderError extends AbstractProviderError {
    /**
     * @param {?} injector
     * @param {?} key
     */
    constructor(injector, key) {
        super(injector, key, function (keys) {
            const first = stringify(keys[0].token);
            return `No provider for ${first}!${constructResolvingPath(keys)}`;
        });
    }
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   {provide: "one", useFactory: (two) => "two", deps: [[new Inject("two")]]},
 *   {provide: "two", useFactory: (one) => "one", deps: [[new Inject("one")]]}
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 * \@stable
 */
export class CyclicDependencyError extends AbstractProviderError {
    /**
     * @param {?} injector
     * @param {?} key
     */
    constructor(injector, key) {
        super(injector, key, function (keys) {
            return `Cannot instantiate cyclic dependency!${constructResolvingPath(keys)}`;
        });
    }
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);
 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 * \@stable
 */
export class InstantiationError extends WrappedError {
    /**
     * @param {?} injector
     * @param {?} originalException
     * @param {?} originalStack
     * @param {?} key
     */
    constructor(injector, originalException, originalStack, key) {
        super('DI Error', originalException);
        this.keys = [key];
        this.injectors = [injector];
    }
    /**
     * @param {?} injector
     * @param {?} key
     * @return {?}
     */
    addKey(injector, key) {
        this.injectors.push(injector);
        this.keys.push(key);
    }
    /**
     * @return {?}
     */
    get message() {
        const /** @type {?} */ first = stringify(this.keys[0].token);
        return `${this.originalError.message}: Error during instantiation of ${first}!${constructResolvingPath(this.keys)}.`;
    }
    /**
     * @return {?}
     */
    get causeKey() { return this.keys[0]; }
}
function InstantiationError_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    InstantiationError.prototype.keys;
    /**
     * \@internal
     * @type {?}
     */
    InstantiationError.prototype.injectors;
}
/**
 * Thrown when an object other then {\@link Provider} (or `Type`) is passed to {\@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 * \@stable
 */
export class InvalidProviderError extends BaseError {
    /**
     * @param {?} provider
     */
    constructor(provider) {
        super(`Invalid provider - only instances of Provider and Type are allowed, got: ${provider}`);
    }
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {\@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {\@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 * \@stable
 */
export class NoAnnotationError extends BaseError {
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     */
    constructor(typeOrFunc, params) {
        super(NoAnnotationError._genMessage(typeOrFunc, params));
    }
    /**
     * @param {?} typeOrFunc
     * @param {?} params
     * @return {?}
     */
    static _genMessage(typeOrFunc, params) {
        const /** @type {?} */ signature = [];
        for (let /** @type {?} */ i = 0, /** @type {?} */ ii = params.length; i < ii; i++) {
            const /** @type {?} */ parameter = params[i];
            if (!parameter || parameter.length == 0) {
                signature.push('?');
            }
            else {
                signature.push(parameter.map(stringify).join(' '));
            }
        }
        return 'Cannot resolve all parameters for \'' + stringify(typeOrFunc) + '\'(' +
            signature.join(', ') + '). ' +
            'Make sure that all the parameters are decorated with Inject or have valid type annotations and that \'' +
            stringify(typeOrFunc) + '\' is decorated with Injectable.';
    }
}
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 * \@stable
 */
export class OutOfBoundsError extends BaseError {
    /**
     * @param {?} index
     */
    constructor(index) {
        super(`Index ${index} is out-of-bounds.`);
    }
}
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   { provide: "Strings", useValue: "string1", multi: true},
 *   { provide: "Strings", useValue: "string2", multi: false}
 * ])).toThrowError();
 * ```
 */
export class MixingMultiProvidersWithRegularProvidersError extends BaseError {
    /**
     * @param {?} provider1
     * @param {?} provider2
     */
    constructor(provider1, provider2) {
        super('Cannot mix multi providers and regular providers, got: ' + provider1.toString() + ' ' +
            provider2.toString());
    }
}
//# sourceMappingURL=reflective_errors.js.map