///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class ChartPanel extends view.Container {
        static sType = "s-chart-panel";

        private _config: storage.IDashboardConfig;
        private _dayConfig: storage.IDayConfig;
        private _editing: boolean;

        constructor(config: storage.IDashboardConfig, dayConfig: storage.IDayConfig) {
            super();

            this._config = config;
            this._dayConfig = dayConfig;
            
            this._config.charts.forEach(chartConfig => {
                this.addChart(chartConfig);
            });
            
            if (this._config.charts.length === 0) {
                this.editing = true;
            }
        }

        get config(): storage.IDashboardConfig {
            return this._config;
        }
        
        get dayConfig(): storage.IDayConfig {
            return this._dayConfig;
        }

        get editing(): boolean {
            return this._editing;
        }

        set editing(value: boolean) {
            this._editing = value;
            if (this._editing) {
                this.element.classList.add("editing");
            }
            else {
                this.element.classList.remove("editing");
            }
        }
        
        addChart(chartConfig: storage.IChartConfig, asNew?: boolean): void {
            var chart = new statoscope.charts.ChartWrapper(chartConfig, this.dayConfig);
            this.addChild(chart);
            if (asNew) {
                chart.settings = true;
                chart.element.classList.add("new");
            }
        }
    }
}
