/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Optional, SkipSelf } from '../../di';
import { isPresent } from '../../facade/lang';
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 */
export class KeyValueDiffers {
    /**
     * @param {?} factories
     */
    constructor(factories) {
        this.factories = factories;
    }
    /**
     * @param {?} factories
     * @param {?=} parent
     * @return {?}
     */
    static create(factories, parent) {
        if (isPresent(parent)) {
            const /** @type {?} */ copied = parent.factories.slice();
            factories = factories.concat(copied);
            return new KeyValueDiffers(factories);
        }
        else {
            return new KeyValueDiffers(factories);
        }
    }
    /**
     * Takes an array of {\@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {\@link KeyValueDiffers} instance with the provided factories and return a new
     * {\@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
     * which will only be applied to the injector for this component and its children.
     * This step is all that's required to make a new {\@link KeyValueDiffer} available.
     *
     * ### Example
     *
     * ```
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     * @param {?} factories
     * @return {?}
     */
    static extend(factories) {
        return {
            provide: KeyValueDiffers,
            useFactory: (parent) => {
                if (!parent) {
                    // Typically would occur when calling KeyValueDiffers.extend inside of dependencies passed
                    // to
                    // bootstrap(), which would override default pipes instead of extending them.
                    throw new Error('Cannot extend KeyValueDiffers without a parent injector');
                }
                return KeyValueDiffers.create(factories, parent);
            },
            // Dependency technically isn't optional, but we can provide a better error message this way.
            deps: [[KeyValueDiffers, new SkipSelf(), new Optional()]]
        };
    }
    /**
     * @param {?} kv
     * @return {?}
     */
    find(kv) {
        const /** @type {?} */ factory = this.factories.find(f => f.supports(kv));
        if (isPresent(factory)) {
            return factory;
        }
        else {
            throw new Error(`Cannot find a differ supporting object '${kv}'`);
        }
    }
}
function KeyValueDiffers_tsickle_Closure_declarations() {
    /** @type {?} */
    KeyValueDiffers.prototype.factories;
}
//# sourceMappingURL=keyvalue_differs.js.map