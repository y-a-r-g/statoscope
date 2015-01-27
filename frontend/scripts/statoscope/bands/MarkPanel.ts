module statoscope.bands {

    export interface IMarkPanelConfig {
        marks: statoscope.marks.IMarkConfig[];
    }

    export class MarkPanel extends view.Container {
        private _config: IMarkPanelConfig;
        private _marks: statoscope.marks.IMark[] = [];

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
                this._marks.push(statoscope.marks.create(markConfig));
            });
        }
    }
}
