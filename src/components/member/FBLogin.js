import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

class FBLogin extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    componentDidMount(){}

    render(){
        return (
            <div>
                <FacebookLogin
                    appId="1706999339350063"
                    fields="name, email, picture"
                    callback={responseFacebook}
                    render={renderProps => (
                        <button onClick={renderProps.onClick} style={button_FBLogin}>使用 Facebook 帳號登入</button>
                    )}
                    // onClick={componentClicked}
                    // autoLoad={true}
                    // cssClass=""
                    // icon={<LoginButton />}
                />
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

const apiURL = 'https://140.119.163.194/';
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
                window.location.assign('https://localhost:3001/index');
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
            window.location.assign('https://localhost:3001/index');
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