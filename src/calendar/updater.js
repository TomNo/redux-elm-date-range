import {Updater} from 'redux-elm';
import {createSelector} from 'reselect';
import moment from 'moment';


const MAX_MONTH = 11;
const MIN_MONTH = 0;

const MONTH_NAMES = moment.months();

const modMonth = ((model, num) => {
    var newMonth = model.bMonth - num;
    var newYear = model.bYear;
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
        bMonth: newMonth,
        bYear: newYear,
    };
});

const incMonth = ((model) => {
    return modMonth(model, 1);
});

const decMonth = ((model) => {
    return modMonth(model, -1);
});

export const dateSelector = createSelector(
    model => model.sDay,
    model => model.sMonth,
    model => model.sYear,
    ((day, month, year) => [day, month + 1, year].join("."))
);

var A_DATE = new Date();

export const initialModel = {
    bMonth: A_DATE.getMonth(),
    bYear: A_DATE.getFullYear(),
    sDay: A_DATE.getDate(),
    sYear: A_DATE.getFullYear(),
    sMonth: A_DATE.getMonth(),
};

export const monthNameSelector = createSelector(
    model => model.bMonth,
    month => MONTH_NAMES[month]
);

export const lastDayOfMonthSelector = createSelector(
    model => model.bYear,
    model => model.bMonth,
    ((year, month) => new Date(year, month + 1, 0).getDate())
);

export default new Updater(initialModel)
    .case('PrevMonth', model => (incMonth(model)))
    .case('NextMonth', model => (decMonth(model)))
    .case('DateChanged', (model, action) => ({
        ... model,
        sDay: action.sDay,
        sMonth: model.bMonth,
        sYear: model.bYear,
    }))
    .toReducer();
