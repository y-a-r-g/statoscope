module statoscope.storage {

    var DefaultMarkPanelConfig = {
        marks: [
            {id: "1", type: "check", title: "My first check mark", checked: true},
            {id: "2", type: "check", title: "My second check mark", checked: false},
            {id: "3", type: "check", title: "My third check mark", checked: true},
            {id: "4", type: "check", title: "My fourth check mark", checked: false},
        ]
    };

    export class Local implements IStorage {

        private MarkPanelConfigDefault = "mark-panel-config";
        private _markPanelConfig: IMarkPanelConfig;

        constructor() {

        }

        getMarkPanelConfig(callback: MarkPanelConfigCallback, context?: any): void {
            statoscope.bands.Toolbar.indicator.show();

            if (!this._markPanelConfig) {
                var config = JSON.parse(localStorage.getItem(this.MarkPanelConfigDefault));
                this._markPanelConfig = config || DefaultMarkPanelConfig;
            }
            callback.call(context, null, this._markPanelConfig);

            statoscope.bands.Toolbar.indicator.hide();
        }

        saveMarkPanelConfig(callback?: Callback, context?: any): void {
            statoscope.bands.Toolbar.indicator.show();

            localStorage.setItem(this.MarkPanelConfigDefault,
                JSON.stringify(this._markPanelConfig));

            if (callback) {
                callback.call(context);
            }

            statoscope.bands.Toolbar.indicator.hide();
        }
    }
}
