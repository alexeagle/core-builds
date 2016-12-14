/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 *
 *
 * The default implementation of `ErrorHandler` prints error messages to the `console`. To
 * intercept error handling, write a custom exception handler that replaces this default as
 * appropriate for your app.
 *
 * ### Example
 *
 * ```
 * class MyErrorHandler implements ErrorHandler {
 *   handleError(error) {
 *     // do something with the exception
 *   }
 * }
 *
 *   providers: [{provide: ErrorHandler, useClass: MyErrorHandler}]
 * })
 * class MyModule {}
 * ```
 *
 */
export class ErrorHandler {
    /**
     * @param {?=} rethrowError
     */
    constructor(rethrowError = true) {
        /**
         * @internal
         */
        this._console = console;
        this.rethrowError = rethrowError;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    handleError(error) {
        const /** @type {?} */ originalError = this._findOriginalError(error);
        const /** @type {?} */ originalStack = this._findOriginalStack(error);
        const /** @type {?} */ context = this._findContext(error);
        this._console.error(`EXCEPTION: ${this._extractMessage(error)}`);
        if (originalError) {
            this._console.error(`ORIGINAL EXCEPTION: ${this._extractMessage(originalError)}`);
        }
        if (originalStack) {
            this._console.error('ORIGINAL STACKTRACE:');
            this._console.error(originalStack);
        }
        if (context) {
            this._console.error('ERROR CONTEXT:');
            this._console.error(context);
        }
        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        if (this.rethrowError)
            throw error;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _extractMessage(error) {
        return error instanceof Error ? error.message : error.toString();
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _findContext(error) {
        if (error) {
            return error.context ? error.context :
                this._findContext(((error)).originalError);
        }
        return null;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _findOriginalError(error) {
        let /** @type {?} */ e = ((error)).originalError;
        while (e && ((e)).originalError) {
            e = ((e)).originalError;
        }
        return e;
    }
    /**
     * @param {?} error
     * @return {?}
     */
    _findOriginalStack(error) {
        if (!(error instanceof Error))
            return null;
        let /** @type {?} */ e = error;
        let /** @type {?} */ stack = e.stack;
        while (e instanceof Error && ((e)).originalError) {
            e = ((e)).originalError;
            if (e instanceof Error && e.stack) {
                stack = e.stack;
            }
        }
        return stack;
    }
}
function ErrorHandler_tsickle_Closure_declarations() {
    /** @type {?} */
    ErrorHandler.prototype._console;
    /** @type {?} */
    ErrorHandler.prototype.rethrowError;
}
//# sourceMappingURL=error_handler.js.map