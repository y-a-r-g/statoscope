///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export interface IMarkPanelConfig {
        marks: statoscope.marks.IMarkConfig[];
    }

    export class MarkPanel extends view.Container {
        static sType = "s-mark-panel";

        private _config: IMarkPanelConfig;
        private _marks: statoscope.marks.IMark[] = [];
        private _editing: boolean;

        constructor() {
            super(new view.layouts.FreeLayout());
        }

        get config(): IMarkPanelConfig {
            return this._config;
        }

        set config(value: IMarkPanelConfig) {
            this._marks.forEach(mark => mark.cleanup());
            this._marks = [];

            this._config = value;

            this._config.marks.forEach(markConfig => {
                var mark = statoscope.marks.createMark(markConfig);
                this._marks.push(mark);
                this.addChild(mark.control);
            });
        }

        get editing(): boolean {
            return this._editing;
        }

        set editing(value: boolean) {
            this._editing = value;
        }
    }
}
