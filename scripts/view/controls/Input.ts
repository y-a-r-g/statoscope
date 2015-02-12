///<reference path="../Control.ts" />

module view.controls {
    
    export enum InputType {
        text,
        password
    }
    
    export class Input extends view.Control {
        static sType = "s-input";
        
        constructor(type: InputType, value?: any) {
            super(document.createElement("input"));
            this.inputElement.type = InputType[type];
            this.value = value;
        }
        
        get inputElement(): HTMLInputElement {
            return <HTMLInputElement>this.element;
        }
        
        get value(): any {
            return this.inputElement.value;
        }
        
        set value(value: any) {
            this.inputElement.value = value;
        }
    }
}
