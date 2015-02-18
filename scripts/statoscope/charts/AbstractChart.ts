///<reference path="../controls/AbstractWrappedItem.ts" />

module statoscope.charts {
    "use strict";

    export class AbstractChart 
            extends statoscope.controls.AbstractWrappedItem<storage.IChartConfig> {
        static sType = "s-abstract-chart";

        private _dayConfig: storage.IDayConfig;

        constructor(config: storage.IChartConfig, dayConfig: storage.IDayConfig) {
            super(config);
            this._dayConfig = dayConfig;
        }

        cleanup(): void {
            super.cleanup();
        }

        get dayConfig(): storage.IDayConfig {
            return this._dayConfig;
        }
    }
}
