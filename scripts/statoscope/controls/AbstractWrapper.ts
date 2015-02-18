module statoscope.controls {
    "use strict";
    
    export class AbstractWrapper<ItemConfig>
            extends view.Container {
        static sType = "s-abstract-wrapper";

        private _moveHandle: statoscope.controls.MoveHandle;
        private _item: AbstractWrappedItem<ItemConfig>;
        private _setupButton: view.controls.IconButton;
        private _editor: view.Control;

        constructor(config: ItemConfig) {
            super();
            this.createItem(config);

            this._moveHandle = new statoscope.controls.MoveHandle();
            this._setupButton = new view.controls.IconButton("images/controls/setup.svg");
            this._setupButton.name = "setup";
            this._setupButton.onClick.addHandler(() => this.settings = !this.settings);

            this.addChild(this._moveHandle, this._setupButton);
        }

        newItem(config: ItemConfig): AbstractWrappedItem<ItemConfig> {
            throw new TypeError("Not implemented");
        }

        newEditor(): view.Control {
            throw new TypeError("Not implemented");
        }

        createItem(config: ItemConfig) {
            if (this._item) {
                this._item.cleanup();
            }

            this._item = this.newItem(config);
            this.addChild(this._item);
        }

        get item(): AbstractWrappedItem<ItemConfig> {
            return this._item;
        }

        get settings(): boolean {
            return !!this._editor;
        }

        get isNew(): boolean {
            return this.element.classList.contains("new");
        }

        set isNew(value: boolean) {
            if (value) {
                this.element.classList.add("new");
            }
            else {
                this.element.classList.remove("new");
            }
        }

        set settings(value: boolean) {
            if (value) {
                if (!this._editor) {
                    this._editor = this.newEditor();
                    this._editor.name = "editor";

                    this.addChild(this._editor);
                    this.element.classList.add("settings");
                }
            }
            else {
                if (this._editor) {
                    this._editor.cleanup();
                    this._editor = null;
                    this.element.classList.remove("settings");
                    this.isNew = false;
                }
            }
            this._setupButton.pinned = value;
        }
    }
}
