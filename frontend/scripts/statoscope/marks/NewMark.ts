///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export class NewMark extends AbstractMark {
        static sType: string = "s-new-mark";
        
        private _addButton: view.controls.IconButton;
        private _title: HTMLInputElement;
        private _type: HTMLSelectElement;

        constructor(dayInfo: utils.IDayInfo) {
            super(null, dayInfo);

            this._addButton = new view.controls.IconButton();
            this.addChild(this._addButton);
            
            this._addButton.element.appendChild(document.createElement("div"));
            this._addButton.element.appendChild(document.createElement("div"));
            this._addButton.element.title = common.i18n.tr("Add item");
            
            this._addButton.onClick.addHandler(() => {
                if (this.extended) {
                    this.extended = false;
                    
                    if (!this.invalid) {
                        var markConfig = {
                            id: moment().format('x'), //TODO: create better id
                            type: this._type.value,
                            title: this._title.value
                        };
                        
                        dayInfo.markPanelConfig.marks.push(markConfig);
                        statoscope.storage.instance().saveMarkPanelConfig(dayInfo.markPanelConfig);
                        dayInfo.addMark(markConfig, dayInfo);
                    }
                }
                else {
                    this.extended = true;
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
            this.invalid = !this._title.value;
        }

        get editable(): boolean {
            return false;
        }
        
        private get extended(): boolean {
            return this.parent.element.classList.contains("extended");
        }
        
        private set extended(value:boolean) {
            if (value) {
                this.parent.element.classList.add("extended");
            }
            else {
                this.parent.element.classList.remove("extended");
            }            
        }
        
        private get invalid(): boolean {
            return this.parent.element.classList.contains("invalid");
        }

        private set invalid(value:boolean) {
            if (value) {
                this.parent.element.classList.add("invalid");
            }
            else {
                this.parent.element.classList.remove("invalid");
            }
        }
    }
}
