module statoscope.charts {
    "use strict";

    export class ChartWrapper extends view.Container {
        static sType: string = "s-chart-wrapper";

        private _moveHandle: statoscope.controls.MoveHandle;
        private _chart: AbstractChart;
        private _setupButton: view.controls.IconButton;
        private _editor: view.Container;

        constructor(config: storage.IChartConfig, dayConfig: storage.IDayConfig) {
            super();
            this._createChart(config, dayConfig);

            this._moveHandle = new statoscope.controls.MoveHandle();
            this._setupButton = new view.controls.IconButton("images/controls/setup.svg");
            this._setupButton.name = "setup";
            this._setupButton.onClick.addHandler(() =>
                this.settings = !this.settings);

            this.addChild(this._moveHandle, this._setupButton);
        }

        cleanup(): void {
            super.cleanup();
        }

        _createChart(config: storage.IChartConfig, dayConfig: storage.IDayConfig): void {
            if (this._chart) {
                this._chart.cleanup();
            }

            this._chart = statoscope.charts.createChart(config, dayConfig);
            this.addChild(this._chart);
        }

        get chart(): AbstractChart {
            return this._chart;
        }

        get settings(): boolean {
            return !!this._editor;
        }

        set settings(value: boolean) {
            
        }
    }
}
