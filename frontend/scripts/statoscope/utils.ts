module statoscope.utils {
    export var systemDateFormat = "YYYY-MM-DD";

    export interface IDayInfo {
        date: moment.Moment;
        markPanelConfig: storage.IMarkPanelConfig;
        dayData: storage.IDayData;
    }

    export function clone(object: any): any {
        //TODO: write good code
        return JSON.parse(JSON.stringify(object));
    }
}
