/// <reference path="../../view/Container.ts" />

module statoscope.bands {
    "use strict";

    export class Toolbar extends view.Container {
        static sType = "s-toolbar-band";

        constructor() {
            super(new view.layouts.CardLayout());
        }
    }
}
