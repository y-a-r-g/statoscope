module view {
    "use strict";

    export interface ILayoutSettings {

    }

    export interface ILayout extends ICleanable {
        container: view.Container;
        refresh(): void
    }
}
