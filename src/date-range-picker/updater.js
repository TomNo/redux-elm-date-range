import {Updater} from 'redux-elm';

import calendarUpdater, {initialModel as calendarViewerInit} from '../calendar/updater';


const initialModel = {
    from: calendarViewerInit,
    to: {...calendarViewerInit},
};

export default new Updater(initialModel)
    .case('From', (model, action) =>
        ({...model, from: calendarUpdater(model.from, action)}))
    .case('To', (model, action) =>
        ({...model, to: calendarUpdater(model.to, action)}))
    .toReducer();
