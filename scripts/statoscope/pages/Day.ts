/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Day extends view.Page implements utils.IDayInfo {
        static sType = "s-day-page";

        private _date: moment.Moment;
        private _dayConfig: storage.IDayConfig;
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

            this._toolbar = new statoscope.bands.Toolbar(this);
            this._today = new statoscope.bands.Today(this._date);

            this._root.addChild(this._toolbar);
            this._root.addChild(this._today);

            this.addChild(this._root);

            thread.synchronized((dayConfig, dayData) => {
                    //TODO check error (dayConfig[0], dayData[0])
                    this._dayConfig = dayConfig[1];
                    this._dayData = dayData[1];
                    this._markPanel = new statoscope.bands.MarkPanel(this._dayConfig, this);
                    this._markPanelHeader = new statoscope.bands.MarkPanelHeader(this._markPanel);

                    this._root.addChild(this._markPanelHeader);
                    this._root.addChild(this._markPanel);
                },
                callback => storage.instance().loadDayConfig(callback),
                callback => storage.instance().loadDayData(this.date, callback));
        }

        cleanup(): void {
            super.cleanup();
        }

        get title(): string {
            return this._date.format("ll") + common.i18n.tr(" –  Statoscope");
        }

        get date(): moment.Moment {
            return this._date;
        }

        get dayConfig(): storage.IDayConfig {
            return this._dayConfig;
        }

        get dayData(): storage.IDayData {
            return this._dayData;
        }

        addMark(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo): void {
            this._markPanel.addMark(markConfig, dayInfo);
        }
    }
}
