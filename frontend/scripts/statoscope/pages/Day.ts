/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Day extends view.Page implements utils.IDayInfo {
        static sType = "s-day-page";

        private _date: moment.Moment;
        private _markPanelConfig: storage.IMarkPanelConfig;
        private _dayData: storage.IDayData;

        private _root: view.Container;
        private _toolbar: statoscope.bands.Toolbar;
        private _today: statoscope.bands.Today;
        private _markPanelHeader: statoscope.bands.MarkPanelHeader;
        private _markPanel: statoscope.bands.MarkPanel;

        constructor(options: any) {
            super(options);

            this._date = moment(options && options.date);
            this._root = new view.Container();

            this._toolbar = new statoscope.bands.Toolbar();
            this._today = new statoscope.bands.Today(this._date);

            this._root.addChild(this._toolbar);
            this._root.addChild(this._today);

            this.addChild(this._root);

            thread.synchronized((markPanelConfig, dayData) => {
                    //TODO check error (markPanelConfig[0], dayData[0])
                    this._markPanelConfig = markPanelConfig[1];
                    this._dayData = dayData[1];
                    this._markPanel = new statoscope.bands.MarkPanel(this._markPanelConfig, this);
                    this._markPanelHeader = new statoscope.bands.MarkPanelHeader(this._markPanel);

                    this._root.addChild(this._markPanelHeader);
                    this._root.addChild(this._markPanel);
                },
                callback => storage.instance().loadMarkPanelConfig(callback),
                callback => storage.instance().loadDayData(this.date, callback));
        }

        cleanup(): void {
            super.cleanup();
        }

        get title(): string {
            return this._date.format("ll") + " –  Statoscope";
        }

        get date(): moment.Moment {
            return this._date;
        }

        get markPanelConfig(): storage.IMarkPanelConfig {
            return this._markPanelConfig;
        }

        get dayData(): storage.IDayData {
            return this._dayData;
        }
    }
}
