module statoscope.controls {
    "use strict";

    export class EditorBar extends view.Container {
        static sType = "s-editor-bar";
        
        private _titleInput: view.controls.Input;
        private _typeSelect: view.controls.Select;
        private _saveButton: view.controls.AbstractButton;
        private _removeButton: view.controls.AbstractButton;
        
        constructor(titleText: string, types: view.controls.ISelectOption[], selectedType: string) {
            super(new view.layouts.FlexLayout());

            this._titleInput = new view.controls.Input(view.controls.InputType.text, titleText);
            this._typeSelect = new view.controls.Select(types, selectedType);
            this._saveButton = new view.controls.IconButton("images/controls/save.svg");
            this._saveButton.title = common.i18n.tr("Save");
            this._saveButton.name = "save";

            this._removeButton = new view.controls.IconButton("images/controls/remove.svg");
            this._removeButton.title = common.i18n.tr("Remove");
            this._saveButton.name = "remove";
            
            this.addChild(this._titleInput, { grow: 3 });
            this.addChild(this._typeSelect, { grow: 2 });
            this.addChild(this._saveButton);
            this.addChild(this._removeButton);
            
            window.requestAnimationFrame(() => this._titleInput.element.focus());
        }
        
        get onSaveClick(): view.Action {
            return this._saveButton.onClick;
        }
        
        get onRemoveClick(): view.Action {
            return this._removeButton.onClick;
        }
        
        get titleText(): string {
            return this._titleInput.value;
        }
        
        get selectedType(): string {
            return this._typeSelect.value;
        }
    }
}
