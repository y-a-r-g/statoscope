///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export class CheckMark extends AbstractMark {
        static sType: string = "s-check-mark";

        private _toggle: HTMLDivElement;
        private _label: HTMLDivElement;

        constructor(config: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            this._toggle = document.createElement("div");
            this._toggle.appendChild(document.createElement("div"));
            this._toggle.classList.add("toggle-box");

            this._label = document.createElement("div");
            this._label.classList.add("label");

            super(config, dayInfo);

            this.element.appendChild(this._toggle);
            this.element.appendChild(this._label);

            this.addListener(this._toggle, "click", this._onToggleClick);
            this.addListener(this._label, "click", this._onToggleClick);
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
            if (!!this.value) {
                this._toggle.classList.add("on");
            }
            else {
                this._toggle.classList.remove("on");
            }
        }

        _onToggleClick() {
            this.value = !this._toggle.classList.contains("on");
        }
    }

    registerMark("check", "Binary (Yes/No)",
        (config, info) => new CheckMark(<storage.IMarkConfig>config, info));
}
