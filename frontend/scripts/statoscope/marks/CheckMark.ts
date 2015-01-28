///<reference path="factory.ts" />

module statoscope.marks {
    "use strict";

    export interface ICheckMarkConfig extends IMarkConfig {
        checked: boolean;
        label: string;
    }

    export class CheckMark extends view.Control implements IMark {
        static sType: string = "s-check-mark";

        private _checkbox: HTMLInputElement;
        private _label: HTMLLabelElement;

        constructor(config) {
            super();

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
        }

        get control(): view.Control {
            return this;
        }
    }

    registerMark("check", config => new CheckMark(config));
}
