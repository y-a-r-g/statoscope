/// <reference path="AbstractButton.ts" />

module view.controls {
    "use strict";

    export class IconButton extends AbstractButton {
        static sType = "s-icon-button";

        private _icon: string;

        constructor(icon?: string) {
            super();
            this.icon = icon;
        }

        cleanup() {
            super.cleanup();
        }

        get icon(): string {
            return this._icon;
        }

        set icon(value: string) {
            this._icon = value;
            this.element.style.backgroundImage = this.icon ? "url('" + this._icon + "')" : "";
        }
    }
}
