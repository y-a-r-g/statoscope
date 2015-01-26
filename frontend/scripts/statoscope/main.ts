module statoscope {
    "use strict";

    document.addEventListener('DOMContentLoaded', function() {
        common.Router.registerPage("day", statoscope.pages.Day);
        common.Router.defaultOptions = {page: "day"};
        common.Router.init();
    });

    window.addEventListener('resize', function(event){
        var page = common.Router.currentPage;
        if (page) {
            page.relayout();
        }
    });
}
