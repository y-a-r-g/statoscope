module common.Utils {
    "use strict";

    var lastId = 0;

    export function getUniqueId(): string {
        return "dynamic-" + (++lastId).toString(36);
    }
}
