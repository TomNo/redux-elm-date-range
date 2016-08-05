import { Updater } from 'redux-elm';
var moment = require('moment');

const MAX_MONTH = 11
const MIN_MONTH = 0

const MONTH_NAMES = moment.months()

const getMaxDayOfMonth = (year, month) => {
	return new Date(year, month + 1, 0).getDate();
}

var A_DATE = new Date();

const getCalendarDate = (sDay, sMonth, sYear) => {
	return [sDay, sMonth + 1, sYear].join(".");
}

export const initialModel = {
	bMonth:  A_DATE.getMonth(),
	bYear:  A_DATE.getFullYear(),
	sDay: A_DATE.getDay(),
	sYear: A_DATE.getFullYear(),
	sMonth: A_DATE.getMonth(),
	monthName: MONTH_NAMES[A_DATE.getMonth()],
	maxDay: getMaxDayOfMonth(A_DATE.getFullYear(), A_DATE.getMonth()),
	date: getCalendarDate(A_DATE.getDay(), A_DATE.getMonth(), A_DATE.getFullYear())
};

const modMonth = ((model, num) => {
	var newMonth = model.bMonth - num;
	var newYear = model.bYear;
	if (newMonth < MIN_MONTH)
	{
		newMonth = MAX_MONTH;
		newYear = newYear - 1;
	}
	else if (newMonth > MAX_MONTH)
	{
		newMonth = MIN_MONTH;
		newYear = newYear + 1;
	}
	return { ...model,
			 bMonth: newMonth,
			 bYear: newYear,
			 monthName:MONTH_NAMES[newMonth],
			 maxDay: getMaxDayOfMonth(newYear, newMonth)};
});


const incMonth = ((model) => {
	return modMonth(model, 1);
});

const decMonth = ((model) => {
	return modMonth(model, -1);
});

export default new Updater(initialModel)
  .case('PrevMonth', model => (incMonth(model)))
  .case('NextMonth', model => (decMonth(model)))
  .case('DateChanged', (model, action) => ({... model,
  										  sDay: action.sDay,
  										  sMonth:model.bMonth,
  										  sYear:model.bYear,
  										  date: getCalendarDate(action.sDay,
  										                        model.bMonth,
  										                        model.bYear)}))
  .toReducer();
