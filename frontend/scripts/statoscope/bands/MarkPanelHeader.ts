module statoscope.bands {
    "use strict";

    export class MarkPanelHeader extends view.Container {
        static sType = "s-mark-panel-header";

        private _markPanel: MarkPanel;

        private _bar: HTMLElement;
        private _settingsButton: HTMLButtonElement;

        constructor(markPanel:MarkPanel) {
            super();

            this._markPanel = markPanel;

            this._bar = document.createElement("div");

            this._settingsButton = document.createElement("button");
            this._settingsButton.classList.add("settings");
            this._settingsButton.title = common.i18n.tr("Setup widgets");
            this._bar.appendChild(this._settingsButton);

            this.element.appendChild(this._bar);

            this.addListener(this._settingsButton, "click", this._onSettingsButtonClick);
        }

        cleanup(): void {
            super.cleanup();
        }

        private _onSettingsButtonClick(): void {
            this._markPanel.editing = !this._markPanel.editing;

            if (this._markPanel.editing) {
                this._settingsButton.classList.add("pressed");
            }
            else {
                this._settingsButton.classList.remove("pressed");
            }
        }
    }
}
