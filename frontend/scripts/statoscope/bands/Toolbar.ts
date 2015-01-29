/// <reference path="../../view/Container.ts" />

module statoscope.bands {
    "use strict";

    export class Toolbar extends view.Control {
        static sType = "s-toolbar-band";

        private _bar: HTMLElement;

        constructor() {
            super();
            this._bar = document.createElement("div");
            this._bar.innerHTML = "Statoscope";
            this.element.appendChild(this._bar);
        }
    }
}
