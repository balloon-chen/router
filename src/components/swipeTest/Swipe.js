// import React from 'react';
// import ReactDOM from 'react-dom';
// import Carousel from './carousel';
//
// class Swipe extends React.Component {
//     constructor (props, context) {
//         super(props, context);
//         this.state = {
//             axis: 'x'
//         };
//         this.alertText = this.alertText.bind(this);
//     }
//
//     alertText(){
//         alert('TEXT')
//     }
//
//     render () {
//         return (
//             <div style={{height: '100%'}}>
//                 <div style={{height: '80%', width: '80%', border: '1px solid black'}}>
//                     <Carousel loop auto axis={this.state.axis} className="custom-class">
//                         <div style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</div>
//                         <div style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</div>
//                         <div style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</div>
//                         <div style={{backgroundColor: 'orchid', height: '100%'}}>xxxx</div>
//                         <div>asdfghj</div>
//                     </Carousel>
//                 </div>
//                 <br/>
//                 <div style={{height: '80%', width: '80%', border: '1px solid black'}}>
//                     <Carousel loop auto axis={this.state.axis} className="custom-class">
//                         <div style={{backgroundColor: 'royalblue', height: '100%'}}>FRAME 1</div>
//                         <div style={{backgroundColor: 'orange', height: '100%'}}>FRAME 2</div>
//                         <div style={{backgroundColor: 'orchid', height: '100%'}}>FRAME 3</div>
//                         <div style={{backgroundColor: 'orchid', height: '100%'}}>
//                             <button style={{border: '1px solid black'}} onClick={this.alertText}>按我</button>
//                         </div>
//                         <div>asdfghj</div>
//                     </Carousel>
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default Swipe;