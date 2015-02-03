/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Day extends view.Page {
        static sType = "s-day-page";

        private _date: moment.Moment;

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
            this._markPanel = new statoscope.bands.MarkPanel();
            this._markPanelHeader = new statoscope.bands.MarkPanelHeader(this._markPanel);

            this._root.addChild(this._toolbar);
            this._root.addChild(this._today);
            this._root.addChild(this._markPanelHeader);
            this._root.addChild(this._markPanel);

            this.addChild(this._root);

            storage.instance().getMarkPanelConfig((err, config) => {
                if (err) {
                    //TODO: handle error
                }
                this._markPanel.config = config;
            });
        }

        cleanup(): void {
            super.cleanup();
        }

        get title(): string {
            return this._date.format("ll") + " –  Statoscope";
        }
    }
}
