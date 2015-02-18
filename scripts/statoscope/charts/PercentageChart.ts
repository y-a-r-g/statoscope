///<reference path="factory.ts" />

module statoscope.charts {
    "use strict";

    export class PercentageChart extends AbstractChart {
        static sType = "s-percentage-chart";
        
        constructor(config: storage.IChartConfig, dayConfig: storage.IDayConfig) {
            super(config, dayConfig)
        }
    }
    
    registerChart("precentage", "Percentage", (config, dayConfig) => {
        return new PercentageChart(config, dayConfig);
    })
}
