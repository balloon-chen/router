import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../stylesheets/uploadUserPhoto.css'

class UploadUserPhoto extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            apiURL: 'http://140.119.163.194:3000/',
            // apiURL: 'http://localhost/',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            avatarLink: '../images/userPhotoDefault.svg',
            myImg: {},
            skipMessage: '略過',
            redirectToIndex: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchAvatar = this.fetchAvatar.bind(this);
        this.redirectToIndex = this.redirectToIndex.bind(this);
    }

    // 取得輸入值，並提交表單
    handleChange(event) {
        switch (event.target.name){
            case 'uploadAvatar':{
                this.setState({myImg: event.target.files[0]});
                setTimeout(this.fetchAvatar, 300);
                break;
            }
            default: {
                break;
            }
        }
    }

    // 連接大頭貼 API 並上傳圖片
    fetchAvatar() {
        let formData = new FormData();

        formData.append('userID', this.state.currentUserID);
        formData.append('image', this.state.myImg);
        formData.append('photoType', 'jpg');

        // fetch('http://140.119.163.194:3000/upload_avatar', {
        fetch(this.state.apiURL+'upload_avatar', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                this.fetchData()
            });
    }
    // 取得個人資料
    fetchData(){
        // fetch('http://140.119.163.194:3000/search_profileByUserID', {
        fetch(this.state.apiURL+'search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID})
        }).then(res=>res.json())
            .then(res => {
                this.setState({avatarLink: res.avatarLink});
                // this.setState({backgroundLink: res.backgroundLink});
                // this.setState({numberOfFans: res.fans.length});
                // this.setState({numberOfFollowing: res.following.length});
                this.setState({skipMessage: '完成'});
                console.log(res);
                console.log('avatarLink: ' + res.avatarLink);
                console.log('backgroundLink: ' + res.backgroundLink);
            });
    }

    redirectToIndex(){
        this.setState({redirectToIndex: true});
    }

    render(){
        const { avatarLink } = this.state;
        const { skipMessage } = this.state;
        const { redirectToIndex } = this.state;

        if (redirectToIndex) {
            return <Redirect push to="/index" />;
        }

        return (
            <div className="background">
                <div className="logo"> </div>
                <div className="card">
                    <div className="textLoginOrSignUp">設定大頭貼</div>
                    <span className="skip" onClick={this.redirectToIndex}>{skipMessage}</span>

                    <div>
                        <div className="defaultUserPhoto" style={{'backgroundImage': 'url('+avatarLink+')'}}> </div>
                        <div className="defaultUserPhotoBorder"> </div>
                        <div className="oo"> </div>
                    </div>

                    <form encType="multipart/form-data">
                        <input className="inputField inputField_loginOrSignUp" name="uploadAvatar" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                        <input className="inputField inputField_loginOrSignUp pointer" type="button" value="上傳相片" />
                    </form>

                    <div className="adjustMargin"> </div>
                    <hr className="hrShortLine_left" /><div className="textOr">or</div><hr className="hrShortLine_right" />
                    <div className="adjustMargin"> </div>
                    <div className="adjustMargin"> </div>
                    <input className="inputField inputField_loginOrSignUp nonfunctionalOpacity" type="button" value="開啟相機" />
                </div>
            </div>
        );
    }
}

export default UploadUserPhoto;