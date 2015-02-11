/// <reference path="../../view/Control.ts" />

interface HTMLElement {
    self:any
}

module statoscope.bands {
    "use strict";

    export class Today extends view.Control {
        static sType = "s-today-band";

        private _date: moment.Moment;
        private _prev: HTMLButtonElement;
        private _next: HTMLButtonElement;
        private _days: HTMLButtonElement[] = [];

        constructor(date: moment.Moment) {
            super();

            this._build();
            this.date = date;
        }

        cleanup(): void {
            super.cleanup();
        }

        get date(): moment.Moment {
            return this._date;
        }

        set date(value: moment.Moment) {
            this._date = value;
            this._update();
        }

        private _build(): void {
            this._prev = document.createElement("button");
            this._prev.classList.add("prev");
            this._prev.innerHTML = "&nbsp;";
            this._prev.title = common.i18n.tr("Previous day");
            this.addListener(this._prev, "click", this._onPrevClick);
            this.element.appendChild(this._prev);

            for (var i = 0; i < 7; i++) {
                var day = document.createElement("button");
                day.classList.add("day");
                day.classList.add("day-" + i);
                this.addListener(day, "click", this._onDayClick);
                this.element.appendChild(day);
                this._days.push(day);
            }

            this._next = document.createElement("button");
            this._next.classList.add("next");
            this._prev.innerHTML = "&nbsp;";
            this._next.title = common.i18n.tr("Next day");
            this.addListener(this._next, "click", this._onNextClick);
            this.element.appendChild(this._next);
        }

        private _update(): void {
            var date = moment(this.date);
            var now = moment();
            date.subtract(date.weekday(), "days");

            for (var i = 0; i < 7; i++) {
                var format = "D";
                if (date.month() !== now.month()) {
                    format += " MMM";
                }
                if (date.year() !== now.year()) {
                    format += " YY";
                }
                this._days[i].innerHTML = "<div>" + date.format("ddd") + "</div>" +
                    "<div>" + date.format(format) + "</div>";

                if (date.isSame(this.date, "day")) {
                    this._days[i].classList.add("pinned");
                    this._days[i].disabled = true;
                }
                else {
                    this._days[i].classList.remove("pinned");
                    this._days[i].disabled = false;
                }

                if (date.isSame(now, "day")) {
                    this._days[i].classList.add("today");
                }
                else {
                    this._days[i].classList.remove("today");
                }

                if (date.isAfter(now, "day")) {
                    this._days[i].classList.add("future");
                }
                else {
                    this._days[i].classList.remove("future");
                }

                date.add(1, "days");
            }
        }

        private _onPrevClick(event): void {
            var date = moment(this.date).subtract(1, "days");

            common.Router.navigate({
                page: "day",
                date: date.format(statoscope.utils.systemDateFormat)
            });
        }

        private _onNextClick(event): void {
            var date = moment(this.date).add(1, "days");

            common.Router.navigate({
                page: "day",
                date: date.format(statoscope.utils.systemDateFormat)
            });
        }

        private _onDayClick(event): void {
            var index = this._days.indexOf(event.currentTarget),
                date = moment(this.date).add(index - this.date.weekday(), "days");

            common.Router.navigate({
                page: "day",
                date: date.format(statoscope.utils.systemDateFormat)
            });
        }
    }
}
