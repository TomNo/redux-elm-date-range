import React from 'react';
import {view, forwardTo} from 'redux-elm';

import CalendarViewer from '../calendar/view';

const renderRangeError = ((errorPresent) => {
    return errorPresent ? "Error:From date must be sooner then to date." : "";
});

export default view(({model, dispatch}) => {
    return <div>
        <span> {renderRangeError(model.rangeError)} </span>
        <span>
            <CalendarViewer model={model.from}
                            dispatch={forwardTo(dispatch, 'From')}/>
            -
            <CalendarViewer model={model.to}
                            dispatch={forwardTo(dispatch, 'To')}/>
        </span>
    </div>;
});
