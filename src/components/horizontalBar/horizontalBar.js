import React from 'react';
import './horizontalBar.scss';

class HorizontalBar extends React.Component {
    constructor(props) {
        super(props);

        this.bar = React.createRef();
        this.innerBar = React.createRef();
        this.state = {
            innerWidth : 100
        };
    }

    onUpperHandleClick = (e) => {
        e.stopPropagation();
    }

    onLowerHandleClick = (e) => {
        e.stopPropagation();
    }

    onOuterBarClick = (e) => {
        let model = Object.assign({}, this.props.model);
        const outerWidth = this.bar.current.offsetWidth;
        const pos = model.xPosition;
        const zoom = model.xZoom;

        const increase = () => {
            const innerWidth = e.target.offsetWidth;
            const innerX = e.nativeEvent.offsetX;
            const outerX = innerX + pos * outerWidth / 100;  //in px
            const innerPercentage = Math.round(innerX * 100 / innerWidth);
            const outerPercentage = Math.round(outerX * 100 / outerWidth);

            if (innerPercentage > 50) {
                //right
                let newWidth = (outerPercentage - pos);
                model.xZoom = 100 - newWidth;
                this.setState({innerWidth : newWidth + 2});
            } else {
                //left
                const difference = outerPercentage - model.xPosition;
                const newWidth = 100 - zoom - difference;
                model.xPosition = outerPercentage;
                model.xZoom = 100 - newWidth;
                this.setState({innerWidth : newWidth + 2});
            }
        };

        const decrease = () => {
            const outerX = e.nativeEvent.offsetX;
            const outerPercentage = Math.round(outerX * 100 / outerWidth);

            if (outerPercentage < pos) {
                //left
                const difference = model.xPosition - outerPercentage;
                const newWidth = 100 - zoom + difference;
                model.xPosition = outerPercentage;
                model.xZoom = 100 - newWidth;
                this.setState({innerWidth : newWidth + 2});
            } else {
                //right
                let newWidth = (outerPercentage - pos);
                model.xZoom = 100 - newWidth;
                this.setState({innerWidth : newWidth + 2});
            }
        };

        if (e.target === e.currentTarget) {
            //click on outer
            decrease();
        } else {
            //click on inner
            increase();
        }

        this.props.onChange(model);
    }


    render() {
        return (
        <div className="h-bar">
            <div ref={this.bar} className="bar" onClick={(e) => this.onOuterBarClick(e)}>
                <div ref={this.innerBar} className="inner-bar" style={{
                    marginLeft : `${Math.max(0, this.props.model.xPosition - 2)}%`,
                    width : this.state.innerWidth + '%'
                }}>
                    <div className="handle upperHandle" onClick={(e) => this.onUpperHandleClick(e)}></div>
                    <div className="handle lowerHandle" onClick={(e) => this.onLowerHandleClick(e)}></div>
                </div>
            </div>
        </div>
    );}
};

export default HorizontalBar;
