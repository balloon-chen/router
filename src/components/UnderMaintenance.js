import React from 'react';
import '../stylesheets/underMaintenance.css';
import gif from '../images/施工gif.gif';

class UnderMaintenance extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            state: 1,
            stateMessage: '.',
            password: '',
            apiURL: 'http://140.119.163.194:3002/',
            isUnderMaintenance: 'false'
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
        const { isUnderMaintenance } = this.state;
        if (password === 'toggle'){
            fetch(this.state.apiURL + 'put_updateMaintainStatus', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status: (!isUnderMaintenance).toString()})
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    let status = (!isUnderMaintenance).toString();
                    if (status === 'false')
                        alert('open!');
                    else {
                        alert('close!');
                    }
                });
        }
        else {
            alert('Wrong password!');
        }
        event.preventDefault();
    }

    componentDidMount(){
        setInterval(this.changeState, 800);
        fetch(this.state.apiURL + 'get_searchMaintainStatus', {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({isUnderMaintenance: res.status});
            });
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