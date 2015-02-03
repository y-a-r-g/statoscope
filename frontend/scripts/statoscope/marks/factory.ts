module statoscope.marks {
    "use strict";

    var markBuilders = {};

    export interface MarkBuilder {
        (config: storage.IMarkConfig): AbstractMark;
    }

    export function createMark(config: storage.IMarkConfig): AbstractMark {
        return markBuilders[config.type](config);
    }

    export function registerMark(type: string, builder: MarkBuilder) {
        markBuilders[type] = builder;
    }

    export function getMarkTypes(): string[] {
        return Object.keys(markBuilders);
    }
}
