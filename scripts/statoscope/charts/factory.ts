module statoscope.charts {
    "use strict";

    var chartBuilders = {},
        chartNames = {};

    export interface ChartBuilder {
        (config: storage.IMarkConfig, dayConfig: storage.IDayConfig): AbstractChart;
    }

    export function createChart(config: storage.IChartConfig, 
                                dayConfig: storage.IDayConfig): AbstractChart {
        return chartBuilders[config.type](config, dayConfig);
    }

    export function registerChart(type: string, name: string, builder: ChartBuilder): void {
        chartBuilders[type] = builder;
        chartNames[type] = name;
    }

    export function getChartTypes(): string[] {
        return Object.keys(chartBuilders);
    }

    export function getChartName(type: string): string {
        return chartNames[type];
    }
}
