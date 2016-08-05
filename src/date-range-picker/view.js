import React from 'react';
import {view, forwardTo} from 'redux-elm';


import CalendarViewer from '../calendar/view';


export default view(({model, dispatch}) => {
    return <div>
        <input type="text" value={model.from.date + "-" + model.to.date} readOnly="true"/>
        <br />
        <CalendarViewer model={model.from} dispatch={forwardTo(dispatch, 'From')}/>
        <br />
        <CalendarViewer model={model.to} dispatch={forwardTo(dispatch, 'To')}/>
    </div>;
});
