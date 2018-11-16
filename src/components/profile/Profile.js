import React from 'react';
import Navigation from '../Navigation';
import '../../stylesheets/profile.css';
import Index from "../main/Index";
import { Redirect } from 'react-router-dom';

import menu from "../../images/menu.svg"
import tag from "../../images/tag.svg"
import palette from "../../images/palette.svg"
import exit from "../../images/exit.svg"
import iconSort01 from "../../images/iconSort01.svg"
import iconSort02 from "../../images/iconSort02.svg"
import iconSort03 from "../../images/iconSort03.svg"

import logo from '../../images/logo.svg';
import iconSearch from '../../images/iconSearch.svg';
import iconNotice from '../../images/iconNotice.svg';
import icon03 from '../../images/icon03.svg';
import icon04 from '../../images/icon04.svg';
import userPhotoDefault from '../../images/userPhotoDefault.svg';
import iconCross from "../../images/iconCross.png";
import SocialListCard from "./SocialListCard";

import iconAddFriend from "../../images/iconAddFriend.svg";
import iconWaitFriend from "../../images/iconWaitFriend.svg";
import iconCheckFriend from "../../images/iconCheckFriend.svg";
import iconFriend from "../../images/iconFriend.svg";
import iconAddFollow from "../../images/iconAddFollow.svg";
import iconFollow from "../../images/iconFollow.svg";


