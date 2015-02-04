/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Dashboard extends view.Page {
        static sType = "s-dashboard-page";

        constructor(options: any) {
            super(options);

            this.addChild(new statoscope.bands.Toolbar(this));
        }

        cleanup(): void {
            super.cleanup();
        }

        get title(): string {
            return common.i18n.tr("Dashboard –  Statoscope");
        }
    }
}
