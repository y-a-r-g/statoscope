///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class MarkPanel extends AbstractPanel<utils.IDayInfo, storage.IMarkConfig> {
        static sType = "s-mark-panel";
        
        private _dayInfo: utils.IDayInfo;
        
        constructor(dayInfo: utils.IDayInfo) {
            this._dayInfo = dayInfo;
            
            super(dayInfo.dayConfig);

            this.dayConfig.marks.forEach(markConfig => {
                this.addItem(markConfig);
            });
        }

        createWrapper(itemConfig: storage.IMarkConfig): statoscope.marks.MarkWrapper {
            return new statoscope.marks.MarkWrapper(itemConfig, this._dayInfo);
        }
        
        get dayInfo(): utils.IDayInfo {
            return this._dayInfo;
        }
    }
}
