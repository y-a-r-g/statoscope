module statoscope.bands {
    "use strict";

    export class MarkPanelHeader extends view.Container {
        static sType = "s-mark-panel-header";

        private _markPanel: MarkPanel;

        private _bar: view.Container;
        private _addButton: view.controls.IconButton;
        private _settingsButton: view.controls.IconButton;

        constructor(markPanel: MarkPanel) {
            super();

            this._markPanel = markPanel;

            this._bar = new view.Container();

            this._addButton = new view.controls.IconButton("images/header/add.svg");
            this._addButton.title = common.i18n.tr("Setup page");
            this._addButton.name = "add";
            this._addButton.onClick.addHandler(this._onAddButtonClick, this);
            this._bar.addChild(this._addButton);

            this._settingsButton = new view.controls.IconButton("images/header/settings-all.svg");
            this._settingsButton.title = common.i18n.tr("Setup page");
            this._settingsButton.name = "settings";
            this._settingsButton.onClick.addHandler(this._onSettingsButtonClick, this);
            this._bar.addChild(this._settingsButton);

            this.addChild(this._bar);
            if (this._markPanel.dayInfo.dayConfig.marks.length === 0) {
                this.editing = true;
                this.element.classList.add("empty");
            }
        }

        cleanup(): void {
            super.cleanup();
        }

        private _onSettingsButtonClick(): void {
            this.editing = !this.editing;
        }

        private _onAddButtonClick(): void {
            var config = {
                id: moment().format("x"), //TODO: create better id
                type: statoscope.marks.getMarkTypes()[0],
                title: ""
            };
            this._markPanel.dayInfo.dayConfig.marks.push(config);
            this._markPanel.addItem(config, true);
        }

        get editing(): boolean {
            return this.element.classList.contains("editing");
        }

        set editing(value: boolean) {
            if (value) {
                this.element.classList.add("editing");
            }
            else {
                this.element.classList.remove("editing");
                this.element.classList.remove("empty");
            }
            this._settingsButton.pinned = value;
            this._markPanel.editing = value;
        }
    }
}
