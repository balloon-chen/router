import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/main.css';
import '../../stylesheets/loginAndSignUp.css';

import iconUser from '../../images/iconUser.svg';
import iconEmail from '../../images/email.svg';
import iconLock from '../../images/iconLock.svg';
import iconError from '../../images/iconError.svg';
import iconCheck from '../../images/iconCheck.svg';

class SignUp extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            apiURL: 'http://140.119.163.194/',
            // apiURL: 'http://localhost/',
            userName: "",
            userEmail: "",
            userPassword: "",
            result: '',
            err: '',
            errIcon: 'invisible',
            retypePassword: 'retypePassword_yes',
            retypePasswordCheckIconInvisible: 'invisible'
    };
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
    }

    handleChangeCheck(event){
        if (event.target.value !== this.state.userPassword){
            this.setState({err: '密碼不符'});
            this.setState({errIcon: ''});
            this.setState({retypePassword: 'retypePassword_no'});
            this.setState({retypePasswordCheckIconInvisible: 'invisible'});
        }
        else {
            this.setState({err: ''});
            this.setState({errIcon: 'invisible'});
            this.setState({retypePassword: 'retypePassword_yes'});
            this.setState({retypePasswordCheckIconInvisible: ''});
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
    // 連接 API 並填入註冊資訊
    fetch() {
        let formData = new FormData();
        formData.append('userName', this.state.userName);
        formData.append('password', this.state.userPassword);
        formData.append('email', this.state.userEmail);

        fetch(this.state.apiURL+'register', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                if (res.content){
                    console.log('loginMember: ' + res.content.userName);
                    localStorage.setItem("currentUser", res.content.userName);
                    console.log('userID: ' + res.content._id);
                    localStorage.setItem("currentUserID", res.content._id);
                }
                if (res.status === undefined){
                    this.setState({result: res.result.status});
                    this.setState({err: res.result.err});
                    this.setState({errIcon: ''});
                }
                else {
                    this.setState({result: res.status});
                    this.setState({err: res.err});
                    this.setState({errIcon: ''});
                }
            });
    }
    // 舊的，fetch()已棄用
    // fetch() {
    //     // fetch('http://140.119.163.194:3000/register', {
    //     fetch(this.state.apiURL+'register', {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({userName: this.state.userName, password: this.state.userPassword, email: this.state.userEmail})
    //     }).then(res=>res.json())
    //         .then(res => {
    //             console.log(res);
    //             if (res.content){
    //                 console.log('loginMember: ' + res.content.userName);
    //                 localStorage.setItem("currentUser", res.content.userName);
    //                 // console.log('token: ' + res.content.token);
    //                 // localStorage.setItem("currentToken", res.result.token);
    //                 console.log('userID: ' + res.content._id);
    //                 localStorage.setItem("currentUserID", res.content._id);
    //             }
    //             if (res.status === undefined){
    //                 this.setState({result: res.result.status});
    //                 this.setState({err: res.result.err});
    //                 this.setState({errIcon: ''});
    //             }
    //             else {
    //                 this.setState({result: res.status});
    //                 this.setState({err: res.err});
    //                 this.setState({errIcon: ''});
    //             }
    //         });
    // }

    render(){
        const { result } = this.state;
        const { err } = this.state;
        const { errIcon } = this.state;
        const { retypePassword } = this.state;
        const { retypePasswordCheckIconInvisible } = this.state;

        if(result === '註冊成功')
            return <Redirect push to="/UploadUserPhoto" />;

        return (
            <div>
                <div className="textLoginOrSignUp">註冊</div>
                <form onSubmit={this.handleSubmit}>
                    <div className="inputFieldAlign">
                        <input className="inputField" type="text" placeholder="用戶名稱" onChange={this.handleChange} />
                        <img src={iconUser} alt="iconUser"/>
                    </div>

                    {/*<input className="inputField" type="text" placeholder="電子郵件" onChange={this.handleChange} />*/}

                    <div className="inputFieldAlign">
                        <input className="inputField" type="text" placeholder="電子郵件" onChange={this.handleChange} />
                        <img src={iconEmail} alt="iconEmail"/>
                    </div>

                    {/*<input className="inputField" type="password" placeholder="密碼" onChange={this.handleChange} />*/}

                    <div className="inputFieldAlign">
                        <input className="inputField" type="password" placeholder="密碼" onChange={this.handleChange} />
                        <img src={iconLock} alt="iconLock"/>
                    </div>

                    <div className="inputFieldAlign">
                        <input className={"inputField " + retypePassword} type="password" placeholder="再輸入一次密碼" onChange={this.handleChangeCheck} />
                        {/*要換綠色勾勾*/}
                        <img src={iconLock} alt="iconLock" className='opacity-zero' />
                        <img src={iconCheck} alt="iconLock" className={retypePasswordCheckIconInvisible} />
                    </div>

                    <div className="errorMessageDiv">
                        <img src={iconError} alt="iconEmail" className={errIcon} /><span className="errorMessage">{ err }</span>
                    </div>
                    <input className="inputField inputField_loginOrSignUp" type="submit" value="註冊" />
                </form>
                <div className="textSignUpNotice">點擊「註冊」即表示你同意我們的使用條款、資料政策和 Cookie 政策。
                    你可能會收到我們的簡訊通知，而且可以隨時選擇停止接收。</div>
            </div>
        );
    }
}

export default SignUp;