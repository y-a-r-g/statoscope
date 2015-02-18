///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class ChartPanel extends AbstractPanel<storage.IDashboardConfig, storage.IChartConfig> {
        static sType = "s-chart-panel";
        
        private _config: storage.IDashboardConfig;

        constructor(config: storage.IDashboardConfig, dayConfig: storage.IDayConfig) {
            this._config = config;
            
            super(dayConfig);

            config.charts.forEach(chartConfig => {
                this.addItem(chartConfig);
            });
        }

        createWrapper(itemConfig: storage.IChartConfig): statoscope.charts.ChartWrapper {
            return new statoscope.charts.ChartWrapper(itemConfig, this.dayConfig);
        }
        
        get config(): storage.IDashboardConfig {
            return this._config;
        }
    }
}
