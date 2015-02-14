///<reference path="factory.ts" />

module statoscope.charts {
    "use strict";

    export class PercentageChart extends AbstractChart {
        
        constructor(config: storage.IChartConfig, dayConfig: storage.IDayConfig) {
            super(config, dayConfig)
        }
    }
    
    registerChart("precentage", "Percentage", (config, dayConfig) => {
        return new PercentageChart(config, dayConfig);
    })
}
