///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export class NumberMark extends AbstractMark {
        static sType: string = "s-number-mark";

        private _textBox: HTMLInputElement;
        private _label: HTMLDivElement;

        constructor(config: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            this._textBox = document.createElement("input");
            this._textBox.type = "number";

            this._label = document.createElement("div");
            this._label.classList.add("label");

            super(config, dayInfo);

            this.element.appendChild(this._textBox);
            this.element.appendChild(this._label);

            this.addListener(this._textBox, "input", () => {
                this.value = this._textBox.value;
            });
            this.addListener(this._label, "click", () => {
                this._textBox.focus();
            });
        }

        cleanup(): void {
            super.cleanup();
        }

        update() {
            super.update();
            this._label.innerHTML = this.config.title;
            this._textBox.value = this.value;
        }
    }

    registerMark("number", "Numeric",
        (config, info) => new NumberMark(config, info));
}
