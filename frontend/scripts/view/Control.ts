module view {
    "use strict";

    export interface ICleanup {
        cleanup(): void
    }

    export class Control implements ICleanup {
        private _parent: Container;
        private _element: HTMLElement;
        private _layoutSettings: ILayoutSettings;

        constructor() {
            this._element = document.createElement("div");
            this.element.classList.add("Control")
        }

        cleanup(): void {
            this.detach();
        }

        get parent(): Container {
            return this._parent;
        }

        set parent(value: Container) {
            this._parent = value;
        }

        get element(): HTMLElement {
            return this._element;
        }

        get layoutSettings(): ILayoutSettings {
            return this._layoutSettings;
        }

        set layoutSettings(value: ILayoutSettings) {
            this._layoutSettings = value;
            if (this.parent) {
                this.parent.layout.refresh();
            }
        }

        detach(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    }
}
