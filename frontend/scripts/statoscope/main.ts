module statoscope {
    "use strict";

    (function main() {
        common.Router.registerPage("day", statoscope.pages.Day);
        common.Router.navigate("day");
    }());
}
