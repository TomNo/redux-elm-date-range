import {Updater} from 'redux-elm';
import {createSelector} from 'reselect';
import moment from 'moment';


const MAX_MONTH = 11;
const MIN_MONTH = 0;

const MONTH_NAMES = moment.months();

const modMonth = ((model, num) => {
    var newMonth = model.browsingMonth - num;
    var newYear = model.browsingYear;
    if (newMonth < MIN_MONTH) {
        newMonth = MAX_MONTH;
        newYear = newYear - 1;
    }
    else if (newMonth > MAX_MONTH) {
        newMonth = MIN_MONTH;
        newYear = newYear + 1;
    }
    return {
        ...model,
        browsingMonth: newMonth,
        browsingYear: newYear,
    };
});

const incMonth = ((model) => {
    return modMonth(model, 1);
});

const decMonth = ((model) => {
    return modMonth(model, -1);
});

export const dateSelector = createSelector(
    model => model.selectedDay,
    model => model.selectedMonth,
    model => model.selectedYear,
    ((day, month, year) => {
        return (day && month && year) ? [day, month + 1, year].join("."): "";
    })
);

var A_DATE = new Date();

export const initialModel = {
    browsingMonth: A_DATE.getMonth(),
    browsingYear: A_DATE.getFullYear(),
    selectedDay: null,
    selectedYear: null,
    selectedMonth: null,
};

export const monthNameSelector = createSelector(
    model => model.browsingMonth,
    month => MONTH_NAMES[month]
);

export const lastDayOfMonthSelector = createSelector(
    model => model.browsingYear,
    model => model.browsingMonth,
    ((year, month) => new Date(year, month + 1, 0).getDate())
);

export default new Updater(initialModel)
    .case('PrevMonth', model => (incMonth(model)))
    .case('NextMonth', model => (decMonth(model)))
    .case('DateChanged', (model, action) => ({
        ... model,
        selectedDay: action.selectedDay,
        selectedMonth: model.browsingMonth,
        selectedYear: model.browsingYear,
    }))
    .toReducer();
