import React from 'react';
import './chart.scss';
import image from '../../images/image.jpg';

class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.state = {
            yZoomRatio : 3,
            xZoomRatio : 2.4,
            yPosRatio : 10,
            xPosRatio : 25
        };
    }

    onClickHandle(e) {
        let model = Object.assign({}, this.props.model);
        const width = this.chart.current.offsetWidth;
        const height = this.chart.current.offsetHeight;
        const clickX = e.nativeEvent.offsetX;
        const clickY = e.nativeEvent.offsetY;
        const centerX = width / 2;
        const centerY = height / 2;
        const perX = (clickX - centerX) / centerX;
        const perY = (clickY - centerY) / centerY;

        model.xPosition = Math.max(0, perX * this.state.xPosRatio + model.xPosition);
        model.yPosition = Math.max(0, perY * this.state.yPosRatio + model.yPosition);
        model.xPosition = Math.min(100, model.xPosition);
        model.yPosition = Math.min(100, model.yPosition);

        if (model.yPosition + 100 - model.yZoom > 100) {
            model.yPosition = model.yZoom;
        }

        if (model.xPosition + 100 - model.xZoom > 100) {
            model.xPosition = model.xZoom;
        }

        this.props.onChange(model);
    }

    render() {
        return (
            <div ref={this.chart} className="chart">
                <img src={image} alt="chart" style={{
                    height : `${this.props.model.yZoom + 100}%`,
                    width : `${this.props.model.xZoom + 100}%`,
                    left : `${-this.props.model.xPosition}%`,
                    top : `${-this.props.model.yPosition}%`
                }} />
                <div className="clickable" onClick={(e) => this.onClickHandle(e)}></div>
            </div>
    );}
}

export default Chart;
