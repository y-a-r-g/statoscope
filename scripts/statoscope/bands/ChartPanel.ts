///<reference path="../../view/Container.ts" />

module statoscope.bands {

    export class ChartPanel extends view.Container {
        static sType = "s-chart-panel";

        private _config: storage.IDashboardConfig;
        private _editing: boolean;

        constructor(config: storage.IDashboardConfig, markPanelConfig: storage.IDayConfig) {
            super();

            this._config = config;

            /*this.addChild(new statoscope.charts.ChartWrapper(new statoscope.charts.NewChart(markPanelConfig)));*/
            
            this._config.charts.forEach(chartConfig => {
                this.addChart(chartConfig, markPanelConfig);
            });
            
            if (this._config.charts.length === 0) {
                this.editing = true;
            }
        }

        get config(): storage.IDashboardConfig {
            return this._config;
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
        
        addChart(chartConfig: storage.IChartConfig, markPanelConfig: storage.IDayConfig): void {
            var chart = new statoscope.charts.ChartWrapper(
                statoscope.charts.createChart(chartConfig, markPanelConfig));
           this.insertChild(chart, this.childrenCount - 1);
        }
    }
}
