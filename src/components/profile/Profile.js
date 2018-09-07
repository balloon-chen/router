import React from 'react';
import Navigation from '../Navigation';
import '../../stylesheets/profile.css';
import Index from "../main/Index";

import menu from "../../images/menu.svg"
import tag from "../../images/tag.svg"
import palette from "../../images/palette.svg"
import exit from "../../images/exit.svg"
import iconSort01 from "../../images/iconSort01.svg"
import iconSort02 from "../../images/iconSort02.svg"
import iconSort03 from "../../images/iconSort03.svg"

class Profile extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            avatarLink: '',
            backgroundLink: '',
            myImg: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchAvatar = this.fetchAvatar.bind(this);
        this.fetchBackGroundPhoto = this.fetchBackGroundPhoto.bind(this);
        this.fetchData = this.fetchData.bind(this)
    }

    // 取得輸入值，並提交表單
    handleChange(event) {
        switch (event.target.name){
            case 'uploadAvatar':{
                this.setState({myImg: event.target.files[0]});
                setTimeout(this.fetchAvatar, 300);
                break;
            }
            case 'uploadBackGroundPhoto':{
                this.setState({myImg: event.target.files[0]});
                setTimeout(this.fetchBackGroundPhoto, 300);
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

        fetch('http://140.119.163.194:3000/upload_avatar', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                this.fetchData()
            });
    }
    // 連接封面照片 API 並上傳圖片
    fetchBackGroundPhoto() {
        let formData = new FormData();

        formData.append('userID', this.state.currentUserID);
        formData.append('image', this.state.myImg);
        formData.append('photoType', 'jpg');

        fetch('http://140.119.163.194:3000/upload_backGroundPhoto', {
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
        fetch('http://140.119.163.194:3000/search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID})
        }).then(res=>res.json())
            .then(res => {
                this.setState({avatarLink: res.avatarLink});
                this.setState({backgroundLink: res.backgroundLink});
                console.log(res);
                console.log('avatarLink: ' + res.avatarLink);
                console.log('backgroundLink: ' + res.backgroundLink);
            });
    }

    componentDidMount(){
        this.fetchData();
    }

    render(){
        const { currentUser } = this.state;
        const { avatarLink } = this.state;
        const { backgroundLink } = this.state;

        return (
            <div>
                <Navigation />
                <div className="coverPhoto" style={{'backgroundImage': 'url('+backgroundLink+')'}}>
                    <div className="frostedGlass"><img src={menu} className="navigationIcon"/><img src={tag} className="navigationIcon" /><span>個人頁面</span><img src={palette} className="navigationIcon" /><img src={exit} className="navigationIcon" /></div>
                    <label className="uploadUserCoverPhoto">編輯
                        <form encType="multipart/form-data">
                            <input className="invisible" name="uploadBackGroundPhoto" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                        </form>
                    </label>
                    <div className="userPhotoInProfile" style={{'backgroundImage': 'url('+avatarLink+')'}}>
                        <label className="uploadUserPhotoIcon">
                            <form encType="multipart/form-data">
                                <input className="invisible" name="uploadAvatar" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                            </form>
                        </label>
                    </div>
                    <div className="userPhotoInProfileBorder"></div>
                    <p className="userName">{currentUser}</p>
                    <div>
                        <table className="infoTable">
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="mottoTd">對於吃貨來說，吃與不吃和飽了沒飽是沒有關係的！</td>
                                </tr>
                                <tr>
                                    <td className="infoNumberTd">0</td>
                                    <td className="infoNumberTd">0</td>
                                    <td className="infoNumberTd">0</td>
                                </tr>
                                <tr>
                                    <td className="infoTextTd">貼文</td>
                                    <td className="infoTextTd">粉絲</td>
                                    <td className="infoTextTd">追蹤</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={"separationLine"}> </div>
                    <div className="iconSort"><img src={iconSort01} className="navigationIcon"/><img src={iconSort02} className="navigationIcon" /><img src={iconSort03} className="navigationIcon" /></div>
                </div>

                <hr className="hrLine" />
                <br/>
                {/*<Index*/}
                    {/*invisible = "invisible"*/}
                {/*/>*/}
            </div>
        )
    }
}

export default Profile;