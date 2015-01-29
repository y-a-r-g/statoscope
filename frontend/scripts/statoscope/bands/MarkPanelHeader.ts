module statoscope.bands {
    "use strict";

    export class MarkPanelHeader extends view.Container {
        static sType = "s-mark-panel-toolbar";

        private _markPanel: MarkPanel;
        private _settingsButton: HTMLButtonElement;

        constructor(markPanel:MarkPanel) {
            super(new view.layouts.FreeLayout());

            this._markPanel = markPanel;

            this._settingsButton = document.createElement("button");
            this._settingsButton.classList.add("settings");
            this.element.appendChild(this._settingsButton);

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
