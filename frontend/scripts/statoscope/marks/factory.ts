module statoscope.marks {
    "use strict";

    var markBuilders = {};

    export interface IMarkConfig {
        type: string;
    }

    export interface IMark extends ICleanable {
        control: view.Control;
    }

    export interface MarkBuilder {
        (config: IMarkConfig): IMark;
    }

    export function createMark(config: IMarkConfig): IMark {
        return markBuilders[config.type](config);
    }

    export function registerMark(type: string, builder: MarkBuilder) {
        markBuilders[type] = builder;
    }
}
