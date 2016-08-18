import {Updater} from 'redux-elm';
import {createSelector} from 'reselect';

import calendarUpdater, {
    initialModel as calendarViewerInit
} from '../calendar/updater';

const FROM_INPUT_NAME = "fromDate";
const TO_INPUT_NAME = "toDate";

export const initialModel = ((fromDate = FROM_INPUT_NAME,
                              toDate = TO_INPUT_NAME) => {
    return {
        from: calendarViewerInit(fromDate),
        to: {...calendarViewerInit(toDate)}
    };
});

export default new Updater(initialModel())
    .case('From', (model, action) =>
        ({...model, from: calendarUpdater(model.from, action)}))
    .case('To', (model, action) =>
        ({...model, to: calendarUpdater(model.to, action)}))
    .toReducer();
