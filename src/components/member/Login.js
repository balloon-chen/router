import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/main.css';
import '../../stylesheets/loginAndSignUp.css';

import iconEmail from '../../images/email.svg';
import iconLock from '../../images/iconLock.svg';
import iconDisplayPassword from '../../images/iconDisplayPassword.svg';
import iconHidePassword from '../../images/iconHidePassword.svg';
import iconError from '../../images/iconError.svg';

class Login extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            // apiURL: 'http://140.119.163.194:3000/',
            apiURL: 'http://140.119.163.194:3000/',
            userName: "userName",
            userEmail: "userEmail@gmail.com",
            userPassword: "",
            result: '',
            err: '',
            iconDisplayPassword_invisible: '',
            iconHidePassword_invisible: 'invisible',
            inputDisplayPassword_invisible: ' z-index',
            inputHidePassword_invisible: '',
            errIcon: 'invisible'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.toggleDisplayHidePassword = this.toggleDisplayHidePassword.bind(this);
    }

    // 切換顯示或隱藏密碼
    toggleDisplayHidePassword() {
        if (this.state.iconDisplayPassword_invisible === 'invisible'){
            this.setState({iconDisplayPassword_invisible: ''});
            this.setState({iconHidePassword_invisible: 'invisible'});
            this.setState({inputDisplayPassword_invisible: ' z-index'});
            this.setState({inputHidePassword_invisible: ''});
        }
        else {
            this.setState({iconDisplayPassword_invisible: 'invisible'});
            this.setState({iconHidePassword_invisible: ''});
            this.setState({inputDisplayPassword_invisible: ''});
            this.setState({inputHidePassword_invisible: ' z-index'});
        }
    }
    // 取得輸入值
    handleChange(event) {
        switch (event.target.placeholder){
            case '用戶名稱':{
                this.setState({userName: event.target.value});
                break;
            }
            case '電子郵件':{
                this.setState({userEmail: event.target.value});
                break;
            }
            case '密碼':{
                this.setState({userPassword: event.target.value});
                break;
            }
            default: {
                break;
            }
        }
    }
    // 提交表單
    handleSubmit(event) {
        this.fetch();
        event.preventDefault();
    }
    // 連接 API 並填入登入資訊
    fetch() {
        // fetch('http://140.119.163.194:3000/login', {
        fetch(this.state.apiURL+'login', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.state.userName, password: this.state.userPassword, email: this.state.userEmail})
        }).then(res => {
            console.log(res.headers);
            return res.json();
        })
            .then(res => {
                console.log(res);
                if (res.result.loginMember != undefined){
                    console.log('loginMember: ' + res.result.loginMember.substring(3,res.result.loginMember.length-4));
                    localStorage.setItem("currentUser", res.result.loginMember.substring(3,res.result.loginMember.length-4));
                }
                if (res.result.token != undefined){
                    console.log('token: ' + res.result.token);
                    localStorage.setItem("currentToken", res.result.token);
                }
                if (res.result.userID != undefined){
                    console.log('userID: ' + res.result.userID);
                    localStorage.setItem("currentUserID", res.result.userID);
                }
                this.setState({result: res.result.status});
                if (res.result.status == '登入失敗'){
                    if (res.result.content == undefined){
                        this.setState({err: res.result.err});
                        this.setState({errIcon: ''});
                    }
                    else {
                        this.setState({err: res.result.content});
                        this.setState({errIcon: ''});
                    }
                }
            });
    }

    render(){
        const { result } = this.state;
        const { err } = this.state;
        const { errIcon } = this.state;
        const { iconDisplayPassword_invisible } = this.state;
        const { iconHidePassword_invisible } = this.state;
        const { inputDisplayPassword_invisible } = this.state;
        const { inputHidePassword_invisible } = this.state;
        const { userPassword } = this.state;

        if(result == '登入成功')
            return <Redirect push to="/index"/>;

        return (
            <div>
                <div className="textLoginOrSignUp">登入</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="inputFieldAlign">
                        <input className="inputField" type="text" placeholder="電子郵件" onChange={this.handleChange} />
                        <img src={iconEmail} alt="iconEmail"/>
                    </div>
                    <div className="inputFieldAlign">
                        <input className={"inputField" + inputDisplayPassword_invisible} type="password" placeholder="密碼" onChange={this.handleChange} value={userPassword} />
                        <input className={"inputField" + inputHidePassword_invisible} type="text" placeholder="密碼" onChange={this.handleChange} value={userPassword} />
                        <img src={iconLock} alt="iconLock"/>
                        <img src={iconDisplayPassword} className={iconDisplayPassword_invisible} alt="iconDisplayPassword" onClick={this.toggleDisplayHidePassword} />
                        <img src={iconHidePassword} className={iconHidePassword_invisible} alt="iconHidePassword" onClick={this.toggleDisplayHidePassword} />
                    </div>
                    <div className="errorMessageDiv">
                        <img src={iconError} alt="iconEmail" className={errIcon} /><span className="errorMessage">{ err }</span>
                    </div>
                    <input className="inputField inputField_loginOrSignUp" type="submit" value="登入" />
                </form>
                <div className="textForgetPassword">忘記密碼？</div>
            </div>
        );
    }
}

export default Login;