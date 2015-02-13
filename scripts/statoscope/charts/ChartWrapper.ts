module statoscope.charts {
    "use strict";

    export class ChartWrapper extends view.Container {
        static sType: string = "s-chart-wrapper";

        private _moveHandle: statoscope.controls.MoveHandle;
        private _chart: AbstractChart;
        private _editor: view.Container;

        constructor(chart: AbstractChart) {
            super();
            this._chart = chart;

            this._moveHandle = new statoscope.controls.MoveHandle();
            this.addChild(this._moveHandle);

            this.addChild(this._chart);
        }

        cleanup(): void {
            super.cleanup();
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
