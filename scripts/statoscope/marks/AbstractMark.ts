///<reference path="factory.ts" />
///<reference path="../../view/Control.ts" />

module statoscope.marks {
    "use strict";

    export class AbstractMark extends statoscope.controls.AbstractWrappedItem<storage.IMarkConfig> {
        static sType = "s-abstract-mark";

        private _dayInfo: utils.IDayInfo;
        private _markData: storage.IMarkData;

        constructor(config: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            super(config);
            this._dayInfo = dayInfo;

            this._dayInfo.dayData.marks.some(markData => {
                if (markData.id === this.config.id) {
                    this._markData = markData;
                    return true;
                }
            });

            if (!this._markData) {
                this._markData = {id: this.config.id, value: null};
                this._dayInfo.dayData.marks.push(this._markData);
            }

            this.update();
        }

        cleanup(): void {
            super.cleanup();
        }

        get dayInfo(): utils.IDayInfo {
            return this._dayInfo;
        }

        get value(): any {
            return this._markData.value;
        }

        set value(value: any) {
            this._markData.value = value;
            this.update();

            statoscope.storage.instance().saveDayData(this._dayInfo.date, this._dayInfo.dayData);
        }

        update() {

        }
    }
}
