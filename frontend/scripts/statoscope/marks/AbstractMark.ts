///<reference path="factory.ts" />

module statoscope.marks {
    "use strict";

    export class AbstractMark extends view.Control {
        static sType: string = "s-abstract-mark";

        private _config: storage.IMarkConfig;

        constructor(config) {
            super();

            this._config = config;
        }

        cleanup(): void {
            super.cleanup();
        }

        get config(): storage.IMarkConfig {
            return this._config;
        }

        get title(): string {
            return this._config.title;
        }

        set title(value: string) {
            this._config.title = value;
            this.updateTitle();

            statoscope.bands.Toolbar.indicator.show();
            statoscope.storage.instance().saveMarkPanelConfig(() => {
                statoscope.bands.Toolbar.indicator.hide();
            });
        }

        updateTitle() {

        }
    }
}
