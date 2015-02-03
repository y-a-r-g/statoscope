module statoscope.storage {

    var DefaultMarkPanelConfig = {
        marks: [
            {type: "check", title: "My first check mark", checked: true},
            {type: "check", title: "My second check mark", checked: false},
            {type: "check", title: "My third check mark", checked: true},
            {type: "check", title: "My fourth check mark", checked: false},
        ]
    };

    export class Local implements IStorage {

        private MarkPanelConfigDefault = "mark-panel-config";
        private _markPanelConfig: IMarkPanelConfig;

        constructor() {

        }

        loadMarkPanelConfig(callback: MarkPanelConfigCallback, context?: any): void {
            var config = JSON.parse(localStorage.getItem(this.MarkPanelConfigDefault));
            this._markPanelConfig = config || DefaultMarkPanelConfig;
            callback.call(context, null, this._markPanelConfig);
        }

        saveMarkPanelConfig(callback: Callback, context?: any): void {
            localStorage.setItem(this.MarkPanelConfigDefault,
                JSON.stringify(this._markPanelConfig));
            callback.call(context);
        }
    }
}
