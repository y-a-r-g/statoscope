module view {
    "use strict";

    export class Page extends Container {

        constructor(){
            super(new view.layouts.Card());
            this.element.classList.add("Page")
        }

        init(...args: any[]): void {
            window.document.body.appendChild(this.element);
        }

        cleanup(): void {
            window.document.body.removeChild(this.element);
            super.cleanup();
        }
    }
}
