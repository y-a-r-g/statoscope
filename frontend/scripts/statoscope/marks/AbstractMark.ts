///<reference path="factory.ts" />

module statoscope.marks {
    "use strict";

    export class AbstractMark extends view.Control implements IMark {
        static sType: string = "s-abstract-mark";

        private _config: IMarkConfig;

        constructor(config) {
            super();
        }

        cleanup(): void {
            super.cleanup();
        }

        get control(): view.Control {
            return this;
        }

        get config(): IMarkConfig {
            return this._config;
        }
    }

    registerMark("check", config => new CheckMark(config));
}
