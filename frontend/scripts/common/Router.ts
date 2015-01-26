module common {
    "use strict";

    export interface INavigateOptions {
        page: string;
        [index: string]: string;
    }

    export class Router {
        private static _pages = {};
        private static _currentPage: view.Page;

        static defaultOptions:INavigateOptions;

        static registerPage(name: string, page:any): void {
            Router._pages[name] = page;
        }

        static navigate(options: INavigateOptions, suppressHistoryUpdate?: boolean): void {
            if (Router._currentPage) {
                if (!suppressHistoryUpdate) {
                    var url = "#" + Object.keys(options).
                            map(key => encodeURIComponent(key) + "=" +
                                        encodeURIComponent(options[key])).join('&');
                    history.pushState(options, Router._currentPage.title, url);
                }
                Router._currentPage.cleanup();
            }

            var page = new Router._pages[options.page](options);
            Router._currentPage = page;
            document.title = page.title;
        }

        static get currentPage(): view.Page {
            return Router._currentPage;
        }

        static init(): void {
            if (window.location.hash) {
                try {
                    var options = {};
                    window.location.hash.substring(1).split("&").forEach(item => {
                        var parts = item.split("=");
                        options[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
                    });
                    Router.navigate(<INavigateOptions>options);
                }
                catch(err) {
                    Router._currentPage = null;
                    Router.navigate(Router.defaultOptions);
                }
            }
            else {
                Router.navigate(Router.defaultOptions);
            }
        }
    }

    window.addEventListener('popstate', event => {
        if (event.state) {
            common.Router.navigate(event.state, true);
        }
        else {
            common.Router.init();
        }
    });
}
