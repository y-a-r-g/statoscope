module statoscope.marks {
    "use strict";

    export class MarkWrapper  extends
            statoscope.controls.AbstractWrapper<storage.IMarkConfig> {
        static sType = "s-mark-wrapper";
        
        private _dayInfo: utils.IDayInfo;

        constructor(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            this._dayInfo = dayInfo;
            super(markConfig);
        }

        newItem(config: storage.IMarkConfig): AbstractMark {
            return createMark(config, this._dayInfo);
        }

        newEditor(): view.Control {
            var editor = new statoscope.controls.EditorBar(this.item.config.title,
                getMarkTypes().map(type => ({
                    value: type,
                    label: getMarkName(type)
                })), this.item.config.type);
            
            editor.onSaveClick.addHandler(() => {
                this.item.config.title = editor.titleText;
                var typeChanged = this.item.config.type !== editor.selectedType;
                this.item.config.type = editor.selectedType;
                storage.instance().saveDayConfig(this._dayInfo.dayConfig);

                if (typeChanged) {
                    this.createItem(this.item.config);
                }
                else {
                    this.item.update();
                }
                this.settings = false;
            });
            
            editor.onRemoveClick.addHandler(() => {
                var result = this.element.classList.contains("new") ||
                    window.confirm(common.i18n.tr(
                        "This mark will be deleted from all days."));

                if (result) {
                    var config: storage.IDayConfig = this._dayInfo.dayConfig;
                    config.marks = config.marks.filter(mark => mark !== this.item.config);
                    storage.instance().saveDayConfig(this._dayInfo.dayConfig);
                    this.cleanup();
                }
            });

            return editor;
        }
    }
}
