///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export interface ICheckMarkConfig extends IMarkConfig {
        checked: boolean;
        label: string;
    }

    export class CheckMark extends AbstractMark {
        static sType: string = "s-check-mark";

        private _checkbox: HTMLInputElement;
        private _label: HTMLLabelElement;

        constructor(config) {
            super(config);

            this._checkbox = document.createElement("input");
            this._checkbox.type = "checkbox";
            this._checkbox.id = common.Utils.getUniqueId();
            this._checkbox.checked = config.checked;
            this.element.appendChild(this._checkbox);

            this._label = document.createElement("label");
            this._label.setAttribute("for", this._checkbox.id);
            this._label.innerText = config.label;
            this.element.appendChild(this._label);
        }

        cleanup(): void {
            super.cleanup();
        }
    }

    registerMark("check", config => new CheckMark(config));
}
