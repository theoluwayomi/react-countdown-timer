import React from 'react';

function Play({pauseplay, icon}) {
  return (
    <button onClick={pauseplay} className="pauseplay flex-c-m s1-txt2 size5 how-btn1 trans-04"><i className={icon}></i></button>
  );
}

export default Play;
