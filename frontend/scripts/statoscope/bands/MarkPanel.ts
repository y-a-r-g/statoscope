///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class MarkPanel extends view.Container {
        static sType = "s-mark-panel";

        private _config: storage.IMarkPanelConfig;
        private _editing: boolean;

        constructor(config: storage.IMarkPanelConfig, dayInfo: utils.IDayInfo) {
            super();

            this._config = config;

            this.addChild(new statoscope.marks.MarkWrapper(new statoscope.marks.NewMark(dayInfo)));
            
            this._config.marks.forEach(markConfig => {
                this.addMark(markConfig, dayInfo);
            });
            
            if (this._config.marks.length === 0) {
                this.editing = true;
            }
        }

        get config(): storage.IMarkPanelConfig {
            return this._config;
        }

        get editing(): boolean {
            return this._editing;
        }

        set editing(value: boolean) {
            this._editing = value;
            if (this._editing) {
                this.element.classList.add("editing");
            }
            else {
                this.element.classList.remove("editing");
            }
        }
        
        addMark(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo): void {
            var mark = new statoscope.marks.MarkWrapper(
                statoscope.marks.createMark(markConfig, dayInfo));
           this.insertChild(mark, this.childrenCount - 1);
        }
    }
}
