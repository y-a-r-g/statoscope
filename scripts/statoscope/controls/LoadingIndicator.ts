module statoscope.controls
{
    "use strict";

    export class LoadingIndicator extends view.Container {
        static sType = "s-loading-indicator";

        _counter: number = 0;

        constructor() {
            super();
            for (var i = 0; i < 5; i++) {
                this.element.appendChild(document.createElement("div"));
            }
        }

        hide(): void {
            this._counter = Math.max(0, this._counter - 1);
            if (this._counter === 0) {
                this.element.style.visibility = "hidden";
            }
        }

        show(): void {
            if (this._counter === 0) {
                this.element.style.visibility = "visible";
            }
            this._counter++;
        }
    }
}
