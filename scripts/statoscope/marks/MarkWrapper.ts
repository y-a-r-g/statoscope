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
            var editor = new view.Container();

            var title = new view.controls.Input(
                view.controls.InputType.text, this.item.config.title);
            var type = new view.controls.Select(
                getMarkTypes().map(type => ({
                    value: type,
                    label: getMarkName(type)
                })), this.item.config.type);
            var save = new view.controls.IconButton("images/controls/save.svg");
            save.title = common.i18n.tr("Save");
            save.onClick.addHandler(() => {
                this.item.config.title = title.value;
                var typeChanged = this.item.config.type !== type.value;
                this.item.config.type = type.value;
                storage.instance().saveDayConfig(this._dayInfo.dayConfig);

                if (typeChanged) {
                    this.createItem(this.item.config);
                }
                else {
                    this.item.update();
                }
                this.settings = false;
            });
            var remove = new view.controls.IconButton("images/controls/remove.svg");
            remove.title = common.i18n.tr("Remove");
            remove.onClick.addHandler(() => {
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

            editor.addChild(title, type, save, remove);
            title.element.focus();
            return editor;
        }
    }
}
