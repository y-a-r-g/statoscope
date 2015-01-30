///<reference path="factory.ts" />
///<reference path="AbstractMark.ts" />

module statoscope.marks {
    "use strict";

    export interface INewMarkConfig extends IMarkConfig {
        markPanel: statoscope.bands.MarkPanel
    }

    export class NewMark extends AbstractMark {
        static sType: string = "s-new-mark";

        constructor(config: INewMarkConfig) {
            super(config);
        }

        cleanup(): void {
            super.cleanup();
        }
    }

    registerMark("new", config => new NewMark(<INewMarkConfig>config));
}
