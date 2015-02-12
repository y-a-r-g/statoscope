///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class MarkPanel extends view.Container {
        static sType = "s-mark-panel";

        private _dayInfo: utils.IDayInfo;
        private _editing: boolean;

        constructor(dayInfo: utils.IDayInfo) {
            super();

            this._dayInfo = dayInfo;

            this._dayInfo.dayConfig.marks.forEach(markConfig => {
                this.addMark(markConfig, dayInfo);
            });
        }

        get dayInfo(): utils.IDayInfo {
            return this._dayInfo;
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
                this.children.forEach((wrapper: statoscope.marks.MarkWrapper) =>
                    wrapper.settings = false);
            }
        }
        
        addMark(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo, asNew?: boolean): void {
            var mark = new statoscope.marks.MarkWrapper(markConfig, dayInfo);
            this.addChild(mark);
            if (asNew) {
                mark.settings = true;
                mark.element.classList.add("new");
            }
        }
    }
}
