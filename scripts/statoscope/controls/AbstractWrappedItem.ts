module statoscope.controls {
    "use strict";

    export class AbstractWrappedItem<ItemConfig> extends view.Control {
        static sType = "s-abstract-wrapped-item";
        
        private _config: ItemConfig;
        
        constructor(config: ItemConfig, element?: HTMLElement) {
            this._config = config;
            
            super(element);
        }
        
        get config(): ItemConfig {
            return this._config;
        }
        
        update(): void {
        }
    }
}
