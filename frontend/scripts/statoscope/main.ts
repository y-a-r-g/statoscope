module statoscope {
    "use strict";

    document.addEventListener('DOMContentLoaded', function() {
        common.Router.registerPage("day", statoscope.pages.Day);
        common.Router.navigate("day");
    });
}
