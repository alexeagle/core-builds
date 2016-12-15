import { AnimationTransitionEvent } from './animation_transition_event';
export class AnimationTransition {
    /**
     * @param {?} _player
     * @param {?} _fromState
     * @param {?} _toState
     * @param {?} _totalTime
     */
    constructor(_player, _fromState, _toState, _totalTime) {
        this._player = _player;
        this._fromState = _fromState;
        this._toState = _toState;
        this._totalTime = _totalTime;
    }
    /**
     * @param {?} phaseName
     * @return {?}
     */
    _createEvent(phaseName) {
        return new AnimationTransitionEvent({
            fromState: this._fromState,
            toState: this._toState,
            totalTime: this._totalTime,
            phaseName: phaseName
        });
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onStart(callback) {
        const /** @type {?} */ fn = (Zone.current.wrap(() => callback(this._createEvent('start')), 'player.onStart'));
        this._player.onStart(fn);
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    onDone(callback) {
        const /** @type {?} */ fn = (Zone.current.wrap(() => callback(this._createEvent('done')), 'player.onDone'));
        this._player.onDone(fn);
    }
}
function AnimationTransition_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationTransition.prototype._player;
    /** @type {?} */
    AnimationTransition.prototype._fromState;
    /** @type {?} */
    AnimationTransition.prototype._toState;
    /** @type {?} */
    AnimationTransition.prototype._totalTime;
}
//# sourceMappingURL=animation_transition.js.map