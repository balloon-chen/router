import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/main.css';
import '../../stylesheets/loginAndSignUp.css';

class Login extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            userName: "userName",
            userEmail: "userEmail@gmail.com",
            userPassword: "userPassword",
            result: '',
            err: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
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
        fetch('http://140.119.163.194:3000/login', {
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
                    }
                    else {
                        this.setState({err: res.result.content});
                    }
                }
            });
    }

    render(){
        const { result } = this.state;
        const { err } = this.state;
        if(result == '登入成功')
            return <Redirect push to="/index"/>;

        return (
            <div>
                <div className="textLoginOrSignUp">登入</div>
                <form onSubmit={this.handleSubmit}>
                    <input className="inputField" type="text" placeholder="電子郵件" onChange={this.handleChange} />
                    <input className="inputField" type="password" placeholder="密碼" onChange={this.handleChange} />
                    <p className="errorMessage">{ err }</p>
                    <input className="inputField inputField_loginOrSignUp" type="submit" value="登入" />
                </form>
                <div className="textForgetPassword">忘記密碼？</div>
            </div>
        );
    }
}

export default Login;