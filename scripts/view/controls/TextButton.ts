/// <reference path="AbstractButton.ts" />

module view.controls {
    "use strict";

    export class TextButton extends AbstractButton {
        static sType = "s-text-button";

        private _label: string;

        constructor(label?: string) {
            super();
            this.label = label || "";
        }

        cleanup() {
            super.cleanup();
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
