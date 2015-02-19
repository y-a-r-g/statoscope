///<reference path="../controls/AbstractWrapper.ts" />

module statoscope.charts {
    "use strict";

    export class ChartWrapper extends 
            statoscope.controls.AbstractWrapper<storage.IChartConfig> {
        static sType = "s-chart-wrapper";
        
        private _dayConfig: storage.IDayConfig;

        constructor(config: storage.IChartConfig, dayConfig: storage.IDayConfig) {
            this._dayConfig = dayConfig;
            
            super(config);
        }

        newItem(config: storage.IChartConfig): AbstractChart {
            return createChart(config, this._dayConfig);
        }

        newEditor(): view.Control {
            return null;
        }
    }
}
