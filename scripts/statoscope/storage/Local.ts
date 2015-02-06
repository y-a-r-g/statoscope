module statoscope.storage {

    var DefaultMarkPanelConfig: IMarkPanelConfig = {
        marks: []
    };

    var DefaultDayData: IDayData = { marks: [] };

    export class Local implements IStorage {
        private MarkPanelConfig = "mark-panel-config";
        private DayData = "day-data-";

        constructor() {

        }

        loadMarkPanelConfig(callback: MarkPanelConfigCallback, context?: any): void {
            statoscope.bands.Toolbar.indicator.show();

            var config = JSON.parse(localStorage.getItem(this.MarkPanelConfig))
                || utils.clone(DefaultMarkPanelConfig);
            callback.call(context, null, config);

            statoscope.bands.Toolbar.indicator.hide();
        }

        saveMarkPanelConfig(config: IMarkPanelConfig, callback?: Callback, context?: any): void {
            statoscope.bands.Toolbar.indicator.show();

            localStorage.setItem(this.MarkPanelConfig,
                JSON.stringify(config));

            if (callback) {
                callback.call(context);
            }

            statoscope.bands.Toolbar.indicator.hide();
        }

        loadDayData(date: moment.Moment, callback: DayDataCallback, context: any): void {
            statoscope.bands.Toolbar.indicator.show();

            var dayData = JSON.parse(localStorage.getItem(this.DayData +
                date.format(statoscope.utils.systemDateFormat))) || utils.clone(DefaultDayData);
            callback.call(context, null, dayData);

            statoscope.bands.Toolbar.indicator.hide();
        }

        saveDayData(date: moment.Moment, data: IDayData, callback: Callback, context: any): void {
            statoscope.bands.Toolbar.indicator.show();

            localStorage.setItem(this.DayData + date.format(statoscope.utils.systemDateFormat),
                JSON.stringify(data));

            if (callback) {
                callback.call(context);
            }

            statoscope.bands.Toolbar.indicator.hide();
        }
    }
}
