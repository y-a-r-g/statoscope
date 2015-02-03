///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class MarkPanel extends view.Container {
        static sType = "s-mark-panel";

        private _config: storage.IMarkPanelConfig;
        private _editing: boolean;

        constructor() {
            super();
        }

        get config(): storage.IMarkPanelConfig {
            return this._config;
        }

        set config(value: storage.IMarkPanelConfig) {
            this.removeAllChildren();

            this._config = value;

            this._config.marks.forEach(markConfig => {
                var mark = new statoscope.marks.MarkWrapper(
                    statoscope.marks.createMark(markConfig));
                this.addChild(mark);
            });
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
    }
}
