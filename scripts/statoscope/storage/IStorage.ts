module statoscope.storage {
    "use strict";

    export interface Callback {
        (err: Error): void;
    }

    export interface IMarkConfig {
        id: string;
        type: string;
        title: string;
    }

    export interface IMarkPanelConfig {
        marks: IMarkConfig[];
    }

    export interface MarkPanelConfigCallback {
        (err: Error, config: IMarkPanelConfig): void;
    }

    export interface IMarkData {
        id: string;
        value: any;
    }

    export interface IDayData {
        marks: IMarkData[];
    }

    export interface DayDataCallback {
        (err: Error, data: IDayData): void;
    }

    export interface IStorage {
        loadMarkPanelConfig(callback: MarkPanelConfigCallback, context?: any): void;
        saveMarkPanelConfig(config: IMarkPanelConfig, callback?: Callback, context?: any): void;
        loadDayData(date: moment.Moment, callback: DayDataCallback, context?: any): void;
        saveDayData(date: moment.Moment, data: IDayData, callback?: Callback, context?: any): void;
    }

    var _instance: IStorage;

    export function instance() {
        if (!_instance) {
            _instance = new Local();
        }
        return _instance;
    }
}
