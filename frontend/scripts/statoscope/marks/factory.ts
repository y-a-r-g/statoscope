module statoscope.marks {
    "use strict";

    var markBuilders = {};

    export interface MarkBuilder {
        (config: storage.IMarkConfig, dayInfo: utils.IDayInfo): AbstractMark;
    }

    export function createMark(config: storage.IMarkConfig, dayInfo: utils.IDayInfo): AbstractMark {
        return markBuilders[config.type](config, dayInfo);
    }

    export function registerMark(type: string, builder: MarkBuilder) {
        markBuilders[type] = builder;
    }

    export function getMarkTypes(): string[] {
        return Object.keys(markBuilders);
    }
}
