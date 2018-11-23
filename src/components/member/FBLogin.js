import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import * as firebase from 'firebase';

class FBLogin extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                {/*<FacebookLogin*/}
                    {/*appId="1706999339350063"*/}
                    {/*fields="name, email, picture"*/}
                    {/*callback={responseFacebook}*/}
                    {/*render={renderProps => (*/}
                        {/*<button onClick={renderProps.onClick} style={button_FBLogin}>使用 Facebook 帳號登入</button>*/}
                    {/*)}*/}
                    {/*// onClick={componentClicked}*/}
                    {/*// autoLoad={true}*/}
                    {/*// cssClass=""*/}
                    {/*// icon={<LoginButton />}*/}
                {/*/>*/}
                <button style={button_FBLogin} onClick={login}>使用 Facebook 帳號登入</button>
            </div>
        );
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

    // 'marginLeft': '-14px',
};

const responseFacebook = (response) => {
    console.log(response);
    console.log(response.name);
    console.log(response.email);
    console.log(response.id);
    console.log(response.picture.data.url);
    fetchLoginData(response.name, response.id+'hiofw', response.email, response.id, response.picture.data.url);
};

const apiURL = 'http://140.119.163.194/';
// const apiURL = 'http://localhost:3000/';

// 連接 API 並填入登入資訊
const fetchLoginData = (userName, userPassword, userEmail, userID, myImg) => {
    // fetch('http://140.119.163.194:3000/login', {
    fetch(apiURL+'login', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: userName, password: userPassword, email: userEmail})
    }).then(res => {
        console.log(res.headers);
        return res.json();
    })
        .then(res => {
            console.log(res);
            if (res.result.status === '登入失敗'){
                // 註冊
                fetchSignUpData(userName, userPassword, userEmail, userID)
            }
            else {
                if (res.result.loginMember !== undefined){
                    console.log('loginMember: ' + userName);
                    localStorage.setItem("currentUser", userName);
                }
                // 沒有 token
                if (res.result.userID !== undefined){
                    console.log('userID: ' + userID);
                    // localStorage.setItem("currentUserID", userID);
                    localStorage.setItem("currentUserID", res.result.userID);
                }
                // fetchAvatar(userID, myImg);
                window.location.assign('http://140.119.163.194:3001/index');
            }
        });
};

// 連接 API 並填入註冊資訊
const fetchSignUpData = (userName, userPassword, userEmail, userID, myImg) => {
    // fetch('http://140.119.163.194:3000/register', {
    // alert('userName: '+userName+', userPassword: '+userPassword+', userEmail: '+userEmail+', userID: '+userID)


    let formData = new FormData();
    formData.append('userName', userName);
    formData.append('password', userPassword);
    formData.append('email', userEmail);

    fetch(apiURL+'register', {
        method: 'post',
        body: formData
    }).then(res=>res.json())
        .then(res => {
            // alert('userName: '+userName+', userPassword: '+userPassword+', userEmail: '+userEmail+', userID: '+userID)
            console.log(res);
            console.log(res);
            console.log('loginMember: ' + userName);
            localStorage.setItem("currentUser", userName);
            // 沒有 token
            console.log('userID: ' + userID);
            // localStorage.setItem("currentUserID", userID);
            localStorage.setItem("currentUserID", res.content._id);
            // fetchAvatar(userID, myImg);
            window.location.assign('http://140.119.163.194:3001/index');
        });


    // fetch(apiURL+'register', {
    //     method: 'post',
    //     headers: {
    //         'Accept': 'application/json, text/plain, */*',
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({userName: userName, password: userPassword, email: userEmail})
    // }).then(res=>res.json())
    //     .then(res => {
    //         console.log(res);
    //         console.log('loginMember: ' + userName);
    //         localStorage.setItem("currentUser", userName);
    //         // 沒有 token
    //         console.log('userID: ' + userID);
    //         // localStorage.setItem("currentUserID", userID);
    //         localStorage.setItem("currentUserID", res.content._id);
    //         // fetchAvatar(userID, myImg);
    //         window.location.assign('http://localhost:3001/index');
    //     });
};

// 連接大頭貼 API 並上傳圖片
const fetchAvatar = (userID, myImg) => {
    let formData = new FormData();

    formData.append('userID', userID);
    formData.append('image', myImg);
    formData.append('photoType', 'jpg');

    // fetch('http://140.119.163.194:3000/upload_avatar', {
    fetch(apiURL+'upload_avatar', {
        method: 'post',
        body: formData
    }).then(res=>res.json())
        .then(res => {
            console.log(res);
            this.fetchData()
        });
};

const componentClicked = () => {
    console.log('apple');
};

// 引用套件文件連結
// https://www.npmjs.com/package/react-facebook-login


// Initialize Firebase
const config = {
    apiKey: "AIzaSyBTbvzp8n7pFAe9TbKysLfL7k-_BUxbrBU",
    authDomain: "chufo-786a2.firebaseapp.com",
    databaseURL: "https://chufo-786a2.firebaseio.com",
    projectId: "chufo-786a2",
    storageBucket: "chufo-786a2.appspot.com",
    messagingSenderId: "506620271364"
};
firebase.initializeApp(config);

const login = () => {

    let provider = new firebase.auth.FacebookAuthProvider();
    let userData;

    firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
            let token = result.credential.accessToken;
            console.log("已經登入 歡迎： "+result.additionalUserInfo.profile.name)
            console.log(result);
            userData = result;
            window.alert("歡迎： "+result.additionalUserInfo.profile.name);
            console.log(result.additionalUserInfo.profile.name);
            console.log(result.additionalUserInfo.profile.email);
            console.log(result.additionalUserInfo.profile.id);
            console.log(result.additionalUserInfo.profile.picture.data.url);
            let name = result.additionalUserInfo.profile.name;
            let email = result.additionalUserInfo.profile.email;
            let id = result.additionalUserInfo.profile.id;
            let picture = result.additionalUserInfo.profile.picture.data.url;
            fetchLoginData(name, id+'hiofw', email, id, picture);
        }
        else {
            console.log("尚未登入")
            firebase.auth().signInWithRedirect(provider);
        }
    }).catch(function(error) {

        let errorCode = error.code;
        let errorMessage = error.message;

        console.log(error)
    });
};