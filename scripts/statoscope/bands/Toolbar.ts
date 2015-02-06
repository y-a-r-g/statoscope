/// <reference path="../../view/Container.ts" />

module statoscope.bands {
    "use strict";

    export class Toolbar extends view.Container {
        static sType = "s-toolbar-band";

        static indicator: statoscope.controls.LoadingIndicator;

        private _container: HTMLElement;

        private _logo: statoscope.controls.Logo;
        private _loadingIndicator: statoscope.controls.LoadingIndicator;

        constructor(page: view.Page) {
            super();

            this._container = document.createElement("div");
            this.element.appendChild(this._container);


            this._logo = new statoscope.controls.Logo();
            this._loadingIndicator = new statoscope.controls.LoadingIndicator();
            this._loadingIndicator.hide();

            this.addChild(this._logo);
            this.addChild(this._loadingIndicator);

            [
                {label: "Calendar", ctor: statoscope.pages.Calendar, page: "calendar"},
                {label: "Today", ctor: statoscope.pages.Day, page: "day"},
                {label: "Dashboard", ctor: statoscope.pages.Dashboard, page: "dashboard"}
            ].forEach(i => {
                    var btn = new view.controls.TextButton(common.i18n.tr(i.label));
                    if (page instanceof i.ctor) {
                        btn.element.classList.add("pressed");
                        btn.element.disabled = true;
                    }
                    btn.onClick.addHandler(() => {
                        common.Router.navigate({page: i.page});
                    });
                    this.addChild(btn);
                });

            Toolbar.indicator = this._loadingIndicator;
        }

        get container(): HTMLElement {
            return this._container;
        }
    }
}
