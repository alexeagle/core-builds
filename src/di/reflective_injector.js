/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { unimplemented } from '../facade/errors';
import { Injector, THROW_IF_NOT_FOUND } from './injector';
import { Self, SkipSelf } from './metadata';
import { AbstractProviderError, CyclicDependencyError, InstantiationError, NoProviderError, OutOfBoundsError } from './reflective_errors';
import { ReflectiveKey } from './reflective_key';
import { resolveReflectiveProviders } from './reflective_provider';
// Threshold for the dynamic version
const /** @type {?} */ _MAX_CONSTRUCTION_COUNTER = 10;
const /** @type {?} */ UNDEFINED = new Object();
export class ReflectiveProtoInjectorInlineStrategy {
    /**
     * @param {?} protoEI
     * @param {?} providers
     */
    constructor(protoEI, providers) {
        this.provider0 = null;
        this.provider1 = null;
        this.provider2 = null;
        this.provider3 = null;
        this.provider4 = null;
        this.provider5 = null;
        this.provider6 = null;
        this.provider7 = null;
        this.provider8 = null;
        this.provider9 = null;
        this.keyId0 = null;
        this.keyId1 = null;
        this.keyId2 = null;
        this.keyId3 = null;
        this.keyId4 = null;
        this.keyId5 = null;
        this.keyId6 = null;
        this.keyId7 = null;
        this.keyId8 = null;
        this.keyId9 = null;
        const length = providers.length;
        if (length > 0) {
            this.provider0 = providers[0];
            this.keyId0 = providers[0].key.id;
        }
        if (length > 1) {
            this.provider1 = providers[1];
            this.keyId1 = providers[1].key.id;
        }
        if (length > 2) {
            this.provider2 = providers[2];
            this.keyId2 = providers[2].key.id;
        }
        if (length > 3) {
            this.provider3 = providers[3];
            this.keyId3 = providers[3].key.id;
        }
        if (length > 4) {
            this.provider4 = providers[4];
            this.keyId4 = providers[4].key.id;
        }
        if (length > 5) {
            this.provider5 = providers[5];
            this.keyId5 = providers[5].key.id;
        }
        if (length > 6) {
            this.provider6 = providers[6];
            this.keyId6 = providers[6].key.id;
        }
        if (length > 7) {
            this.provider7 = providers[7];
            this.keyId7 = providers[7].key.id;
        }
        if (length > 8) {
            this.provider8 = providers[8];
            this.keyId8 = providers[8].key.id;
        }
        if (length > 9) {
            this.provider9 = providers[9];
            this.keyId9 = providers[9].key.id;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        if (index == 0)
            return this.provider0;
        if (index == 1)
            return this.provider1;
        if (index == 2)
            return this.provider2;
        if (index == 3)
            return this.provider3;
        if (index == 4)
            return this.provider4;
        if (index == 5)
            return this.provider5;
        if (index == 6)
            return this.provider6;
        if (index == 7)
            return this.provider7;
        if (index == 8)
            return this.provider8;
        if (index == 9)
            return this.provider9;
        throw new OutOfBoundsError(index);
    }
    /**
     * @param {?} injector
     * @return {?}
     */
    createInjectorStrategy(injector) {
        return new ReflectiveInjectorInlineStrategy(injector, this);
    }
}
function ReflectiveProtoInjectorInlineStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider0;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider1;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider2;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider3;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider4;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider5;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider6;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider7;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider8;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.provider9;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId0;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId1;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId2;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId3;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId4;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId5;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId6;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId7;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId8;
    /** @type {?} */
    ReflectiveProtoInjectorInlineStrategy.prototype.keyId9;
}
export class ReflectiveProtoInjectorDynamicStrategy {
    /**
     * @param {?} protoInj
     * @param {?} providers
     */
    constructor(protoInj, providers) {
        this.providers = providers;
        const len = providers.length;
        this.keyIds = new Array(len);
        for (let i = 0; i < len; i++) {
            this.keyIds[i] = providers[i].key.id;
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        if (index < 0 || index >= this.providers.length) {
            throw new OutOfBoundsError(index);
        }
        return this.providers[index];
    }
    /**
     * @param {?} ei
     * @return {?}
     */
    createInjectorStrategy(ei) {
        return new ReflectiveInjectorDynamicStrategy(this, ei);
    }
}
function ReflectiveProtoInjectorDynamicStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveProtoInjectorDynamicStrategy.prototype.keyIds;
    /** @type {?} */
    ReflectiveProtoInjectorDynamicStrategy.prototype.providers;
}
export class ReflectiveProtoInjector {
    /**
     * @param {?} providers
     */
    constructor(providers) {
        this.numberOfProviders = providers.length;
        this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ?
            new ReflectiveProtoInjectorDynamicStrategy(this, providers) :
            new ReflectiveProtoInjectorInlineStrategy(this, providers);
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    static fromResolvedProviders(providers) {
        return new ReflectiveProtoInjector(providers);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getProviderAtIndex(index) {
        return this._strategy.getProviderAtIndex(index);
    }
}
function ReflectiveProtoInjector_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveProtoInjector.prototype._strategy;
    /** @type {?} */
    ReflectiveProtoInjector.prototype.numberOfProviders;
}
export class ReflectiveInjectorInlineStrategy {
    /**
     * @param {?} injector
     * @param {?} protoStrategy
     */
    constructor(injector, protoStrategy) {
        this.injector = injector;
        this.protoStrategy = protoStrategy;
        this.obj0 = UNDEFINED;
        this.obj1 = UNDEFINED;
        this.obj2 = UNDEFINED;
        this.obj3 = UNDEFINED;
        this.obj4 = UNDEFINED;
        this.obj5 = UNDEFINED;
        this.obj6 = UNDEFINED;
        this.obj7 = UNDEFINED;
        this.obj8 = UNDEFINED;
        this.obj9 = UNDEFINED;
    }
    /**
     * @return {?}
     */
    resetConstructionCounter() { this.injector._constructionCounter = 0; }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateProvider(provider) {
        return this.injector._new(provider);
    }
    /**
     * @param {?} keyId
     * @return {?}
     */
    getObjByKeyId(keyId) {
        const /** @type {?} */ p = this.protoStrategy;
        const /** @type {?} */ inj = this.injector;
        if (p.keyId0 === keyId) {
            if (this.obj0 === UNDEFINED) {
                this.obj0 = inj._new(p.provider0);
            }
            return this.obj0;
        }
        if (p.keyId1 === keyId) {
            if (this.obj1 === UNDEFINED) {
                this.obj1 = inj._new(p.provider1);
            }
            return this.obj1;
        }
        if (p.keyId2 === keyId) {
            if (this.obj2 === UNDEFINED) {
                this.obj2 = inj._new(p.provider2);
            }
            return this.obj2;
        }
        if (p.keyId3 === keyId) {
            if (this.obj3 === UNDEFINED) {
                this.obj3 = inj._new(p.provider3);
            }
            return this.obj3;
        }
        if (p.keyId4 === keyId) {
            if (this.obj4 === UNDEFINED) {
                this.obj4 = inj._new(p.provider4);
            }
            return this.obj4;
        }
        if (p.keyId5 === keyId) {
            if (this.obj5 === UNDEFINED) {
                this.obj5 = inj._new(p.provider5);
            }
            return this.obj5;
        }
        if (p.keyId6 === keyId) {
            if (this.obj6 === UNDEFINED) {
                this.obj6 = inj._new(p.provider6);
            }
            return this.obj6;
        }
        if (p.keyId7 === keyId) {
            if (this.obj7 === UNDEFINED) {
                this.obj7 = inj._new(p.provider7);
            }
            return this.obj7;
        }
        if (p.keyId8 === keyId) {
            if (this.obj8 === UNDEFINED) {
                this.obj8 = inj._new(p.provider8);
            }
            return this.obj8;
        }
        if (p.keyId9 === keyId) {
            if (this.obj9 === UNDEFINED) {
                this.obj9 = inj._new(p.provider9);
            }
            return this.obj9;
        }
        return UNDEFINED;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getObjAtIndex(index) {
        if (index == 0)
            return this.obj0;
        if (index == 1)
            return this.obj1;
        if (index == 2)
            return this.obj2;
        if (index == 3)
            return this.obj3;
        if (index == 4)
            return this.obj4;
        if (index == 5)
            return this.obj5;
        if (index == 6)
            return this.obj6;
        if (index == 7)
            return this.obj7;
        if (index == 8)
            return this.obj8;
        if (index == 9)
            return this.obj9;
        throw new OutOfBoundsError(index);
    }
    /**
     * @return {?}
     */
    getMaxNumberOfObjects() { return _MAX_CONSTRUCTION_COUNTER; }
}
function ReflectiveInjectorInlineStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj0;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj1;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj2;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj3;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj4;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj5;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj6;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj7;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj8;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.obj9;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.injector;
    /** @type {?} */
    ReflectiveInjectorInlineStrategy.prototype.protoStrategy;
}
export class ReflectiveInjectorDynamicStrategy {
    /**
     * @param {?} protoStrategy
     * @param {?} injector
     */
    constructor(protoStrategy, injector) {
        this.protoStrategy = protoStrategy;
        this.injector = injector;
        this.objs = new Array(protoStrategy.providers.length).fill(UNDEFINED);
    }
    /**
     * @return {?}
     */
    resetConstructionCounter() { this.injector._constructionCounter = 0; }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateProvider(provider) {
        return this.injector._new(provider);
    }
    /**
     * @param {?} keyId
     * @return {?}
     */
    getObjByKeyId(keyId) {
        const /** @type {?} */ p = this.protoStrategy;
        for (let /** @type {?} */ i = 0; i < p.keyIds.length; i++) {
            if (p.keyIds[i] === keyId) {
                if (this.objs[i] === UNDEFINED) {
                    this.objs[i] = this.injector._new(p.providers[i]);
                }
                return this.objs[i];
            }
        }
        return UNDEFINED;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getObjAtIndex(index) {
        if (index < 0 || index >= this.objs.length) {
            throw new OutOfBoundsError(index);
        }
        return this.objs[index];
    }
    /**
     * @return {?}
     */
    getMaxNumberOfObjects() { return this.objs.length; }
}
function ReflectiveInjectorDynamicStrategy_tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveInjectorDynamicStrategy.prototype.objs;
    /** @type {?} */
    ReflectiveInjectorDynamicStrategy.prototype.protoStrategy;
    /** @type {?} */
    ReflectiveInjectorDynamicStrategy.prototype.injector;
}
/**
 * A ReflectiveDependency injection container used for instantiating objects and resolving
 * dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * \@Injectable()
 * class Engine {
 * }
 *
 * \@Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 *
 * \@stable
 * @abstract
 */
export class ReflectiveInjector {
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {\@link ResolvedReflectiveProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedReflectiveProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {\@link ReflectiveInjector#fromResolvedProviders} for more info.
     * @param {?} providers
     * @return {?}
     */
    static resolve(providers) {
        return resolveReflectiveProviders(providers);
    }
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#fromResolvedProviders}.
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static resolveAndCreate(providers, parent = null) {
        const /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    }
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = ReflectiveInjector.resolve([Car, Engine]);
     * var injector = ReflectiveInjector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     * \@experimental
     * @param {?} providers
     * @param {?=} parent
     * @return {?}
     */
    static fromResolvedProviders(providers, parent = null) {
        return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
    }
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = ReflectiveInjector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     * @return {?}
     */
    get parent() { return unimplemented(); }
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {\@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = ReflectiveInjector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {\@link Injector#resolve} and {\@link Injector#createChildFromResolved}.
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) { return unimplemented(); }
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = ReflectiveInjector.resolve([ParentProvider]);
     * var childProviders = ReflectiveInjector.resolve([ChildProvider]);
     *
     * var parent = ReflectiveInjector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) {
        return unimplemented();
    }
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) { return unimplemented(); }
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * \@Injectable()
     * class Engine {
     * }
     *
     * \@Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = ReflectiveInjector.resolveAndCreate([Engine]);
     * var carProvider = ReflectiveInjector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) { return unimplemented(); }
    /**
     * @abstract
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue) { }
}
export class ReflectiveInjector_ {
    /**
     * Private
     * @param {?} _proto
     * @param {?=} _parent
     */
    constructor(_proto /* ProtoInjector */, _parent = null) {
        /** @internal */
        this._constructionCounter = 0;
        this._proto = _proto;
        this._parent = _parent;
        this._strategy = _proto._strategy.createInjectorStrategy(this);
    }
    /**
     * @param {?} token
     * @param {?=} notFoundValue
     * @return {?}
     */
    get(token, notFoundValue = THROW_IF_NOT_FOUND) {
        return this._getByKey(ReflectiveKey.get(token), null, null, notFoundValue);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getAt(index) { return this._strategy.getObjAtIndex(index); }
    /**
     * @return {?}
     */
    get parent() { return this._parent; }
    /**
     * \@internal
     * Internal. Do not use.
     * We return `any` not to export the InjectorStrategy type.
     * @return {?}
     */
    get internalStrategy() { return this._strategy; }
    /**
     * @param {?} providers
     * @return {?}
     */
    resolveAndCreateChild(providers) {
        const /** @type {?} */ ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
        return this.createChildFromResolved(ResolvedReflectiveProviders);
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    createChildFromResolved(providers) {
        const /** @type {?} */ proto = new ReflectiveProtoInjector(providers);
        const /** @type {?} */ inj = new ReflectiveInjector_(proto);
        inj._parent = this;
        return inj;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    resolveAndInstantiate(provider) {
        return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    instantiateResolved(provider) {
        return this._instantiateProvider(provider);
    }
    /**
     * \@internal
     * @param {?} provider
     * @return {?}
     */
    _new(provider) {
        if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
            throw new CyclicDependencyError(this, provider.key);
        }
        return this._instantiateProvider(provider);
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    _instantiateProvider(provider) {
        if (provider.multiProvider) {
            const /** @type {?} */ res = new Array(provider.resolvedFactories.length);
            for (let /** @type {?} */ i = 0; i < provider.resolvedFactories.length; ++i) {
                res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
            }
            return res;
        }
        else {
            return this._instantiate(provider, provider.resolvedFactories[0]);
        }
    }
    /**
     * @param {?} provider
     * @param {?} ResolvedReflectiveFactory
     * @return {?}
     */
    _instantiate(provider, ResolvedReflectiveFactory) {
        const /** @type {?} */ factory = ResolvedReflectiveFactory.factory;
        const /** @type {?} */ deps = ResolvedReflectiveFactory.dependencies;
        const /** @type {?} */ length = deps.length;
        let /** @type {?} */ d0;
        let /** @type {?} */ d1;
        let /** @type {?} */ d2;
        let /** @type {?} */ d3;
        let /** @type {?} */ d4;
        let /** @type {?} */ d5;
        let /** @type {?} */ d6;
        let /** @type {?} */ d7;
        let /** @type {?} */ d8;
        let /** @type {?} */ d9;
        let /** @type {?} */ d10;
        let /** @type {?} */ d11;
        let /** @type {?} */ d12;
        let /** @type {?} */ d13;
        let /** @type {?} */ d14;
        let /** @type {?} */ d15;
        let /** @type {?} */ d16;
        let /** @type {?} */ d17;
        let /** @type {?} */ d18;
        let /** @type {?} */ d19;
        try {
            d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
            d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
            d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
            d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
            d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
            d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
            d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
            d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
            d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
            d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
            d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
            d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
            d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
            d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
            d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
            d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
            d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
            d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
            d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
            d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
        }
        catch (e) {
            if (e instanceof AbstractProviderError || e instanceof InstantiationError) {
                e.addKey(this, provider.key);
            }
            throw e;
        }
        let /** @type {?} */ obj;
        try {
            switch (length) {
                case 0:
                    obj = factory();
                    break;
                case 1:
                    obj = factory(d0);
                    break;
                case 2:
                    obj = factory(d0, d1);
                    break;
                case 3:
                    obj = factory(d0, d1, d2);
                    break;
                case 4:
                    obj = factory(d0, d1, d2, d3);
                    break;
                case 5:
                    obj = factory(d0, d1, d2, d3, d4);
                    break;
                case 6:
                    obj = factory(d0, d1, d2, d3, d4, d5);
                    break;
                case 7:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6);
                    break;
                case 8:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
                    break;
                case 9:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
                    break;
                case 10:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
                    break;
                case 11:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
                    break;
                case 12:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
                    break;
                case 13:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
                    break;
                case 14:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
                    break;
                case 15:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
                    break;
                case 16:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
                    break;
                case 17:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
                    break;
                case 18:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
                    break;
                case 19:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
                    break;
                case 20:
                    obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
                    break;
                default:
                    throw new Error(`Cannot instantiate '${provider.key.displayName}' because it has more than 20 dependencies`);
            }
        }
        catch (e) {
            throw new InstantiationError(this, e, e.stack, provider.key);
        }
        return obj;
    }
    /**
     * @param {?} provider
     * @param {?} dep
     * @return {?}
     */
    _getByReflectiveDependency(provider, dep) {
        return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : THROW_IF_NOT_FOUND);
    }
    /**
     * @param {?} key
     * @param {?} lowerBoundVisibility
     * @param {?} upperBoundVisibility
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKey(key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
        if (key === INJECTOR_KEY) {
            return this;
        }
        if (upperBoundVisibility instanceof Self) {
            return this._getByKeySelf(key, notFoundValue);
        }
        else {
            return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
        }
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _throwOrNull(key, notFoundValue) {
        if (notFoundValue !== THROW_IF_NOT_FOUND) {
            return notFoundValue;
        }
        else {
            throw new NoProviderError(this, key);
        }
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @return {?}
     */
    _getByKeySelf(key, notFoundValue) {
        const /** @type {?} */ obj = this._strategy.getObjByKeyId(key.id);
        return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    }
    /**
     * \@internal
     * @param {?} key
     * @param {?} notFoundValue
     * @param {?} lowerBoundVisibility
     * @return {?}
     */
    _getByKeyDefault(key, notFoundValue, lowerBoundVisibility) {
        let /** @type {?} */ inj;
        if (lowerBoundVisibility instanceof SkipSelf) {
            inj = this._parent;
        }
        else {
            inj = this;
        }
        while (inj instanceof ReflectiveInjector_) {
            const /** @type {?} */ inj_ = (inj);
            const /** @type {?} */ obj = inj_._strategy.getObjByKeyId(key.id);
            if (obj !== UNDEFINED)
                return obj;
            inj = inj_._parent;
        }
        if (inj !== null) {
            return inj.get(key.token, notFoundValue);
        }
        else {
            return this._throwOrNull(key, notFoundValue);
        }
    }
    /**
     * @return {?}
     */
    get displayName() {
        const /** @type {?} */ providers = _mapProviders(this, (b) => ' "' + b.key.displayName + '" ')
            .join(', ');
        return `ReflectiveInjector(providers: [${providers}])`;
    }
    /**
     * @return {?}
     */
    toString() { return this.displayName; }
}
function ReflectiveInjector__tsickle_Closure_declarations() {
    /** @type {?} */
    ReflectiveInjector_.prototype._strategy;
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveInjector_.prototype._constructionCounter;
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveInjector_.prototype._proto;
    /**
     * \@internal
     * @type {?}
     */
    ReflectiveInjector_.prototype._parent;
}
const /** @type {?} */ INJECTOR_KEY = ReflectiveKey.get(Injector);
/**
 * @param {?} injector
 * @param {?} fn
 * @return {?}
 */
function _mapProviders(injector, fn) {
    const /** @type {?} */ res = new Array(injector._proto.numberOfProviders);
    for (let /** @type {?} */ i = 0; i < injector._proto.numberOfProviders; ++i) {
        res[i] = fn(injector._proto.getProviderAtIndex(i));
    }
    return res;
}
//# sourceMappingURL=reflective_injector.js.map