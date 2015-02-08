module statoscope.storage {

    var DefaultDayConfig: IDayConfig = {
        marks: []
    };
    
    var DefaultDashboardConfig: IDashboardConfig = {
        charts: [],
        from: null,
        length: moment.duration(1, "months"),
        frequency: "days"
    };

    var DefaultDayData: IDayData = { marks: [] };

    export class Local implements IStorage {
        private DayConfig = "day-config";
        private DashboardConfig = "dashboard-config";
        private DayData = "day-data-";

        constructor() {

        }

        loadDayConfig(callback: DayConfigCallback, context?: any): void {
            statoscope.bands.Toolbar.indicator.show();

            var config = JSON.parse(localStorage.getItem(this.DayConfig))
                || utils.clone(DefaultDayConfig);
            callback.call(context, null, config);

            statoscope.bands.Toolbar.indicator.hide();
        }

        saveDayConfig(config: IDayConfig, callback?: Callback, context?: any): void {
            statoscope.bands.Toolbar.indicator.show();

            localStorage.setItem(this.DayConfig, JSON.stringify(config));

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

        loadDashboardConfig(callback: ChartPanelConfigCallback, context: any): void {
            statoscope.bands.Toolbar.indicator.show();

            var config = JSON.parse(localStorage.getItem(this.DashboardConfig))
                || utils.clone(DefaultDashboardConfig);
            callback.call(context, null, config);

            statoscope.bands.Toolbar.indicator.hide();
        }

        saveDashboardConfig(config: IDashboardConfig, callback: Callback, context: any): void {
            statoscope.bands.Toolbar.indicator.show();

            localStorage.setItem(this.DashboardConfig, JSON.stringify(config));

            if (callback) {
                callback.call(context);
            }

            statoscope.bands.Toolbar.indicator.hide();
        }

        getAxisData(descriptor: IAxisDataDescriptor, 
                    callback: AxisDataCallback, context: any): void {
            //TODO: implement me
        }
    }
}
