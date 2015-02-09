///<reference path="factory.ts" />
///<reference path="../../view/Control.ts" />

module statoscope.charts {
    "use strict";

    export class AbstractChart extends view.Container {
        static sType: string = "s-abstract-chart";

        private _config: storage.IChartConfig;
        private _dayConfig: storage.IDayConfig;

        constructor(config: storage.IChartConfig, dayConfig: storage.IDayConfig) {
            super();

            this._config = config;
            this._dayConfig = dayConfig;
        }

        cleanup(): void {
            super.cleanup();
        }

        get config(): storage.IMarkConfig {
            return this._config;
        }

        get dayConfig(): storage.IDayConfig {
            return this._dayConfig;
        }

        get editable(): boolean {
            return true;
        }
    }
}
