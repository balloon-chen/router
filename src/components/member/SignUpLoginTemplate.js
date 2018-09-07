import React from 'react';
import Login from './Login';
import FBLogin from './FBLogin';
import SignUp from "./SignUp";
import '../../stylesheets/main.css';
import '../../stylesheets/signUpLoginTemplate.css';

class SignUpLoginTemplate extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            renderSignUpMode: false
        };
        this.toggleRenderMode = this.toggleRenderMode.bind(this);
    }

    toggleRenderMode(){
        this.setState({ renderSignUpMode: !this.state.renderSignUpMode });
    }

    renderSignUpMode(){
        return (
            <div className="background">
                <div className="logo"></div>
                <div className="card">
                    <SignUp />
                    <hr className="hrLine" />
                    <p className="textAlreadyHaveAccountOrNot">已經有帳號了嗎？<span className="textAlreadyHaveAccountOrNot_loginOrSignUp" onClick={this.toggleRenderMode}>登入</span></p>
                </div>
            </div>
        )
    }
    renderLoginMode(){
        return (
            <div className="background">
                <div className="logo"></div>
                <div className="card">
                    <Login />
                    <hr className="hrShortLine_left" /><div className="textOr">or</div><hr className="hrShortLine_right" />
                    <button style={button_FacebookLogin}>使用 Facebook 帳號登入</button>
                    <button style={button_GoogleLogin}>使用 Google+ 帳號登入</button>
                    <hr className="hrLine" />
                    <p className="textAlreadyHaveAccountOrNot">還沒有帳號嗎？<span className="textAlreadyHaveAccountOrNot_loginOrSignUp" onClick={this.toggleRenderMode}>註冊</span></p>
                </div>
            </div>
        );
    }
    render(){
        return this.state.renderSignUpMode ? this.renderSignUpMode() : this.renderLoginMode();
    }
}

export default SignUpLoginTemplate;

// css style

const button_FacebookLogin = {
    'transform': 'translate(-50%, -50%)',
    'position': 'relative',
    'left': '50%',
    'top': '20px',
    'width': '90%',
    'height': '40px',
    'borderRadius': '33px',
    'backgroundColor': '#3B5998',
    'border': 'none',

    'marginTop': '5%',
    'marginBottom': '3%',

    'color': 'white',
    'textAlign': 'center',
    'fontSize': '15px',
    'fontWeight': '200',
};

const button_GoogleLogin = {
    'transform': 'translate(-50%, -50%)',
    'position': 'relative',
    'left': '50%',
    'top': '20px',
    'width': '90%',
    'height': '40px',
    'borderRadius': '33px',
    'backgroundColor': '#DC4E41',
    'border': 'none',

    'marginTop': '3%',
    'marginBottom': '5%',

    'color': 'white',
    'textAlign': 'center',
    'fontSize': '15px',
    'fontWeight': '200',
};