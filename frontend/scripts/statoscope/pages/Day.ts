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

            this._markPanel.config = {
                marks: [
                    {type: "check", title: "My first check mark", checked: true},
                    {type: "check", title: "My second check mark", checked: false},
                    {type: "check", title: "My third check mark", checked: true},
                    {type: "check", title: "My fourth check mark", checked: false},
                ]
            };

            this._root.addChild(this._toolbar);
            this._root.addChild(this._today);
            this._root.addChild(this._markPanelHeader);
            this._root.addChild(this._markPanel);

            this.addChild(this._root);
        }

        cleanup(): void {
            super.cleanup();
        }

        get title(): string {
            return this._date.format("ll") + " –  Statoscope";
        }
    }
}
