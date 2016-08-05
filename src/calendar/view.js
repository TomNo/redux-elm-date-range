import React from 'react';
import {view} from 'redux-elm';


const btnStyle = {
    width: '80px',
    height: '40px'
};

const selectedDay = {
    color: 'red'
};

const renderButton = ((text, action, dispatch) => {
    return <button style={btnStyle} onClick={()=>dispatch({type: action})}>
        {text}
    </button>;
});


const isCurrentDay = (({sDay, sYear, sMonth, bYear, bMonth}, day) => {
    return (sDay == day && sYear == bYear && sMonth == bMonth);
});

const renderDays = ((model, dispatch) => {
    var content = [];
    for (var i = 1; i <= model.maxDay; i++) {
        var styleProp = {};
        if (isCurrentDay(model, i)) {
            styleProp = selectedDay;
        }

        content.push(<span style={styleProp}
                           onClick={(ev) => dispatch({type: "DateChanged", sDay: ev.target.innerText})}
                           key={i}> {i} </span>);
    }
    return content;
});


export default view(({model, dispatch}) => {
    return <span>
                {renderButton("prev month", "PrevMonth", dispatch)}
        <span>
                    <span>
                        {renderDays(model, dispatch)}
                    </span>
                    <span>
                        {model.monthName} / {model.bYear}
                    </span>
                </span>
        {renderButton("next month", "NextMonth", dispatch)}
          </span>;
});
