import React from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheets/main.css';
import '../stylesheets/loginAndSignUp.css';

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
        // this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    // handleInputChange(event) {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;
    //
    //     this.setState({
    //         [name]: value
    //     });
    // }
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
    handleSubmit(event) {
        // alert(
        //     '用戶名稱：' + this.state.userName + '\n' +
        //     '電子郵件：' + this.state.userEmail + '\n' +
        //     '密碼：' + this.state.userPassword
        // );
        this.fetch();
        event.preventDefault();
    }
    fetch() {
        // fetch('http://140.119.163.194:3000/search')
        //     .then(response => response.json())
        //     .then(parsedJSON => {
        //         console.log('這裏')
        //         console.log(parsedJSON[1].email)
        //     })
        //     .catch(err => console.log(err))
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
                console.log('loginMember: ' + res.result.loginMember.substring(3,res.result.loginMember.length-4));
                console.log('token: ' + res.result.token);
                localStorage.setItem("currentUser", res.result.loginMember.substring(3,res.result.loginMember.length-4));
                localStorage.setItem("currentToken", res.result.token);
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

    componentDidMount() {
        // console.log('Login.js:componentDidMount 會自動執行');
        // fetch('http://140.119.163.194:3000/insert',
        //     {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         method: "POST",
        //         body: JSON.stringify({a: 1, b: 2})
        //     }
        // ).then(function(res){ console.log(res) })
        //  .catch(function(res){ console.log(res) })

        // fetch('http://140.119.163.194:3000/insert', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({name: this.state.userName, password: this.state.userPassword, email: this.state.userEmail})
        // }).then(res=>res.json())
        //   .then(res => console.log(res));
    }

    render(){
        const { result } = this.state;
        const { err } = this.state;
        if(result == '登入成功') {


            return <Redirect push to="/index"/>;
            this.props.history.push({
                pathname: '/index',
                search: '?query=abc',
                state: {result: result}
            })
        }




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

// return
// <input type="text" placeholder="用戶名稱" onChange={this.handleChange} />
// <br/>
// <p>用戶名稱：{this.state.userName}</p>
// <p>電子郵件：{this.state.userEmail}</p>
// <p>密碼：{this.state.userPassword}</p>

export default Login;