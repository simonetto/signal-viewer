import React from 'react';
import './container.scss';
import Chart from '../chart';
import VerticalBar from '../verticalBar';
import HorizontalBar from '../horizontalBar';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xPosition : 0,
            yPosition : 0,
            xZoom : 0,
            yZoom : 0
        };
    }

    handleChange(model) {
        this.setState({
            xPosition : model.xPosition,
            yPosition : model.yPosition,
            xZoom : model.xZoom,
            yZoom : model.yZoom
        });
    }

    render() {
        return (
            <section className="main">
                <div className="window">
                    <div className="header"></div>
                    <div className="content">
                        <div className="left">
                            <div className="top"></div>
                            <div className="bottom">
                                    <VerticalBar model={this.state} onChange={this.handleChange.bind(this)} />
                                <div className="chart-box">
                                    <Chart model={this.state} onChange={this.handleChange.bind(this)} />
                                    <HorizontalBar model={this.state} onChange={this.handleChange.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="right"></div>
                    </div>
                    <div className="footer">
                        <p>Move the handles on the bar to zoom</p>
                        <p>Click on the image to pan</p>
                    </div>
                </div>
            </section>
    );}
};

export default Container;
