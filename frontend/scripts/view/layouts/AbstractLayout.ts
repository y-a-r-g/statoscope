module view.layouts {
    "use strict";

    export class AbstractLayout implements view.ILayout {

        private _container: view.Container;
        private _className: string;

        constructor(className: string) {
            this._className = className;
        }

        cleanup(): void {
            this.container = null;
        }

        refresh(): void {
            throw new Error("Abstract method call");
        }

        get container(): view.Container {
            return this._container;
        }

        set container(value: view.Container): void {
            if (this._container) {
                this._container.element.classList.remove(this._className);
            }
            this._container = value;
            if (this._container) {
                this._container.element.classList.add(this._className);
            }
        }
    }
}
