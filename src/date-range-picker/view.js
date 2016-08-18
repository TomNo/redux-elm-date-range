import React from 'react';
import {view, forwardTo} from 'redux-elm';

import CalendarViewer from '../calendar/view';

export default view(({model, dispatch}) => {
    return <span>
        <CalendarViewer model={model.from}
                        dispatch={forwardTo(dispatch, 'From')}/>
        -
        <CalendarViewer model={model.to} dispatch={forwardTo(dispatch, 'To')}/>
    </span>;
});
