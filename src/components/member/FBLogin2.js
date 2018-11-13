import React from 'react';
const FB = window.FB;

class FBLogin extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            userID: ""

        };

        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1706999339350063',
                cookie     : true,
                xfbml      : true,
                version    : 'v3.0'
            });
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        this.testAPI = this.testAPI.bind(this);
        this.change_state = this.change_state.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
        this.checkLoginState = this.checkLoginState.bind(this);
        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.initialize = this.initialize.bind(this);
    }

    testAPI(){
        console.log('Welcome!  Fetching your information.... ');
    }

    change_state(userID){
        this.setState({
            userID: userID
        });
    }

    statusChangeCallback(response){
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            this.testAPI();
        }
    }

    checkLoginState(){
        const statusChangeCallback = this.statusChangeCallback;
        FB.getLoginStatus(function(response){
            statusChangeCallback(response);
        });
    }

    Login() {
        console.log('function login is called');
        const checkLoginState = this.checkLoginState;
        const change_state = this.change_state;
        FB.login(function(response){
            checkLoginState();
            change_state(response.authResponse.userID);
        }, {scope: 'public_profile, email'});
    }

    Logout() {
        FB.logout(function(response) {
            // user is now logged out
            alert('已成功登出!');
            window.location.reload();
        });
    }

    initialize(){
        const statusChangeCallback = this.statusChangeCallback;
        const change_state = this.change_state;
        FB.getLoginStatus(function(response){
            statusChangeCallback(response);
            let status = response.status;
            if (status == 'connected')
                change_state(response.authResponse.userID);
        });
    }

    componentDidMount(){
        //setTimeout(this.initialize, 200);
    }

    render(){
        return <div>
            <button style={button_FBLogin} onClick={this.Login}>使用 Facebook 帳號登入</button>
            <button style={button_FBLogout} onClick={this.Logout}>(Logout)</button>
        </div>;
    }

}

export default FBLogin;

const button_FBLogin = {
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

const button_FBLogout = {
    'position': 'absolute',
    'left': '0%',
    'top': '10px',
    'border': 'none',
    'backgroundColor': 'white',
};