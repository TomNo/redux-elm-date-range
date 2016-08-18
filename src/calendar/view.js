import React from 'react';
import {view} from 'redux-elm';
import {
    lastDayOfMonthSelector,
    monthNameSelector,
    dateSelector
} from '../calendar/updater'

const btnStyle = {
    width: '80px',
    height: '40px'
};

const selectedDayStyle = {
    color: 'red'
};

const renderButton = ((text, action, dispatch) => {
    return <button style={btnStyle} onClick={()=>dispatch({type: action})}>
        {text}
    </button>;
});

const isCurrentDay = (({
    selectedDay,
    selectedYear,
    selectedMonth,
    browsingYear,
    browsingMonth
}, day) => {
    return (selectedDay == day && selectedYear == browsingYear &&
    selectedMonth == browsingMonth);
});

const renderDays = ((model, dispatch) => {
    var content = [];
    for (var i = 1; i <= lastDayOfMonthSelector(model); i++) {
        var styleProp = {};
        if (isCurrentDay(model, i)) {
            styleProp = selectedDayStyle;
        }

        content.push(<span style={styleProp}
                           onClick={(ev) => dispatch({
                               type: "DateChanged",
                               selectedDay: ev.target.innerText
                           })}
                           key={i}> {i} </span>);
    }
    return content;
});

export default view(({model, dispatch}) => {
    return <div>
        <input type="text" name={model.name} value={dateSelector(model)}
               readOnly="true"/>
        <div>
            <div>
            {renderButton("prev month", "PrevMonth", dispatch)}
                {renderDays(model, dispatch)}
                {renderButton("next month", "NextMonth", dispatch)}
            </div>
            {monthNameSelector(model)} / {model.browsingYear}
        </div>
    </div>;
});
