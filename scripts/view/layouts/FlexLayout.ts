module view.layouts {
    "use strict";

    export enum FlexLayoutAlign {
        flexStart,
        flexEnd,
        center,
        baseline,
        stretch
    }

    export enum FlexLayoutDirection {
        row,
        rowReverce,
        column,
        columnReverse
    }

    export enum FlexLayoutJustify {
        flexStart,
        flexEnd,
        center,
        spaceBetween,
        spaceAround
    }

    export interface IFlexLayoutSettings extends ILayoutSettings {
        order?: string
        grow?: string
        shrink?: string
        size?: string
        align?: FlexLayoutAlign
    }

    export class FlexLayout extends AbstractLayout {
        static sType = "s-flex-layout";

        constructor() {
            super();
        }

        refresh(): void {
            this.container.children.forEach(child => {
                var settings:IFlexLayoutSettings = child.layoutSettings,
                    style = child.element.style;
                if (settings) {
                    style.order = settings.order;
                    style.flexGrow = settings.grow;
                    style.flexShrink = settings.shrink;
                    style.flexBasis = settings.size;
                    style.alignSelf = FlexLayoutAlign[settings.align];
                }
            });
        }
        
        private _setStyle(style: string, value: string): void {
            this.container.container.style[style] = value;
        }

        private _getStyle(style: string): string {
            var value:string[] = (this.container.container.style[style] || "").split("-");
            return value.map((value, index) => 
                index ? value.charAt(0).toUpperCase() + value.substr(1) : value).join("");
        }
        
        get direction(): FlexLayoutDirection {
            return FlexLayoutDirection[this._getStyle("flex-direction")];
        }
        
        set direction(value: FlexLayoutDirection) {
            this._setStyle("flex-direction", FlexLayoutDirection[value]);
        }
        
        get wrap(): boolean {
            return this._getStyle("flex-wrap") !== "nowrap";
        }
        
        set wrap(value: boolean) {
            this._setStyle("flex-wrap", value ? "wrap" : "nowrap");
        }
        
        get justify(): FlexLayoutJustify {
            return FlexLayoutJustify[this._getStyle("justify-content")];
        }
        
        set justify(value: FlexLayoutJustify) {
            this._setStyle("justify-content", FlexLayoutJustify[value]);
        }
        
        get alignItems(): FlexLayoutAlign {
            return FlexLayoutAlign[this._getStyle("align-items")];
        }
        
        set alignItems(value:FlexLayoutAlign) {
            this._setStyle("align-items", FlexLayoutAlign[value]);
            
        }

        get alignContent(): FlexLayoutAlign {
            return FlexLayoutAlign[this._getStyle("align-content")];
        }

        set alignContent(value:FlexLayoutAlign) {
            this._setStyle("align-content", FlexLayoutAlign[value]);
        }
    }
}
