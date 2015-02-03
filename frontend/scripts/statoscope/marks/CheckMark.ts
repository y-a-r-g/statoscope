///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export interface ICheckMarkConfig extends storage.IMarkConfig {
        checked: boolean;
    }

    export class CheckMark extends AbstractMark {
        static sType: string = "s-check-mark";

        private _checkbox: HTMLInputElement;
        private _label: HTMLLabelElement;

        constructor(config:ICheckMarkConfig) {
            super(config);

            this._checkbox = document.createElement("input");
            this._checkbox.type = "checkbox";
            this._checkbox.id = common.Utils.getUniqueId();
            this._checkbox.checked = config.checked;
            this.element.appendChild(this._checkbox);

            this._label = document.createElement("label");
            this._label.setAttribute("for", this._checkbox.id);
            this.element.appendChild(this._label);

            this.updateTitle();
        }

        cleanup(): void {
            super.cleanup();
        }

        updateTitle() {
            super.updateTitle();
            this._label.innerHTML = this.title;
        }
    }

    registerMark("check", config => new CheckMark(<ICheckMarkConfig>config));
}
