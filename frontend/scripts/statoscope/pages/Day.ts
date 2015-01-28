/// <reference path="../../view/Page.ts" />

module statoscope.pages {
    "use strict";

    export class Day extends view.Page {
        static sType = "s-day-page";

        private _date: moment.Moment;

        private _root: view.Container;
        private _toolbar: statoscope.bands.Toolbar;
        private _today: statoscope.bands.Today;
        private _markPanel: statoscope.bands.MarkPanel;


        constructor(options: any) {
            super(options);

            this._date = moment(options && options.date);

            this._root = new view.Container(new view.layouts.FreeLayout());

            this._toolbar = new statoscope.bands.Toolbar();
            this._root.addChild(this._toolbar);

            this._today = new statoscope.bands.Today(this._date);
            this._root.addChild(this._today);

            this._markPanel = new statoscope.bands.MarkPanel();
            this._markPanel.config = {
                marks: [
                    {type: "check", label: "My first check mark", checked: true},
                    {type: "check", label: "My second check mark", checked: false}
                ]
            };
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
