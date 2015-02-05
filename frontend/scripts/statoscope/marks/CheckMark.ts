///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export class CheckMark extends AbstractMark {
        static sType: string = "s-check-mark";

        private _checkbox: HTMLInputElement;
        private _label: HTMLLabelElement;

        constructor(config: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            this._checkbox = document.createElement("input");
            this._checkbox.type = "checkbox";
            this._checkbox.id = common.Utils.getUniqueId();

            this._label = document.createElement("label");
            this._label.setAttribute("for", this._checkbox.id);

            super(config, dayInfo);

            this.element.appendChild(this._checkbox);
            this.element.appendChild(this._label);

            this.addListener(this._checkbox, "click", this._onCheckboxClick);
        }

        cleanup(): void {
            super.cleanup();
        }

        updateTitle() {
            super.updateTitle();
            this._label.innerHTML = this.title;
        }

        updateValue() {
            super.updateValue();
            this._checkbox.checked = !!this.value;
        }

        _onCheckboxClick() {
            this.value = this._checkbox.checked;
        }
    }

    registerMark("check", "Binary (Yes/No)",
        (config, info) => new CheckMark(<storage.IMarkConfig>config, info));
}
