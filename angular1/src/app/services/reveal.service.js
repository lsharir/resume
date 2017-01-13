export class RevealService {
    constructor($timeout) {
        this.$timeout = $timeout;

        this._nextSimpleId = 0;
        this._revealCount = 0;
        this._listeners = {};
    }

    init() {
        this._currentCount = 0;
    }

    execute(steps) {
        let absoluteDuration = 0;
        
        if (!Array.isArray(steps)) {
            throw new Error('RevealService: expected array!')
        }

        steps.forEach((step) => {
            let duration, count, stepFn = angular.noop;

            if (step.constructor.name === 'Function') {
                stepFn = step;
                duration = 0;
                count = 0;
            }

            if (step.constructor.name === 'WaitAndIncrement') {
                stepFn = (passedCount) => this._incEmitStepFn(passedCount);
                duration = step.duration;
                count = step.count;
            }

            this.$timeout(stepFn, absoluteDuration += duration, true, count);
        })
    }

    _incEmitStepFn (passedCount) {
        this.incCount(passedCount);
        this.emitCount();
    }

    waitAndIncrement(duration, count) {
        return new WaitAndIncrement(duration, count);
    }

    incCount(count) {
        this._revealCount += count;
    }

    emitCount() {
        for (let k in this._listeners) {
            this._listeners[k](this._revealCount);
        }
    }

    bind(listener) {
        let id = this.simpleId;
        this._listeners[id] = listener;

        return () => {
            delete this._listeners[id];
        };
    }

    get simpleId() {
        return this._nextSimpleId++;
    }
}

function WaitAndIncrement(duration, count) {
    this.duration = duration;
    this.count = Number.isInteger(count) ? count : 0;
}