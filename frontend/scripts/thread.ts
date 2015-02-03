module thread {
    "use strict";

    export interface Callback {
        (...responses: any[][]): void;
    }

    export interface SynchronizedFunction {
        (...args: any[]): void;
    }

    export function synchronized(callback: Callback, ...fns: SynchronizedFunction[]): void {
        var results = [],
            executed = 0;

        function execute(index: number): void {
            fns[index].call(null, function(...args: any[]) {
                results[index] = args;
                executed++;

                if (executed === fns.length) {
                    callback.apply(null, results);
                }
            });
        }

        for (var i = 0; i < fns.length; i++) {
            execute(i);
        }
    }
}
