// https://reactjsexample.com/minimal-carousel-component-for-react/
// https://github.com/amio/re-carousel

import React from 'react';
import Carousel from './Carousel';

class Swipe extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = {
            axis: 'x'
        };
        this.alertText = this.alertText.bind(this);
    }

    alertText(){
        alert('TEXT')
    }

    render () {
        return (
            <div style={{height: '100%'}}>
                <div style={{
                    height: '360px',
                    width: '280px',
                    border: '1px solid black',
                    transform: 'translate(-50%, 5%)',
                    position: 'relative',
                    left: '50%',
                    borderRadius: '30px',
                    overflow: 'hidden'
                }}>
                    <Carousel loop auto axis={this.state.axis} className="custom-class">
                        <div style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</div>
                        <div style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</div>
                        <div style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</div>
                    </Carousel>
                </div>
                <br/>
                <div style={{
                    height: '360px',
                    width: '280px',
                    border: '1px solid black',
                    transform: 'translate(-50%, 5%)',
                    position: 'relative',
                    left: '50%',
                    borderRadius: '30px',
                    overflow: 'hidden'
                }}>
                    <Carousel loop auto axis={this.state.axis} className="custom-class">
                        <div style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</div>
                        <div style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</div>
                        <div style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</div>
                        <div style={{backgroundColor: 'orange', height: '100%'}}>
                            <button style={{border: '1px solid black'}} onClick={this.alertText}>按我</button>
                        </div>
                    </Carousel>
                </div>
                <br/>
                <div style={{
                    height: '360px',
                    width: '280px',
                    border: '1px solid black',
                    transform: 'translate(-50%, 5%)',
                    position: 'relative',
                    left: '50%',
                    borderRadius: '30px',
                    overflow: 'hidden'
                }}>
                    <Carousel loop auto axis={this.state.axis} className="custom-class">
                        <div style={{height: '100%'}}>FRAME 1</div>
                        <div style={{height: '100%'}}>FRAME 2</div>
                        <div style={{height: '100%'}}>FRAME 3</div>
                    </Carousel>
                </div>
            </div>
        )
    }
}

export default Swipe;