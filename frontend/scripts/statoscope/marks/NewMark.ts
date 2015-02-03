///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export interface INewMarkConfig extends storage.IMarkConfig {
        markPanel: statoscope.bands.MarkPanel
    }

    export class NewMark extends AbstractMark {
        static sType: string = "s-new-mark";

        constructor(config: storage.IMarkConfig, dayInfo: utils.IDayInfo) {
            super(config, dayInfo);
        }

        cleanup(): void {
            super.cleanup();
        }
    }

    registerMark("new", (config, info) => new NewMark(<INewMarkConfig>config, info));
}
