/// <reference path="../../view/Container.ts" />

module statoscope.bands {
    "use strict";

    export class Toolbar extends view.Container {
        static sType = "s-toolbar-band";

        private _logo: statoscope.controls.Logo;
        private _loadingIndicator: statoscope.controls.LoadingIndicator;
        private _container: HTMLElement;

        constructor() {
            super();

            this._container = document.createElement("div");
            this.element.appendChild(this._container);


            this._logo = new statoscope.controls.Logo();
            this._loadingIndicator = new statoscope.controls.LoadingIndicator();

            this.addChild(this._logo);
            this.addChild(this._loadingIndicator);
        }

        get container(): HTMLElement {
            return this._container;
        }
    }
}
