///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export class NewMark extends AbstractMark {
        static sType: string = "s-new-mark";
        
        private _addButton: view.controls.IconButton;
        private _title: HTMLInputElement;
        private _type: HTMLSelectElement;

        constructor() {
            super(null, null);

            this._addButton = new view.controls.IconButton();
            this.addChild(this._addButton);
            
            this._addButton.element.appendChild(document.createElement("div"));
            this._addButton.element.appendChild(document.createElement("div"));
            this._addButton.element.title = common.i18n.tr("Add item");
            
            this._addButton.onClick.addHandler(() => {
                if (this.element.classList.contains("extended")) {
                    this.element.classList.remove("extended");
                    
                    if (!this._addButton.element.classList.contains("invalid")) {
                        //TODO: add property
                    }
                }
                else {
                    this.element.classList.add("extended");
                }
                this._updateButton();
            });

            this._title = document.createElement("input");
            this._title.type = "text";
            this._title.placeholder = common.i18n.tr("Title");
            this.addListener(this._title, "input", this._updateButton);
            this.element.insertBefore(this._title, this._addButton.element);

            this._type = document.createElement("select");
            getMarkTypes().forEach(type => {
                var name = getMarkName(type);
                var option = document.createElement("option");
                option.innerHTML = common.i18n.tr(name);
                option.value = type;
                this._type.appendChild(option);
            });
            this.element.insertBefore(this._type, this._addButton.element);
        }

        cleanup(): void {
            super.cleanup();
        }
        
        private _updateButton(): void {
            if (!this._title.value) {
                this._addButton.element.classList.add("invalid");
            }
            else {
                this._addButton.element.classList.remove("invalid");
            }
        }

        get editable(): boolean {
            return false;
        }
    }
}
