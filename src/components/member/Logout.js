import React from 'react';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = { redirectToLoginPage: false };
    }

    // 提交表單
    componentDidMount() {
        localStorage.clear();
        this.setState({redirectToLoginPage: true});
    }

    render(){
        const { redirectToLoginPage } = this.state;
        if (redirectToLoginPage)
            return <Redirect to='/'/>;
        return (<div> </div>);
    }
}

export default Logout;