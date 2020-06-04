import React from 'react';
import './verticalBar.scss';

class VerticalBar extends React.Component {
    constructor(props) {
        super(props);

        this.bar = React.createRef();
        this.innerBar = React.createRef();
        this.state = {
            innerHeight : 100
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
        const outerHeight = this.bar.current.offsetHeight;
        const pos = model.yPosition;
        const zoom = model.yZoom;

        const increase = () => {
            const innerHeight = e.target.offsetHeight;
            const innerX = e.nativeEvent.offsetY;
            const outerX = innerX + pos * outerHeight / 100;  //in px
            const innerPercentage = Math.round(innerX * 100 / innerHeight);
            const outerPercentage = Math.round(outerX * 100 / outerHeight);

            if (innerPercentage > 50) {
                //bottom
                let newHeight = (outerPercentage - pos);
                model.yZoom = 100 - newHeight;
                this.setState({innerHeight : newHeight + 2});
            } else {
                //top
                const difference = outerPercentage - model.yPosition;
                const newHeight = 100 - zoom - difference;
                model.yPosition = outerPercentage;
                model.yZoom = 100 - newHeight;
                this.setState({innerHeight : newHeight + 2});
            }
        };

        const decrease = () => {
            const outerX = e.nativeEvent.offsetY;
            const outerPercentage = Math.round(outerX * 100 / outerHeight);

            if (outerPercentage < pos) {
                //top
                const difference = model.yPosition - outerPercentage;
                const newHeight = 100 - zoom + difference;
                model.yPosition = outerPercentage;
                model.yZoom = 100 - newHeight;
                this.setState({innerHeight : newHeight + 2});
            } else {
                //bottom
                let newHeight = (outerPercentage - pos);
                model.yZoom = 100 - newHeight;
                this.setState({innerHeight : Math.min(100, Math.min(100, newHeight + 2))});
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
            <div className="v-bar">
                <div ref={this.bar} className="bar" onClick={(e) => this.onOuterBarClick(e)}>
                    <div ref={this.innerBar} className="inner-bar" style={{
                        top : `${Math.max(0, this.props.model.yPosition - 2)}%`,
                        height : this.state.innerHeight + '%'
                    }}>
                        <div className="handle upperHandle" onClick={(e) => this.onUpperHandleClick(e)}></div>
                        <div className="handle lowerHandle" onClick={(e) => this.onLowerHandleClick(e)}></div>
                    </div>
                </div>
            </div>
    );}
}

export default VerticalBar;
