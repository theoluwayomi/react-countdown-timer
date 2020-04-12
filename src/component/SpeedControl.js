import React from 'react';

const SPEED = {normal: 1.0, fast: 0.75, faster: 0.5}

function SpeedControl({active, speedUp, icon}) {
  return (
    <div>
        <button onClick={() => speedUp(SPEED.normal)} className={[active === SPEED.normal ? 'active ': '', ' s1-txt2 x']}> 1X</button>
        <button onClick={() => speedUp(SPEED.fast)} className={[active === SPEED.fast ? 'active ': '', ' s1-txt2 x']}> 1.5X</button>
        <button onClick={() => speedUp(SPEED.faster)} className={[active === SPEED.faster ? 'active ': '', ' s1-txt2 x']}> 2X</button>
    </div>
  );
}

export default SpeedControl;
