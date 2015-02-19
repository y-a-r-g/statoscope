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

        private _direction: FlexLayoutDirection = FlexLayoutDirection.row;
        private _wrap: boolean = false;
        private _justify: FlexLayoutJustify = FlexLayoutJustify.flexStart;
        private _alignItems: FlexLayoutAlign = FlexLayoutAlign.stretch;
        private _alignContent: FlexLayoutAlign = FlexLayoutAlign.stretch;

        constructor(direction?: FlexLayoutDirection, wrap?: boolean, justify?: FlexLayoutJustify,
                    alignItems?: FlexLayoutAlign, alignContent?: FlexLayoutAlign) {
            super();
            this.direction = direction;
            this.wrap = wrap;
            this.justify = justify;
            this.alignItems = alignItems;
            this.alignContent = alignContent;
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
            this._updateStyles();
        }
        
        private _updateStyles(): void {
            if (this.container) {
                this._setStyle("flex-direction", FlexLayoutDirection[this._direction]);
                this._setStyle("flex-wrap", this._wrap ? "wrap" : "nowrap");
                this._setStyle("justify-content", FlexLayoutJustify[this._justify]);
                this._setStyle("align-items", FlexLayoutAlign[this._alignItems]);
                this._setStyle("align-content", FlexLayoutAlign[this.alignContent]);
            }
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
            return this._direction;
        }
        
        set direction(value: FlexLayoutDirection) {
            this._direction = value;
            this._updateStyles();
        }
        
        get wrap(): boolean {
            return this._wrap;
        }
        
        set wrap(value: boolean) {
            this._wrap = value;
            this._updateStyles();
        }
        
        get justify(): FlexLayoutJustify {
            return this._justify;
        }
        
        set justify(value: FlexLayoutJustify) {
            this._justify = value;
            this._updateStyles();
        }
        
        get alignItems(): FlexLayoutAlign {
            return this._alignItems
        }
        
        set alignItems(value:FlexLayoutAlign) {
            this._alignItems = value;
            this._updateStyles();
        }

        get alignContent(): FlexLayoutAlign {
            return this._alignContent;
        }

        set alignContent(value:FlexLayoutAlign) {
            this._alignContent = value;
            this._updateStyles();
        }
    }
}
