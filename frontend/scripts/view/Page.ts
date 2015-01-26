/// <reference path="./Container.ts" />

module view {
    "use strict";

    export class Page extends view.Container {
        static sType = "s-page";

        constructor(options: any) {
            super(new view.layouts.CardLayout());
            window.document.body.appendChild(this.element);
            this.relayout();
        }

        cleanup(): void {
            window.document.body.removeChild(this.element);
            super.cleanup();
        }

        get title(): string {
            return "Untitled";
        }
    }
}
