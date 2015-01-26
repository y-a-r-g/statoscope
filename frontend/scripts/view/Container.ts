module view {
    "use strict";

    export class Container extends Control {
        private _layout: ILayout;
        private _children: Control[] = [];

        constructor(layout: ILayout) {
            super();
            this.layout = layout;
            this.element.classList.add("Container")
        }

        cleanup(): void {
            super.cleanup();
            this._children.forEach(child => child.cleanup());
            this.layout.cleanup();
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
                this._layout.refresh();
            }
        }

        addChild(control: Control): void {
            this.insertChild(control, this.childrenCount);
        }

        insertChild(control: Control, index: number): void {
            this.removeChild(control);
            this._children.splice(index, 0, control);
            control.parent = this;
            this._layout.refresh();
        }

        removeChild(control: Control): void {
            var index = this._children.indexOf(control);
            if (index !== -1) {
                this.removeChildAt(index);
            }
        }

        removeChildAt(index: number): void {
            var deleted = this._children.splice(index, 1);
            deleted[0].parent = null;
            this._layout.refresh();
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
            return this._children.slice(0);
        }
    }
}
