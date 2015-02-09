module statoscope.charts {
    "use strict";

    export class ChartWrapper extends view.Container {
        static sType: string = "s-chart-wrapper";

        private _moveHandle: statoscope.controls.MoveHandle;
        private _chart: AbstractChart;

        constructor(chart: AbstractChart) {
            super();
            this._chart = chart;

            if (this._chart.editable) {
                this._moveHandle = new statoscope.controls.MoveHandle();
                this.addChild(this._moveHandle);
            }
            else {
                this.element.classList.add("new-chart-wrapper");
            }

            this.addChild(this._chart);
        }

        cleanup(): void {
            super.cleanup();
        }

        get mark(): AbstractChart {
            return this._chart;
        }
    }
}
