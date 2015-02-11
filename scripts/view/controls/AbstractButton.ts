/// <reference path="../Control.ts" />

module view.controls {
    "use strict";

    export class AbstractButton extends Control {
        static sType = "s-abstract-button";
        
        private _clickAction: view.Action = new view.Action();

        constructor() {
            super(document.createElement("button"));
            this.addListener(this.element, "click", this._onButtonClick);
        }

        cleanup() {
            super.cleanup();
            this._clickAction.cleanup();
        }

        private _onButtonClick(): void {
            this.onClick.trigger();
        }

        get onClick(): view.Action {
            return this._clickAction;
        }
        
        get pinned(): boolean {
            return this.element.classList.contains("pinned");
        }
        
        set pinned(value: boolean) {
            if (value) {
                this.element.classList.add("pinned");
            }
            else {
                this.element.classList.remove("pinned");
            }
        }
        
        get disabled(): boolean {
            return this.element.disabled;
        }
        
        set disabled(value: boolean) {
            this.element.disabled = value;
        }
    }
}
