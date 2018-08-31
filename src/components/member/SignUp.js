import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/main.css';
import '../../stylesheets/loginAndSignUp.css';

class SignUp extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            userName: "",
            userEmail: "",
            userPassword: "",
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
    // 連接 API 並填入註冊資訊
    fetch() {
        fetch('http://140.119.163.194:3000/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: this.state.userName, password: this.state.userPassword, email: this.state.userEmail})
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                if (res.status == undefined){
                    this.setState({result: res.result.status});
                    this.setState({err: res.result.err});
                }
                else {
                    this.setState({result: res.status});
                    this.setState({err: res.err});
                }
            });
    }

    render(){
        const { result } = this.state;
        const { err } = this.state;
        if(result == '註冊成功')
            return <Redirect push to="/index" />;

        return (
            <div>
                <div className="textLoginOrSignUp">註冊</div>
                <form onSubmit={this.handleSubmit}>
                    <input className="inputField" type="text" placeholder="用戶名稱" onChange={this.handleChange} />
                    <input className="inputField" type="text" placeholder="電子郵件" onChange={this.handleChange} />
                    <input className="inputField" type="password" placeholder="密碼" onChange={this.handleChange} />
                    <input className="inputField" type="password" placeholder="再輸入一次密碼" />
                    <p className="errorMessage">{ err }</p>
                    <input className="inputField inputField_loginOrSignUp" type="submit" value="註冊" />
                </form>
                <div className="textSignUpNotice">點擊「註冊」即表示你同意我們的使用條款、資料政策和 Cookie 政策。
                    你可能會收到我們的簡訊通知，而且可以隨時選擇停止接收。</div>
            </div>
        );
    }
}

export default SignUp;