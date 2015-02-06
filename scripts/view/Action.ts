module view {
    "use strict";

    export interface ActionHandler {
        (...args: any[]): void
    }

    interface HandlerHolder {
        handler: ActionHandler;
        context: any;
    }

    export class Action implements ICleanable {
        private _handlers: HandlerHolder[] = [];

        addHandler(handler: ActionHandler, context?: any): void {
            this._handlers.push({
                handler: handler,
                context: context
            });
        }

        removeHandler(handler: ActionHandler, context: any): void {
            this._handlers = this._handlers.
                filter(h => (h.handler !== handler) || (h.context !== context));
        }

        trigger(...args: any[]): void {
            this._handlers.forEach(h => h.handler.apply(h.context, args));
        }

        cleanup(): void {
            this._handlers.splice(0, this._handlers.length);
        }
    }
}
