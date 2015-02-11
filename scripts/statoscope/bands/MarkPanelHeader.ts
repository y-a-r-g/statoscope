module statoscope.bands {
    "use strict";

    export class MarkPanelHeader extends view.Container {
        static sType = "s-mark-panel-header";

        private _markPanel: MarkPanel;

        private _bar: view.Container;
        private _settingsButton: view.controls.IconButton;

        constructor(markPanel:MarkPanel) {
            super();

            this._markPanel = markPanel;

            this._bar = new view.Container();
            
            this._settingsButton = new view.controls.IconButton("images/header/settings-all.svg");
            this._settingsButton.element.title = common.i18n.tr("Setup page");
            this._settingsButton.name = "settings";
            
            this._bar.addChild(this._settingsButton);

            this.addChild(this._bar);

            this._settingsButton.onClick.addHandler(this._onSettingsButtonClick, this);
        }

        cleanup(): void {
            super.cleanup();
        }

        private _onSettingsButtonClick(): void {
            this._markPanel.editing = !this._markPanel.editing;
            this._settingsButton.pinned = this._markPanel.editing;
        }
    }
}
