///<reference path="../Control.ts" />

module view.controls {
    
    export interface ISelectOption {
        value:string
        label:string
    }
    
    export class Select extends view.Control {
        static sType = "s-select";
        
        private _items: ISelectOption[];
        
        constructor(items: ISelectOption[], value: string) {
            super(document.createElement("select"));
            this.items = items;
            this.value = value;
        }
        
        get selectElement(): HTMLSelectElement {
            return <HTMLSelectElement>this.element;
        }
        
        get value(): any {
            return this.selectElement.value;
        }
        
        set value(value: any) {
            this.selectElement.value = value;
        }
        
        get items(): ISelectOption[] {
            return this._items;
        }
        
        set items(value: ISelectOption[]) {
            this._items = value;
            
            while(this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
            
            this._items.forEach(item => {
                var option = document.createElement("option");
                option.value = item.value;
                option.innerHTML = item.label;
                this.element.appendChild(option);
            })
        }
    }
}
