import {Updater, Matchers} from 'redux-elm';
import {createSelector} from 'reselect';

import calendarUpdater, {
    initialModel as calendarViewerInit
} from '../calendar/updater';

const FROM_INPUT_NAME = "fromDate";
const TO_INPUT_NAME = "toDate";

export const initialModel = ((fromDate = FROM_INPUT_NAME,
                              toDate = TO_INPUT_NAME) => {
    var model = {
        from: calendarViewerInit(fromDate),
        to: {...calendarViewerInit(toDate)},
        rangeError: false
    };

    return {
        ...model, previousFromSelection: model,
        previousToSelection: model
    };
});


const createDateObject = (({selectedDay, selectedYear, selectedMonth}) => {
    if (selectedDay && selectedYear && selectedMonth) {
        return new Date(selectedYear, selectedMonth, selectedDay);
    }
    else {
        return null;
    }

});

/**
 * Copy & paste from http://salsita.github.io/redux-elm/custom-matchers/writing-custom-matcher.html
 */
const endsWithMatcher = pattern => {
    return action => {
        if (action.type.endsWith(`.${pattern}`)) {
            const wrapRegExp = new RegExp(`(.*)\.${pattern}$`);

            return {
                id: `ends-with${pattern}`,
                unwrappedType: pattern,
                wrap: type => `${action.type.match(wrapRegExp)[1]}.${type}`,
                args: {}
            }
        } else {
            return false;
        }
    };
};

export default new Updater(initialModel())
    .case('From', (model, action) =>
        ({...model, from: calendarUpdater(model.from, action)}))
    .case('To', (model, action) =>
        ({...model, to: calendarUpdater(model.to, action)}))
    .case('DateChanged', (model) => {
        var fromDate = createDateObject(model.from);
        var toDate = createDateObject(model.to);
        // negative range check
        if (fromDate && toDate && (fromDate - toDate) >= 0) {
            model = {
                ...model,
                rangeError: true,
                from: model.previousFromSelection,
                to: model.previousToSelection
            };
        } else {
            model = {
                ...model,
                previousFromSelection: model.from,
                previousToSelection: model.to,
                rangeError: false
            };
        }
        return model;
    }, endsWithMatcher)
    .toReducer();
