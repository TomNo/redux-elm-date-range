import React from 'react';
import {view, forwardTo} from 'redux-elm';

import CalendarViewer from '../calendar/view';
import {rangeSelector} from '../date-range-picker/updater'

export default view(({model, dispatch}) => {
    return <div>
        <input type="text" value={rangeSelector(model)} readOnly="true"/>
        <br />
        <CalendarViewer model={model.from}
                        dispatch={forwardTo(dispatch, 'From')}/>
        <br />
        <CalendarViewer model={model.to} dispatch={forwardTo(dispatch, 'To')}/>
    </div>;
});
