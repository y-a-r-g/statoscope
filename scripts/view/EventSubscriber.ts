/// <reference path="../interfaces.ts" />

module view {
    "use strict";

    interface IEventHolder {
        element: HTMLElement
        type: string
        handler: EventListener
        useCapture: boolean
    }

    export class EventSubscriber implements ICleanable {

        private _eventHolders: IEventHolder[] = [];

        addListener(element: HTMLElement, type: string, handler: EventListener,
                    useCapture?: boolean): number {

            var wrapped = () => handler.apply(this, arguments);
            element.addEventListener(type, wrapped, useCapture);

            this._eventHolders.push({
                element: element,
                type: type,
                handler: wrapped,
                useCapture: useCapture
            });
            return this._eventHolders.length - 1;
        }

        removeListener(id: number): void {
            var holder = this._eventHolders[id];
            if (holder) {
                holder.element.removeEventListener(holder.type, holder.handler, holder.useCapture);
                delete this._eventHolders[id];
            }
        }

        cleanup(): void {
            for (var i = 0; i < this._eventHolders.length; i++) {
                this.removeListener(i);
            }
        }
    }
}
