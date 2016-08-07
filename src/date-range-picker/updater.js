import {Updater} from 'redux-elm';
import {createSelector} from 'reselect';

import calendarUpdater, {
    initialModel as calendarViewerInit,
    dateSelector
} from '../calendar/updater';


const initialModel = {
    from: calendarViewerInit,
    to: {...calendarViewerInit},
};

export const rangeSelector = createSelector(
    model => dateSelector(model.from),
    model => dateSelector(model.to),
    (from, to) => [from, to].join("-")
);

export default new Updater(initialModel)
    .case('From', (model, action) =>
        ({...model, from: calendarUpdater(model.from, action)}))
    .case('To', (model, action) =>
        ({...model, to: calendarUpdater(model.to, action)}))
    .toReducer();
