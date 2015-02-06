module statoscope.controls {
    "use strict";

    export class Logo extends view.Control {
        static sType = "s-logo";

        constructor() {
            super();
            this.element.innerHTML = common.i18n.tr("Statoscope");
        }
    }
}
