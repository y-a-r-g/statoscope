///<reference path="../../view/Container.ts" />

module statoscope.bands {
    "use strict";

    export class AbstractPanel<Config, ItemConfig> extends view.Container {
        static sType = "s-abstract-panel";

        private _dayConfig: storage.IDayConfig;
        private _editing: boolean;

        constructor(dayConfig: storage.IDayConfig) {
            this._dayConfig = dayConfig;
            super(new view.layouts.FlexLayout(null, true,
                view.layouts.FlexLayoutJustify.center,
                view.layouts.FlexLayoutAlign.flexStart,
                view.layouts.FlexLayoutAlign.flexStart));
        }

        createWrapper(itemConfig: ItemConfig): statoscope.controls.AbstractWrapper<ItemConfig> {
            throw new TypeError("Not implemented");
        }

        get dayConfig(): storage.IDayConfig {
            return this._dayConfig;
        }

        get editing(): boolean {
            return this._editing;
        }

        set editing(value: boolean) {
            this._editing = value;
            if (this._editing) {
                this.element.classList.add("editing");
            }
            else {
                this.element.classList.remove("editing");
                this.children.forEach(wrapper => (<any>wrapper).settings = false);
            }
        }

        addItem(itemConfig: ItemConfig, asNew?: boolean): void {
            var wrapper = this.createWrapper(itemConfig);
            this.addChild(wrapper);
            if (asNew) {
                wrapper.settings = true;
                wrapper.isNew = asNew;
            }
        }
    }
}
