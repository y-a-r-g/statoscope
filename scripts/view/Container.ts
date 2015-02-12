/// <reference path="./Control.ts" />

module view {
    "use strict";

    export class Container extends view.Control {
        static sType = "s-container";

        private _layout: ILayout;
        private _children: Control[] = [];

        constructor(layout?: ILayout, element?: HTMLElement) {
            super(element);
            this.layout = layout;
        }

        cleanup(): void {
            super.cleanup();
            this._children.forEach(child => child.cleanup());
            if (this.layout) {
                this.layout.cleanup();
            }
        }

        get container(): HTMLElement {
            return this.element;
        }

        get layout(): ILayout {
            return this._layout;
        }

        set layout(value: ILayout) {
            if (this._layout) {
                this._layout.cleanup();
            }

            this._layout = value;

            if (this._layout) {
                this._layout.container = this;
            }
        }

        relayout(): void {
            if (this.layout) {
                //TODO: make delayed
                this._layout.refresh();
                this._children.forEach(child => {
                    if (child instanceof view.Container) {
                        (<Container>child).relayout();
                    }
                });
            }
        }

        addChild(...controls: Control[]): void {
            controls.forEach(control => this.insertChild(control, this.childrenCount));
        }

        insertChild(control: Control, index: number): void {
            this.removeChild(control);
            this._children.splice(index, 0, control);
            control.parent = this;
            this.container.insertBefore(control.element, this.container.children[index]);
            this.relayout();
        }

        removeChild(control: Control): void {
            var index = this._children.indexOf(control);
            if (index !== -1) {
                this.removeChildAt(index);
            }
        }

        removeChildAt(index: number): void {
            var deleted = this._children.splice(index, 1)[0];
            this.container.removeChild(deleted.element);
            deleted.parent = null;
            this.relayout();
        }

        removeAllChildren(): void {
            this._children.forEach(child => child.detach());
        }

        get childrenCount(): number {
            return this._children.length;
        }

        hasChild(control: Control): boolean {
            return this._children.indexOf(control) !== -1;
        }

        getChildAt(index: number): Control {
            return this._children[index];
        }

        get children(): Control[] {
            return this._children;
        }
    }
}
