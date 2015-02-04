module statoscope {
    "use strict";

    document.addEventListener('DOMContentLoaded', function() {
        common.Router.registerPage("calendar", statoscope.pages.Calendar);
        common.Router.registerPage("day", statoscope.pages.Day);
        common.Router.registerPage("dashboard", statoscope.pages.Dashboard);
        common.Router.defaultOptions = {page: "day"};
        common.Router.init();
    });

    window.addEventListener('resize', () => {
        var page = common.Router.currentPage;
        if (page) {
            page.relayout();
        }
    });
}
