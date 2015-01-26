/// <reference path="../../view/Control.ts" />

interface HTMLElement {
    self:any
}

module statoscope.bands {
    "use strict";

    export class Today extends view.Control {
        static sType = "s-today-band";

        private _date: moment.Moment;
        private _prev: HTMLElement;
        private _next: HTMLElement;
        private _days: HTMLElement[] = [];

        constructor(date: moment.Moment) {
            super();

            this._build();
            this.date = date;
        }

        cleanup(): void {
            super.cleanup();
            this._prev.removeEventListener("click", this._onPrevClick);
            this._days.forEach(day => day.removeEventListener("click", this._onDayClick));
            this._next.removeEventListener("click", this._onNextClick);
        }

        get date(): moment.Moment {
            return this._date;
        }

        set date(value: moment.Moment) {
            this._date = value;
            this._update();
        }

        private _build(): void {
            this._prev = document.createElement("div");
            this._prev.classList.add("prev");
            this._prev.addEventListener("click", this._onPrevClick);
            this._prev.self = this;
            this._prev.innerHTML = "&nbsp;";
            this.element.appendChild(this._prev);

            for (var i = 0; i < 7; i++) {
                var day = document.createElement("div");
                day.classList.add("day");
                day.classList.add("day-" + i);
                day.addEventListener("click", this._onDayClick);
                day.self = this;
                this.element.appendChild(day);
                this._days.push(day);
            }

            this._next = document.createElement("div");
            this._next.classList.add("next");
            this._next.addEventListener("click", this._onNextClick);
            this._next.self = this;
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
                    this._days[i].classList.add("selected");
                }
                else {
                    this._days[i].classList.remove("selected");
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
            var self = event.currentTarget.self,
                date = moment(self.date).subtract(1, "days");

            common.Router.navigate({
                page: "day",
                date: date.format(statoscope.utils.systemDateFormat)
            });
        }

        private _onNextClick(event): void {
            var self = event.currentTarget.self,
                date = moment(self.date).add(1, "days");

            common.Router.navigate({
                page: "day",
                date: date.format(statoscope.utils.systemDateFormat)
            });
        }

        private _onDayClick(event): void {
            var self = event.currentTarget.self,
                index = self._days.indexOf(event.currentTarget),
                date = moment(self.date).add(index - self.date.weekday(), "days");

            common.Router.navigate({
                page: "day",
                date: date.format(statoscope.utils.systemDateFormat)
            });
        }
    }
}
