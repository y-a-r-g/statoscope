module statoscope.marks {
    "use strict";

    var markBuilders = {};

    export interface IMarkConfig {
        type: string;
        title: string;
    }

    export interface MarkBuilder {
        (config: IMarkConfig): AbstractMark;
    }

    export function createMark(config: IMarkConfig): AbstractMark {
        return markBuilders[config.type](config);
    }

    export function registerMark(type: string, builder: MarkBuilder) {
        markBuilders[type] = builder;
    }

    export function getMarkTypes(): string[] {
        return Object.keys(markBuilders);
    }
}
