module statoscope.bands {
    "use strict";

    export class ChartPanelHeader extends view.Container {
        static sType = "s-chart-panel-header";

        private _chartPanel: ChartPanel;

        private _bar: view.Container;
        private _addButton: view.controls.IconButton;
        private _settingsButton: view.controls.IconButton;

        constructor(chartPanel: ChartPanel) {
            super();

            this._chartPanel = chartPanel;

            this._bar = new view.Container();

            this._addButton = new view.controls.IconButton("images/header/add.svg");
            this._addButton.title = common.i18n.tr("Setup page");
            this._addButton.name = "add";
            this._addButton.onClick.addHandler(this._onAddButtonClick, this);
            this._bar.addChild(this._addButton);

            this._settingsButton = new view.controls.IconButton("images/header/settings-all.svg");
            this._settingsButton.title = common.i18n.tr("Setup page");
            this._settingsButton.name = "settings";
            this._settingsButton.onClick.addHandler(this._onSettingsButtonClick, this);
            this._bar.addChild(this._settingsButton);

            this.addChild(this._bar);
            if (this._chartPanel.config.charts.length === 0) {
                this.editing = true;
                this.element.classList.add("empty");
            }
        }

        cleanup(): void {
            super.cleanup();
        }

        private _onSettingsButtonClick(): void {
            this.editing = !this.editing;
        }

        private _onAddButtonClick(): void {
            var config = {
                id: moment().format("x"), //TODO: create better id
                type: statoscope.charts.getChartTypes()[0],
                title: "",
                axes: [],
                options: {}
            };
            this._chartPanel.config.charts.push(config);
            this._chartPanel.addItem(config, true);
        }

        get editing(): boolean {
            return this.element.classList.contains("editing");
        }

        set editing(value: boolean) {
            if (value) {
                this.element.classList.add("editing");
            }
            else {
                this.element.classList.remove("editing");
                this.element.classList.remove("empty");
            }
            this._settingsButton.pinned = value;
            this._chartPanel.editing = value;
        }
    }
}
