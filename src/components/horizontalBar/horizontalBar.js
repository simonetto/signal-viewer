import React from 'react';
import './horizontalBar.scss';

class HorizontalBar extends React.Component {
    onOuterBarClick = (e) => {
        console.log('click');
        console.log(this);
        console.log(e);
    }

    onInnerBarClick = (e) => {
        e.stopPropagation();
        const width = e.currentTarget.offsetWidth;
        const x = e.nativeEvent.offsetX;
        const percentage = Math.round(x * 100 / width);


        if (percentage < 50) {
            const final = this.props.model.xZoom + this.props.model.xPosition;
            this.props.model.xZoom = (100 - final) - percentage;
            e.target.style.marginLeft = `${percentage}%`;
            e.target.style.width = `${this.props.model.xZoom}%`;
        } else {
            this.props.model.xZoom = (100 - percentage);
            e.target.style.width = `${percentage}%`;
        }
    }

    render() {
        return (
        <div className="h-bar">
            <div className="bar" onClick={(e) => this.onOuterBarClick(e)}>
                <div className="inner-bar" onClick={(e) => this.onInnerBarClick(e)}>
                    <div className="handle upperHandle"></div>
                    <div className="handle lowerHandle"></div>
                </div>
            </div>
        </div>
    );}
};

export default HorizontalBar;
