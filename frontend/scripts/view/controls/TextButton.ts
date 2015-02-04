/// <reference path="../Control.ts" />

module view.controls {
    "use strict";

    export class TextButton extends view.Control {
        static sType = "s-text-button";

        private _clickAction: view.Action = new view.Action();
        private _label: string;

        constructor(label?: string) {
            super(document.createElement("button"));
            this.label = label || "";
            this.addListener(this.element, "click", this._onButtonClick);
        }

        cleanup() {
            super.cleanup();
            this._clickAction.cleanup();
        }

        get onClick(): view.Action {
            return this._clickAction;
        }

        private _onButtonClick(): void {
            this.onClick.trigger();
        }

        get label(): string {
            return this._label;
        }

        set label(value: string) {
            this._label = value;
            this.element.innerHTML = this._label;
        }
    }
}
