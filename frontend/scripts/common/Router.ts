module common {
    "use strict";

    export class Router {
        private static _pages = {};
        private static _currentPage: view.Page;

        public static registerPage(name: string, page:typeof view.Page): void {
            Router._pages[name] = page;
        }

        public static navigate(pageName: string, ...args: any[]): void {
            if (Router._currentPage) {
                Router._currentPage.cleanup();
            }

            var page = new Router._pages[pageName]();
            page.init.apply(page, args);
            Router._currentPage = page;
        }
    }
}