class Profile extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            // apiURL: 'http://140.119.163.194:3000/',
            apiURL: 'http://localhost:3000/',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            whichUserID: localStorage.getItem("whichUserID"),
            avatarLink: '',
            backgroundLink: '',
            myImg: {},
            squareDisplay: 'square01',
            followButtonInvisible: '',
            UnFollowButtonInvisible: '',
            currentUserAvatarLink: '',

            addFriendButtonInvisible: '',
            requestFriendByOthersButton: '',
            requestFriendByMyselfButton: '',
            unFriendButtonInvisible: '',

            socialBoardInvisible: 'invisible',
            fans: [],
            followings: [],
            friends: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.fetchAvatar = this.fetchAvatar.bind(this);
        this.fetchBackGroundPhoto = this.fetchBackGroundPhoto.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.redirectToIndex = this.redirectToIndex.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.setSquare01 = this.setSquare01.bind(this);
        this.setSquare02 = this.setSquare02.bind(this);
        this.follow = this.follow.bind(this);
        this.unFollow = this.unFollow.bind(this);
        this.friend = this.friend.bind(this);
        this.takeBackFriend = this.takeBackFriend.bind(this);
        this.replyFriend = this.replyFriend.bind(this);
        this.unFriend = this.unFriend.bind(this);
        this.toggleSocialBoardInvisible = this.toggleSocialBoardInvisible.bind(this);
    }

    redirectToProfile(){
        this.setState({whichUserID: null});
        this.fetchData(this.state.currentUserID);
        window.document.body.scrollTop = 0;
        window.document.documentElement.scrollTop = 0;
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

        // fetch('http://140.119.163.194:3000/upload_avatar', {
        fetch(this.state.apiURL+'upload_avatar', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                // this.fetchData()
                if (this.state.whichUserID === null){
                    this.fetchData(this.state.currentUserID);
                }
                else {
                    this.fetchData(this.state.whichUserID);
                }
                window.document.body.scrollTop = 0;
                window.document.documentElement.scrollTop = 0;
            });
    }
    // 連接封面照片 API 並上傳圖片
    fetchBackGroundPhoto() {
        let formData = new FormData();

        formData.append('userID', this.state.currentUserID);
        formData.append('image', this.state.myImg);
        formData.append('photoType', 'jpg');

        // fetch('http://140.119.163.194:3000/upload_backGroundPhoto', {
        fetch(this.state.apiURL+'upload_backGroundPhoto', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                // this.fetchData()
                if (this.state.whichUserID === null){
                    this.fetchData(this.state.currentUserID);
                }
                else {
                    this.fetchData(this.state.whichUserID);
                }
                window.document.body.scrollTop = 0;
                window.document.documentElement.scrollTop = 0;
            });
    }

    redirectToIndex(){
        this.setState({redirectToIndex: true});
    }

    // 取得個人資料
    fetchData(userID){
        // fetch('http://140.119.163.194:3000/search_profileByUserID', {
        fetch(this.state.apiURL+'search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: userID})
        }).then(res=>res.json())
            .then(res => {
                this.setState({avatarLink: res.avatarLink});
                this.setState({backgroundLink: res.backgroundLink});
                this.setState({currentUser: res.userName});
                this.setState({numberOfFans: res.totalOfFans});
                this.setState({numberOfFollowing: res.totalOfFollowings});
                this.setState({numberOfFriends: res.friends.length});
                this.setState({fans: res.fans});
                this.setState({followings: res.following});
                this.setState({friends: res.friends});
                // this.setState({numberOfFans: res.fans.length});
                // this.setState({numberOfFollowing: res.following.length});
                console.log('a:'+res);
                console.log('b:'+res.fans);
                console.log('c:'+'avatarLink: ' + res.avatarLink);
                console.log('d:'+'backgroundLink: ' + res.backgroundLink);
                // alert('1:'+this.state.currentUserID)
                // alert('2:'+userID)
                // alert('3:'+this.state.whichUserID)
                if (res.fans.filter( (fan) => fan===this.state.currentUserID ).length){
                    this.setState({followButtonInvisible: 'invisible'});
                    this.setState({unFollowButtonInvisible: ''});
                }
                else {
                    this.setState({followButtonInvisible: ''});
                    this.setState({unFollowButtonInvisible: 'invisible'});
                }
                // 他邀我
                if (res.requestByMyself.filter( (byMyself) => byMyself===this.state.currentUserID ).length){
                    this.setState({addFriendButtonInvisible: 'invisible'});
                    this.setState({requestFriendByOthersButton: 'invisible'});
                    this.setState({requestFriendByMyselfButton: ''});
                    this.setState({unFriendButtonInvisible: 'invisible'});
                }
                // 他被我邀
                else if (res.requestByOthers.filter( (byOthers) => byOthers===this.state.currentUserID ).length){
                    this.setState({addFriendButtonInvisible: 'invisible'});
                    this.setState({requestFriendByOthersButton: ''});
                    this.setState({requestFriendByMyselfButton: 'invisible'});
                    this.setState({unFriendButtonInvisible: 'invisible'});
                }
                // 好友
                else if (res.friends.filter( (friend) => friend===this.state.currentUserID ).length){
                    this.setState({addFriendButtonInvisible: 'invisible'});
                    this.setState({requestFriendByOthersButton: 'invisible'});
                    this.setState({requestFriendByMyselfButton: 'invisible'});
                    this.setState({unFriendButtonInvisible: ''});
                }
                else {
                    this.setState({addFriendButtonInvisible: ''});
                    this.setState({requestFriendByOthersButton: 'invisible'});
                    this.setState({requestFriendByMyselfButton: 'invisible'});
                    this.setState({unFriendButtonInvisible: 'invisible'});
                }


            });
        // 取得個人大頭照
        fetch(this.state.apiURL+'search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID})
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                this.setState({currentUserAvatarLink: res.avatarLink});
            });
    }

    setSquare01(){
        this.setState({squareDisplay: 'square01'});
    }
    setSquare02(){
        this.setState({squareDisplay: 'square02'});
    }

    friend() {
        this.setState({addFriendButtonInvisible: 'invisible'});
        this.setState({requestFriendByOthersButton: ''});
        this.setState({requestFriendByMyselfButton: 'invisible'});
        this.setState({unFriendButtonInvisible: 'invisible'});
        fetch(this.state.apiURL+'friends_request', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID_request: this.state.currentUserID,
                userID_requested: this.state.whichUserID})
        }).then(res=>res.json())
            .then(res => {
                    console.log(res);
                    // this.setState({numberOfFans: this.state.numberOfFans+1});
                }
            );
    }
    takeBackFriend(){
        this.setState({addFriendButtonInvisible: ''});
        this.setState({requestFriendByOthersButton: 'invisible'});
        this.setState({requestFriendByMyselfButton: 'invisible'});
        this.setState({unFriendButtonInvisible: 'invisible'});
    }
    replyFriend(){
        this.setState({addFriendButtonInvisible: 'invisible'});
        this.setState({requestFriendByOthersButton: 'invisible'});
        this.setState({requestFriendByMyselfButton: 'invisible'});
        this.setState({unFriendButtonInvisible: ''});
        this.setState({numberOfFriends: this.state.numberOfFriends + 1});
        this.setState({numberOfFans: this.state.numberOfFans + 1});
        this.setState({numberOfFollowing: this.state.numberOfFollowing + 1});
        fetch(this.state.apiURL+'friends_requestWaitingForAdded', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID_adder: this.state.currentUserID,
                userID_added: this.state.whichUserID})
        }).then(res=>res.json())
            .then(res => {
                    console.log(res);
                    // this.setState({numberOfFans: this.state.numberOfFans+1});
                }
            );
    }
    unFriend(){
        this.setState({addFriendButtonInvisible: ''});
        this.setState({requestFriendByOthersButton: 'invisible'});
        this.setState({requestFriendByMyselfButton: 'invisible'});
        this.setState({unFriendButtonInvisible: 'invisible'});
        this.setState({numberOfFriends: this.state.numberOfFriends - 1});
    }
    follow() {
        this.setState({numberOfFans: this.state.numberOfFans+1});
        this.setState({followButtonInvisible: 'invisible'});
        this.setState({unFollowButtonInvisible: ''});
        fetch(this.state.apiURL+'friends_add', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID,
                                  userID_add: this.state.whichUserID})
        }).then(res=>res.json())
            .then(res => {
                    console.log(res);
                   // this.setState({numberOfFans: this.state.numberOfFans+1});
                }
            );
    }
    unFollow() {
        this.setState({numberOfFans: this.state.numberOfFans-1});
        this.setState({followButtonInvisible: ''});
        this.setState({unFollowButtonInvisible: 'invisible'});
        fetch(this.state.apiURL+'friends_unfollowing', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID_following: this.state.currentUserID,
                userID_followed: this.state.whichUserID})
        }).then(res=>res.json())
            .then(res => console.log(res));
    }

    toggleSocialBoardInvisible(){
        if (this.state.socialBoardInvisible === 'invisible')
            this.setState({socialBoardInvisible: ''});
        else
            this.setState({socialBoardInvisible: 'invisible'});
    }

    componentDidMount(){
        if (this.state.whichUserID === null){
            this.fetchData(this.state.currentUserID);
        }
        else {
            this.fetchData(this.state.whichUserID);
        }
        // this.fetchData();
        window.document.body.scrollTop = 0;
        window.document.documentElement.scrollTop = 0;
    }

    render(){
        const { currentUser } = this.state;
        const { currentUserID } = this.state;
        const { whichUserID } = this.state;
        const { avatarLink } = this.state;
        const { backgroundLink } = this.state;
        const { numberOfFans } = this.state;
        const { numberOfFollowing } = this.state;
        const { numberOfPersonalArticles } = this.props;
        const { redirectToIndex } = this.state;
        const { squareDisplay } = this.state;
        const { followButtonInvisible } = this.state;
        const { unFollowButtonInvisible } = this.state;
        const { currentUserAvatarLink } = this.state;
        // alert(this.state.whichUserID)
        // alert(this.state.currentUserID)
        const checkUser = (this.state.whichUserID === null || this.state.whichUserID === this.state.currentUserID) ? 'invisible' : '';
        const checkUserForUpdatePhotos = (this.state.whichUserID === null || this.state.whichUserID === this.state.currentUserID) ? '' : 'invisible';

        if (redirectToIndex) {
            return <Redirect push to="/index" />;
        }

        const { addFriendButtonInvisible } = this.state;
        const { requestFriendByOthersButton } = this.state;
        const { requestFriendByMyselfButton } = this.state;
        const { unFriendButtonInvisible } = this.state;
        const { numberOfFriends } = this.state;
        const { socialBoardInvisible } = this.state;

        const { fans } = this.state;
        const { followings } = this.state;
        const { friends } = this.state;

        const socialListCardsElements = fans.map((element) =>
            (<div key={element}>
                <SocialListCard
                    element = {element}
                />
            </div>)
        );

        return (
            <div>
                {/*<Navigation />*/}
                <div className="coverPhoto" style={{'backgroundImage': 'url('+backgroundLink+')'}}>
                    {/*<div className="frostedGlass"><img src={menu} className="navigationIcon"/><img src={tag} className="navigationIcon" /><span>個人頁面</span><img src={palette} className="navigationIcon" /><img src={exit} className="navigationIcon" /></div>*/}
                    <div className="frostedGlass ddd"><img src={logo} className="navigationIcon xxx" onClick={this.redirectToIndex} /><img src={iconSearch} className="navigationIcon" /><img src={iconNotice} className="navigationIcon" /><img src={icon03} className="navigationIcon" /><img src={icon04} className="navigationIcon" /><img src={currentUserAvatarLink} className="navigationIcon ooo" onClick={this.redirectToProfile} /></div>
                    <label className={"uploadUserCoverPhoto "+checkUserForUpdatePhotos}>編輯封面
                        <form encType="multipart/form-data">
                            <input className="invisible" name="uploadBackGroundPhoto" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                        </form>
                    </label>
                    <div className="userPhotoInProfile" style={{'backgroundImage': 'url('+avatarLink+')'}}> </div>
                    <div className="userPhotoInProfileBorder"> </div>
                    {/*<label className="uploadUserPhotoIcon">*/}
                    <label className={"uploadUserCoverPhoto uploadUserCoverPhotooo "+checkUserForUpdatePhotos}>編輯大頭
                        <form encType="multipart/form-data">
                            <input className="invisible" name="uploadAvatar" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                        </form>
                    </label>





                    <div className={'flex justify-content'}>
                        <div className={addFriendButtonInvisible+' '+checkUser+' profile_friendAndFollowButton addFriendButton'} onClick={this.friend}>
                            <img src={iconAddFriend} alt="iconAddFriend" className='iconFriendsAndFollows' />
                            <span>加好友</span>
                        </div>
                        <div className={requestFriendByOthersButton+' '+checkUser+' profile_friendAndFollowButton requestFriendByOthersButton'} onClick={this.takeBackFriend}>
                            <img src={iconWaitFriend} alt="iconWaitFriend" className='iconFriendsAndFollows' />
                            <span>已邀請</span>
                        </div>
                        <div className={requestFriendByMyselfButton+' '+checkUser+' profile_friendAndFollowButton requestFriendByMyselfButton'} onClick={this.replyFriend}>
                            <img src={iconCheckFriend} alt="iconCheckFriend" className='iconFriendsAndFollows' />
                            <span>確認邀請</span>
                        </div>
                        <div className={unFriendButtonInvisible+' '+checkUser+' profile_friendAndFollowButton unFriendButton'} onClick={this.unFriend}>
                            <img src={iconFriend} alt="iconFriend" className='iconFriendsAndFollows' />
                            <span>好友</span>
                        </div>

                        <div className={followButtonInvisible+' '+checkUser+' profile_friendAndFollowButton followButton'} onClick={this.follow}>
                            <img src={iconAddFollow} alt="iconAddFollow" className='iconFriendsAndFollows' />
                            <span>追蹤</span>
                        </div>
                        <div className={unFollowButtonInvisible+' '+checkUser+' profile_friendAndFollowButton unFollowButton'} onClick={this.unFollow}>
                            <img src={iconFollow} alt="iconFollow" className='iconFriendsAndFollows' />
                            <span>追蹤中</span>
                        </div>
                    </div>
                    <p className="userName">{currentUser}</p>



                    <div>
                        <table className="infoTable">
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="mottoTd">對於吃貨來說，吃與不吃和飽了沒飽是沒有關係的！</td>
                                </tr>
                                <tr>
                                    <td className="infoNumberTd" onClick={this.toggleSocialBoardInvisible}>{numberOfFriends}</td>
                                    <td className="infoNumberTd">{numberOfFans}</td>
                                    <td className="infoNumberTd">{numberOfFollowing}</td>
                                </tr>
                                <tr>
                                    <td className="infoTextTd" onClick={this.toggleSocialBoardInvisible}>好友</td>
                                    <td className="infoTextTd">粉絲</td>
                                    <td className="infoTextTd">追蹤</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={"articleWhoLikesBackground"+socialBoardInvisible} onClick={this.toggleSocialBoardInvisible}> </div>
                        <div className={"socialListCard "+socialBoardInvisible}>
                            <div className="flex justify-content">
                                {/*<img src={iconLike} className="navigationIcon" alt="iconLike"/>*/}
                                <span>喜歡</span>
                                <img src={iconCross} className="navigationIcon position-right" alt="iconCross" onClick={this.toggleSocialBoardInvisible}/>
                            </div>
                            {/*<span>{socialListCardsElements}</span>*/}
                        </div>

                    </div>
                    <div className="separationLine"> </div>
                    <div className="iconSort"><img src={iconSort01} className="navigationIcon" onClick={this.setSquare01}/><img src={iconSort02} className="navigationIcon" onClick={this.setSquare02} /><img src={iconSort03} className="navigationIcon" /></div>
                </div>

                <hr className="hrLine" />

                <div className={squareDisplay}>1</div>
                <div className={squareDisplay}>2</div>
                <div className={squareDisplay}>3</div>
                <div className={squareDisplay}>4</div>
                <div className={squareDisplay}>5</div>
                <div className={squareDisplay}>6</div>
                <div className={squareDisplay}>7</div>
                <div className={squareDisplay}>8</div>
                <div className={squareDisplay}>9</div>

                {/*<Index*/}
                    {/*invisible = "invisible"*/}
                {/*/>*/}
            </div>
        )
    }
}

export default Profile;