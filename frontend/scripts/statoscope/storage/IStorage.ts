module statoscope.storage {
    "use strict";

    export interface IMarkConfig {
        id: string;
        type: string;
        title: string;
    }

    export interface IMarkPanelConfig {
        marks: IMarkConfig[];
    }

    export interface Callback {
        (err: Error): void;
    }

    export interface MarkPanelConfigCallback {
        (err: Error, config: IMarkPanelConfig): void;
    }

    export interface IStorage {
        getMarkPanelConfig(callback: MarkPanelConfigCallback, context?: any): void;
        saveMarkPanelConfig(callback?: Callback, context?: any): void;
    }

    var _instance: IStorage;

    export function instance() {
        if (!_instance) {
            _instance = new Local();
        }
        return _instance;
    }
}
