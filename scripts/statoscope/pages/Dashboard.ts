/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Dashboard extends view.Page {
        static sType = "s-dashboard-page";

        private _dayConfig: storage.IDayConfig;
        private _dashboardConfig: storage.IDashboardConfig;

        private _root: view.Container;
        private _toolbar: statoscope.bands.Toolbar;
        private _chartPanel: statoscope.bands.ChartPanel;

        constructor(options: any) {
            super(options);

            this._root = new view.Container();

            this._toolbar = new statoscope.bands.Toolbar(this);
            this._root.addChild(this._toolbar);

            this.addChild(this._root);

            thread.synchronized((dayConfig, dashboardConfig) => {
                    //TODO check error (dayConfig[0], dashboardConfig[0])
                    this._dayConfig = dayConfig[1];
                    this._dashboardConfig = dashboardConfig[1];
                    this._chartPanel = new statoscope.bands.ChartPanel(
                        this._dashboardConfig, this._dayConfig);

                    this._root.addChild(this._chartPanel);
                },
                    callback => storage.instance().loadDayConfig(callback),
                    callback => storage.instance().loadDashboardConfig(callback));
        }

        cleanup(): void {
            super.cleanup();
        }

        get title(): string {
            return common.i18n.tr("Dashboard –  Statoscope");
        }
    }
}
