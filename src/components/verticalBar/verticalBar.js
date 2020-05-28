import React from 'react';
import './verticalBar.scss';

function VerticalBar() {
  return (
    <div className="v-bar">
        <div className="bar">
            <div className="inner-bar">
                <div className="handle upperHandle"></div>
                <div className="handle lowerHandle"></div>
            </div>
        </div>
    </div>
  );
}

export default VerticalBar;
