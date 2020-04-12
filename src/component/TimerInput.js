import React, { useState } from 'react';

function TimerInput({start}) {
    const [minute, setMinute] = useState()

    const validate = () => {
        if (minute > 0) {
            start(minute * 60)
        } 
    }

    const update = (event) => {
        setMinute(event.target.value)
    }

    return (
        <div className="flex-w flex-c">
            <input placeholder="(Min)" value={minute} className="s1-txt2 x" onChange={update} />
            <button className="start flex-c-m s1-txt2 how-btn1 trans-04" onClick={validate}>START</button>
        </div>
    );
}

export default TimerInput;
