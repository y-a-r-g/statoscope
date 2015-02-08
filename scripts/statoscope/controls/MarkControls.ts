/// <reference path="../../view/Container.ts" />

module statoscope.controls {
    "use strict";

    export class MarkControls extends view.Container {
        static sType = "s-mark-controls";

        private _wrapper: statoscope.marks.MarkWrapper;

        private _renameButton: view.controls.IconButton;
        private _setupButton: view.controls.IconButton;
        private _removeButton: view.controls.IconButton;

        constructor(wrapper: statoscope.marks.MarkWrapper) {
            super();

            this._wrapper = wrapper;

            this._renameButton = new view.controls.IconButton("images/marks/rename.svg");
            this._renameButton.onClick.addHandler(this._onRenameButtonClick, this);
            this._setupButton = new view.controls.IconButton("images/marks/setup.svg");
            this._setupButton.onClick.addHandler(this._onSetupButtonClick, this);
            this._removeButton = new view.controls.IconButton("images/marks/remove.svg");
            this._removeButton.onClick.addHandler(this._onDeleteButtonClick, this);

            this.addChild(this._renameButton);
            this.addChild(this._setupButton);
            this.addChild(this._removeButton);
        }

        private _onRenameButtonClick(): void {
            var result = window.prompt(common.i18n.tr("Edit title"), this._wrapper.mark.title);
            if (result !== null) {
                this._wrapper.mark.title = result;
            }
        }

        private _onSetupButtonClick(): void {

        }

        private _onDeleteButtonClick(): void {
            var result = window.confirm(common.i18n.tr("This mark will be deleted from all days."));
            if (result) {
                var config = this._wrapper.mark.dayInfo.dayConfig;
                config.marks = config.marks.filter(mark => mark !== this._wrapper.mark.config);
                storage.instance().saveDayConfig(this._wrapper.mark.dayInfo.dayConfig);
                this._wrapper.cleanup();
            }
        }
    }
}
