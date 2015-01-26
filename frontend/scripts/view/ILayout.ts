module view {
    "use strict";

    export interface ILayoutSettings {

    }

    export interface ILayout extends ICleanup {
        container: view.Container;
        refresh(): void
    }
}
