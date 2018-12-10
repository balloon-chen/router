import React from 'react';
import '../stylesheets/underMaintenance.css';
import gif from '../images/施工gif.gif';

class UnderMaintenance extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            state: 1,
            stateMessage: '.',
            password: ''
        };
        this.changeState = this.changeState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeState(){
        const { state } = this.state;
        if (state === 1){
            this.setState({state: 2});
            this.setState({stateMessage: '..'});
        }
        else if (state === 2){
            this.setState({state: 3});
            this.setState({stateMessage: '...'});
        }
        else {
            this.setState({state: 1});
            this.setState({stateMessage: '.'});
        }
    }

    handleChange(event) {
        switch (event.target.name){
            case 'toggleRenderMode':{
                this.setState({password: event.target.value});
                break;
            }
            default: {
                break;
            }
        }
    }
    handleSubmit(event){
        const { password } = this.state;
        if (password === 'toggle'){
            alert('Toggle!');
        }
        else {
            alert('Wrong password!');
        }
        event.preventDefault();
    }

    componentDidMount(){
        setInterval(this.changeState, 800);
    }

    render() {
        const { stateMessage } = this.state;

        return (
            <div className="underMaintenance_background">
                <h1 className='underMaintenance_text'>施工中{stateMessage}</h1>
                <img className='underMaintenance_img' src={gif} alt=""/>
                <form onSubmit={this.handleSubmit}>
                    <input type="password" name='toggleRenderMode' className='underMaintenance_input' onChange={this.handleChange} />
                </form>
            </div>
        );
    }
}

export default UnderMaintenance;