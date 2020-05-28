import React from 'react';
import './chart.scss';
import image from '../../images/image.jpg';

function Chart() {
  return (
    <div className="chart">
        <img src={image} alt="chart" />
    </div>
  );
}

export default Chart;
