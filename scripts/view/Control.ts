/// <reference path="EventSubscriber.ts" />

module view {
    "use strict";

    export class Control extends EventSubscriber {
        static sType = "s-control";

        private _parent: Container;
        private _element: HTMLElement;
        private _layoutSettings: ILayoutSettings;
        private _name: string;

        constructor(element?: HTMLElement) {
            super();

            this._element = element || document.createElement("div");

            var proto = Object.getPrototypeOf(this);
            while (proto) {
                var name = proto.constructor.sType;
                if (name) {
                    this.element.classList.add(name);
                }
                proto = Object.getPrototypeOf(proto);
            }
        }

        cleanup(): void {
            this.detach();
            super.cleanup();
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
                this.parent.relayout();
            }
        }

        detach(): void {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        get name(): string {
            return this._name;
        }

        set name(value: string) {
            if (this._name) {
                this._element.classList.remove("n-" + this._name);
            }

            this._name = value;

            if (this._name) {
                this._element.classList.add("n-" + this._name);
            }
        }
        
        get title(): string {
            return this.element.title;
        }
        
        set title(value: string) {
            this.element.title = value;
        }
    }
}
