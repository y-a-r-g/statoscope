module statoscope.controls
{
    "use strict";

    export class LoadingIndicator extends view.Container {
        static sType = "s-loading-indicator";

        constructor() {
            super();
            for (var i = 0; i < 5; i++) {
                this.element.appendChild(document.createElement("div"));
            }
        }
    }
}
