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

    export interface IDayConfig {
        marks: IMarkConfig[];
    }

    export interface DayConfigCallback {
        (err: Error, config: IDayConfig): void;
    }
    
    export interface IChartConfig {
        id: string;
        type: string;
        title: string;
        axes: string[];
        options: any;
    }
    
    export interface IDashboardConfig {
        charts: IChartConfig[];
        from: moment.Moment;
        length: moment.Duration;
        frequency: string;
    }
    
    export interface ChartPanelConfigCallback{
        (err: Error, config: IDayConfig): void;
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
    
    export interface IAxisDataDescriptor {
        from: moment.Moment;
        to: moment.Moment;
        frequency: string;
        sourceId: string;
    }
    
    export interface AxisDataCallback {
        (err: Error, data: any[]): void;
    }

    export interface IStorage {
        loadDayConfig(callback: DayConfigCallback, context?: any): void;
        saveDayConfig(config: IDayConfig, callback?: Callback, context?: any): void;
        loadDayData(date: moment.Moment, callback: DayDataCallback, context?: any): void;
        saveDayData(date: moment.Moment, data: IDayData, callback?: Callback, context?: any): void;
        loadDashboardConfig(callback: ChartPanelConfigCallback, context?: any): void;
        saveDashboardConfig(config: IDashboardConfig, callback?: Callback, context?: any): void;
        getAxisData(descriptor: IAxisDataDescriptor, 
                    callback: AxisDataCallback, context?: any):void;
    }

    var _instance: IStorage;

    export function instance() {
        if (!_instance) {
            _instance = new Local();
        }
        return _instance;
    }
}
