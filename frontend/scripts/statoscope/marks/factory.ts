module statoscope.marks {
    "use strict";

    export interface IMarkConfig {
        type: string;
    }

    export interface IMark extends ICleanable {

    }

    export function create(config: IMarkConfig): IMark {
        return null;
    }
}
