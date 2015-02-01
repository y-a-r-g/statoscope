/// <reference path="../Control.ts" />

module view.controls {
    "use strict";

    export class IconButton extends view.Control {
        static sType = "s-icon-button";

        private _clickAction: view.Action = new view.Action();
        private _icon: string;

        constructor(icon?: string) {
            super(document.createElement("button"));
            this.icon = icon;
            this.addListener(this.element, "click", this._onButtonClick);
        }

        get onClick(): view.Action {
            return this._clickAction;
        }

        private _onButtonClick(): void {
            this.onClick.trigger();
        }

        get icon(): string {
            return this._icon;
        }

        set icon(value: string) {
            this._icon = value;
            this.element.style.backgroundImage = "url('" + this._icon + "')";
        }
    }
}
