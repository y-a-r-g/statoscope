///<reference path="factory.ts" />

module statoscope.marks {
    "use strict";

    export class AbstractMark extends view.Control {
        static sType: string = "s-abstract-mark";

        private _config: IMarkConfig;

        constructor(config) {
            super();

            this._config = config;
        }

        cleanup(): void {
            super.cleanup();
        }

        get config(): IMarkConfig {
            return this._config;
        }
    }
}
