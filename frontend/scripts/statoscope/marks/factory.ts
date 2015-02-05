module statoscope.marks {
    "use strict";

    var markBuilders = {},
        markNames = {};

    export interface MarkBuilder {
        (config: storage.IMarkConfig, dayInfo: utils.IDayInfo): AbstractMark;
    }

    export function createMark(config: storage.IMarkConfig, dayInfo: utils.IDayInfo): AbstractMark {
        return markBuilders[config.type](config, dayInfo);
    }

    export function registerMark(type: string, name: string, builder: MarkBuilder) {
        markBuilders[type] = builder;
        markNames[type] = name;
    }

    export function getMarkTypes(): string[] {
        return Object.keys(markBuilders);
    }

    export function getMarkName(type: string): string {
        return markNames[type];
    }
}
