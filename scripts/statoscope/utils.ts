module statoscope.utils {
    export var systemDateFormat = "YYYY-MM-DD";

    export interface IDayInfo {
        date: moment.Moment;
        dayConfig: storage.IDayConfig;
        dayData: storage.IDayData;
        addMark(markConfig: storage.IMarkConfig, dayInfo: utils.IDayInfo): void;
    }

    export function clone(object: any): any {
        //TODO: write good code
        return JSON.parse(JSON.stringify(object));
    }
}
