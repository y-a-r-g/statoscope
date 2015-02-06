module view.layouts {
    "use strict";

    export interface IVerticalLayoutSettings extends ILayoutSettings{
        stretchY?: number
    }

    export class VerticalLayout extends AbstractLayout {
        static sType = "s-vertical-layout";

        constructor() {
            super();
        }

        refresh(): void {
            var heights: number[],
                stretchCount = 0,
                children = this.container.children,
                y = 0;

            heights = children.map(child => {
                var layoutSettings = <IVerticalLayoutSettings>child.layoutSettings;
                if (layoutSettings && layoutSettings.stretchY) {
                    stretchCount += layoutSettings.stretchY;
                    return NaN;
                }
                else {
                    child.element.style.top = y + "px";
                    var height = parseFloat(window.getComputedStyle(child.element).height);
                    y += height;
                    return height;
                }
            });

            y = 0;
            if (stretchCount > 0) {
                var stretchHeight = parseFloat(window.getComputedStyle(this.container.element).height) /
                        stretchCount;

                children.forEach((child, index) => {
                    var height = heights[index];
                    if (isNaN(height)) {
                        var layoutSettings = <IVerticalLayoutSettings>child.layoutSettings,
                            style = child.element.style,
                            h = (layoutSettings.stretchY * stretchHeight);
                        style.top = y + "px";
                        style.height = h + "px";
                        y += h;
                    }
                    else {
                        y += height;
                    }
                });
            }
        }
    }
}
