module statoscope.marks {
    "use strict";

    export class MarkWrapper extends view.Container {
        static sType: string = "s-mark-wrapper";

        private _moveHandle: statoscope.controls.MoveHandle;
        private _mark: AbstractMark;
        private _controls: statoscope.controls.MarkControls;

        constructor(mark: AbstractMark) {
            super();

            this._moveHandle = new statoscope.controls.MoveHandle();
            this._controls = new statoscope.controls.MarkControls();
            this._mark = mark;

            this.addChild(this._moveHandle);
            this.addChild(this._controls);
            this.addChild(this._mark);
        }

        cleanup(): void {
            super.cleanup();
        }

        get mark(): AbstractMark {
            return this._mark;
        }
    }
}
