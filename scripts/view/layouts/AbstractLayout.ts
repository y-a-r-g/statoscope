module view.layouts {
    "use strict";

    export class AbstractLayout implements view.ILayout {

        private _container: view.Container;
        private _className: string;

        constructor() {
            this._className = Object.getPrototypeOf(this).constructor.sType;
        }

        cleanup(): void {
            this.container = null;
        }

        refresh(): void {
            throw new TypeError("Not implemented");
        }

        get container(): view.Container {
            return this._container;
        }

        set container(value: view.Container) {
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
