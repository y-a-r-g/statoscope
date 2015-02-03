///<reference path="factory.ts" />
///<reference path="../../view/Control.ts" />


module statoscope.marks {
    "use strict";

    export class AbstractMark extends view.Control {
        static sType: string = "s-abstract-mark";

        private _config: storage.IMarkConfig;
        private _dayInfo: utils.IDayInfo;
        private _markData: storage.IMarkData;

        constructor(config: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            super();

            this._config = config;
            this._dayInfo = dayInfo;

            this._dayInfo.dayData.marks.some(markData => {
                if (markData.id === this.config.id) {
                    this._markData = markData;
                    return true;
                }
            });

            if (!this._markData) {
                this._markData = { id: this._config.id, value: null };
                this._dayInfo.dayData.marks.push(this._markData);
            }

            this.updateTitle();
            this.updateValue();
        }

        cleanup(): void {
            super.cleanup();
        }

        get config(): storage.IMarkConfig {
            return this._config;
        }

        get dayInfo(): utils.IDayInfo {
            return this._dayInfo;
        }

        get title(): string {
            return this._config.title;
        }

        set title(value: string) {
            this._config.title = value;
            this.updateTitle();

            statoscope.storage.instance().saveMarkPanelConfig(this._dayInfo.markPanelConfig);
        }

        get value(): any {
            return this._markData.value;
        }

        set value(value: any) {
            this._markData.value = value;
            this.updateValue();

            statoscope.storage.instance().saveDayData(this._dayInfo.date, this._dayInfo.dayData);
        }

        updateTitle() {

        }

        updateValue() {

        }
    }
}
