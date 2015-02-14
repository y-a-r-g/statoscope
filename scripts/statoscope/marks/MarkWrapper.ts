module statoscope.marks {
    "use strict";

    export class MarkWrapper extends view.Container {
        static sType: string = "s-mark-wrapper";

        private _moveHandle: statoscope.controls.MoveHandle;
        private _mark: AbstractMark;
        private _setupButton: view.controls.IconButton;
        private _editor: view.Container;

        constructor(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            super();
            this._createMark(markConfig, dayInfo);

            this._moveHandle = new statoscope.controls.MoveHandle();
            this._setupButton = new view.controls.IconButton("images/controls/setup.svg");
            this._setupButton.name = "setup";
            this._setupButton.onClick.addHandler(() => 
                this.settings = !this.settings);
            
            this.addChild(this._moveHandle, this._setupButton);
        }

        cleanup(): void {
            super.cleanup();
        }
        
        private _createMark(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            if (this._mark) {
                this._mark.cleanup();
            }
            
            this._mark = statoscope.marks.createMark(markConfig, dayInfo);
            this.addChild(this._mark);
        }

        get mark(): AbstractMark {
            return this._mark;
        }

        get settings(): boolean {
            return !!this._editor;
        }

        set settings(value: boolean) {
            if (value) {
                if (!this._editor) {
                    this._editor = new view.Container();
                    this._editor.name = "editor";

                    var title = new view.controls.Input(
                        view.controls.InputType.text, this.mark.config.title);
                    var type = new view.controls.Select(
                        getMarkTypes().map(type => ({
                            value: type,
                            label: getMarkName(type)
                        })), this.mark.config.type);
                    var save = new view.controls.IconButton("images/controls/save.svg");
                    save.title = common.i18n.tr("Save");
                    save.onClick.addHandler(() => {
                        this.mark.config.title = title.value;
                        var typeChanged = this.mark.config.type !== type.value;
                        this.mark.config.type = type.value;
                        storage.instance().saveDayConfig(this.mark.dayInfo.dayConfig);
                        
                        if (typeChanged) {
                            this._createMark(this.mark.config, this.mark.dayInfo);
                        }
                        else {
                            this.mark.update();
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
                            var config: storage.IDayConfig = this.mark.dayInfo.dayConfig;
                            config.marks = config.marks.filter(mark => mark !== this.mark.config);
                            storage.instance().saveDayConfig(this.mark.dayInfo.dayConfig);
                            this.cleanup();
                        }
                    });

                    this._editor.addChild(title, type, save, remove);
                    this.addChild(this._editor);
                    this.element.classList.add("settings");

                    title.element.focus();
                }
            }
            else {
                if (this._editor) {
                    this._editor.cleanup();
                    this._editor = null;
                    this.element.classList.remove("settings");
                    this.element.classList.remove("new");
                }
            }
            this._setupButton.pinned = value;
        }
    }
}
