/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Day extends view.Page {
        private _root: view.Container;
        private _toolbar: statoscope.bands.Toolbar;

        constructor() {
            super();

            this.element.classList.add('Day');

            this._root = new view.Container(new view.layouts.VerticalLayout());
            this._toolbar = new statoscope.bands.Toolbar();
            this._root.addChild(this._toolbar);

            this.addChild(this._root);
        }

        cleanup(): void {
            super.cleanup();
        }
    }
}
