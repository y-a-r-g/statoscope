module statoscope.bands {
    "use strict";

    export class Toolbar extends view.Container {
        constructor() {
            super(new view.layouts.CardLayout());

            this.element.classList.add("Toolbar");
        }
    }
}
