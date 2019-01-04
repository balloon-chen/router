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

import ArticleItem from '../main/ArticleItem';
import ArticleSwipeItem from '../main/ArticleSwipeItem';

import loadingGif from "../../images/loadingGif.gif";
// 資源：https://kyleamathews.github.io/react-spinkit/
import Spinner from 'react-spinkit';

import iconMenuWhite from "../../images/iconMenuWhite.svg";
import iconTagWhite from "../../images/iconTagWhite.svg";
import editProfileButton from "../../images/editProfileButton.svg";
import uploadUserPhotoButton from "../../images/uploadUserPhotoButton.svg";
import paletteIcon from "../../images/paletteIcon.svg";

import Notification from "../notification/Notification";

class Profile extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            apiURL: 'http://140.119.163.194:3004/',
            // apiURL: 'http://localhost/',
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

            fansSocialBoardInvisible: 'invisible',
            followingsSocialBoardInvisible: 'invisible',
            friendsSocialBoardInvisible: 'invisible',
            fans: [],
            followings: [],
            friends: [],

            articles: [],

            loadingGifInvisible: '',
            scrollY: '',
            innerHeight: '',
            scrollHeight: '',
            count: 1,

            redirectToSignUpLoginTemplate: false,

            userName: '',
            aboutMe: '',
            aboutMeStatic: '',
            profileEditingOpacityZero: 'opacity-zero',
            nonProfileEditingOpacityZero: '',
            profileEditingInvisible: 'invisible',
            nonProfileEditingInvisible: '',

            editable: false,

            articleInvisible: '',
            notificationInvisible: 'invisible'
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
        this.toggleFansSocialBoardInvisible = this.toggleFansSocialBoardInvisible.bind(this);
        this.toggleFollowingsSocialBoardInvisible = this.toggleFollowingsSocialBoardInvisible.bind(this);
        this.toggleFriendsSocialBoardInvisible = this.toggleFriendsSocialBoardInvisible.bind(this);

        this.handleScroll = this.handleScroll.bind(this);


        this.fetchArticleData = this.fetchArticleData.bind(this);
        this.refetch = this.refetch.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.articleLike = this.articleLike.bind(this);
        this.commentLike = this.commentLike.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.addComment = this.addComment.bind(this);

        this.profile_setting = this.profile_setting.bind(this);
        this.start_profile_setting = this.start_profile_setting.bind(this);
        this.end_profile_setting = this.end_profile_setting.bind(this);

        this.toggleRenderMode = this.toggleRenderMode.bind(this);
        this.toggleNoticeInvisible = this.toggleNoticeInvisible.bind(this);
    }

    toggleRenderMode(){
        this.setState({ editable: !this.state.editable });
    }

    profile_setting(event) {
        switch (event.target.name){
            case 'userName':{
                this.setState({userName: event.target.value});
                break;
            }
            case 'aboutMe':{
                this.setState({aboutMe: event.target.value});
                break;
            }
            default: {
                break;
            }
        }
    }
    start_profile_setting(){
        this.setState({profileEditingOpacityZero: ''});
        this.setState({nonProfileEditingOpacityZero: 'opacity-zero'});
        this.setState({profileEditingInvisible: ''});
        this.setState({nonProfileEditingInvisible: 'invisible'});
    }
    end_profile_setting(){
        const { userName } = this.state;
        const { aboutMe } = this.state;
        // this.setState({profileEditingOpacityZero: 'opacity-zero'});
        // this.setState({nonProfileEditingOpacityZero: ''});
        // this.setState({profileEditingInvisible: 'invisible'});
        // this.setState({nonProfileEditingInvisible: ''});
        fetch(this.state.apiURL + 'profile_setting', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID, userName: userName, aboutMe: aboutMe, colorOfTheme: 'default'})
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.fetchData(this.state.currentUserID);
                this.toggleRenderMode();
            });
    }

    fetchArticleData(){
        this.setState({count: 1});
        // 二維結構的文章
        fetch(this.state.apiURL+'search_articleByCategoryAndTheSameAuthor', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({count: this.state.count, userID: this.state.currentUserID})
        }).then(res => {
            console.log(res.headers);
            return res.json();
        })
            .then(parsedJSON => {
                this.setState({articles: parsedJSON});
                console.log(parsedJSON);
            });
    }
    // 重新抓資料並重新渲染畫面
    refetch() {
        setTimeout(this.fetchArticleData, 700);
        // 1
    }
    // 更新文章
    updateArticle(articleID, newContent) {
        let formData = new FormData();
        formData.append('articleID', articleID);
        formData.append('content', newContent);

        // fetch('http://140.119.163.194:3000/update_article', {
        fetch(this.state.apiURL + 'update_article', {
            method: 'put',
            body: formData
        }).then(res => res.json())
            .then(res => {
                console.log(res)
            });
        // 🦄️
        // setTimeout(this.xxx, 5000);
    }
    // 刪除文章
    deleteArticle(articleID) {
        // fetch('http://140.119.163.194:3000/delete_article', {
        fetch(this.state.apiURL + 'delete_article', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({articleID: articleID})
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.fetchArticleData();
            });
        // setTimeout(this.fetchData, 500);
        // 2
    }
    // 文章按愛心或收回愛心
    articleLike(articleID, likeOrDislike) {
        // alert('articleID: '+articleID+'\nlikesPersonID: '+this.state.currentUser);
        if (likeOrDislike == false) {
            // fetch('http://140.119.163.194:3000/likes_article', {
            fetch(this.state.apiURL + 'likes_article', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    articleID: articleID,
                    likesPersonID: this.state.currentUserID
                })
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    // this.fetchData();
                });
            // setTimeout(this.fetchData, 500);
        }
        else {
            // fetch('http://140.119.163.194:3000/dislikes_article', {
            fetch(this.state.apiURL + 'dislikes_article', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    articleID: articleID,
                    dislikesPersonID: this.state.currentUserID
                })
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    // this.fetchData();
                });
            // setTimeout(this.fetchData, 500);
        }
    }
    // 留言按愛心或收回愛心
    commentLike(commentID, articleID, likeOrDislike) {
        if (likeOrDislike == false) {
            // alert(commentID+' '+articleID+' '+likeOrDislike)
            // fetch('http://140.119.163.194:3000/likes_comment', {
            fetch(this.state.apiURL + 'likes_comment', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    articleID: articleID,
                    commentID: commentID,
                    likesPersonID: this.state.currentUserID
                })
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    // this.fetchData();
                });
            // setTimeout(this.fetchData, 500);
        }
        else {
            // alert(commentID+' '+articleID+' '+likeOrDislike)
            // fetch('http://140.119.163.194:3000/dislikes_comment', {
            fetch(this.state.apiURL + 'dislikes_comment', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    articleID: articleID,
                    commentID: commentID,
                    dislikesPersonID: this.state.currentUserID
                })
            }).then(res => res.json())
                .then(res => {
                    console.log(res);
                    // this.fetchData();
                });
            // setTimeout(this.fetchData, 500);
        }
    }
    // 刪除留言
    deleteComment(commentID, articleID) {
        // fetch('http://140.119.163.194:3000/delete_comment', {
        // alert('commentID: '+commentID+', articleID: '+articleID)
        fetch(this.state.apiURL + 'delete_comment', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({articleID: articleID, commentID: commentID})
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.fetchArticleData();
            });
        // setTimeout(this.fetchData, 700);
        // alert('articleID: '+articleID+'\ncommentID: '+commentID)
        // 3
    }
    // 更新留言
    updateComment(commentID, articleID, newComment) {
        let formData = new FormData();
        formData.append('commentID', commentID);
        formData.append('articleID', articleID);
        formData.append('content', newComment);

        //🦄️ url 無法用變數取代
        // fetch('http://140.119.163.194:3000/update_comment', {
        fetch('http://140.119.163.194:3004/update_comment', {
            // fetch(this.state.apiURL+'update_comment', {
            method: 'put',
            body: formData
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                console.log('FUck')
                // this.xxx();
            });
        // 🦄️
        // setTimeout(this.fetchData, 700);
    }
    // 新增留言
    addComment(currentUserID, content, articleID, currentUser) {
        // alert(content + ' ' + articleID + ' ' + currentUser);
        let formData = new FormData();

        formData.append('commenterName', currentUser);
        formData.append('commenterID', currentUserID);
        formData.append('articleID', articleID);
        formData.append('content', content);

        //🦄️ url 無法用變數取代
        // fetch('http://140.119.163.194:3000/add_comment', {
        fetch('http://140.119.163.194:3004/add_comment', {
            // fetch('http://192.168.1.32:3000/add_comment', {
            // fetch(this.state.apiURL+'add_comment', {
            method: 'post',
            body: formData
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                // this.xxx();
            });
        // 🦄️
        // setTimeout(this.fetchData, 700);
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
                this.setState({avatarLink: res.avatarLink[res.avatarLink.length-1]});
                this.setState({backgroundLink: res.backgroundLink[res.backgroundLink.length-1]});
                this.setState({currentUser: res.userName});
                this.setState({numberOfFans: res.totalOfFans});
                this.setState({numberOfFollowing: res.totalOfFollowings});
                this.setState({numberOfFriends: res.friends.length});
                this.setState({fans: res.fans});
                this.setState({followings: res.following});
                this.setState({friends: res.friends});
                this.setState({userName: res.userName});
                this.setState({aboutMe: res.aboutMe});
                this.setState({aboutMeStatic: res.aboutMe});
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
                this.setState({loadingGifInvisible: 'invisible'});

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
                this.setState({currentUserAvatarLink: res.avatarLink[res.avatarLink.length-1]});
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
        this.setState({numberOfFans: this.state.numberOfFans - 1});
        this.setState({numberOfFollowing: this.state.numberOfFollowing - 1});
        // alert(this.state.currentUserID)
        // alert(this.state.whichUserID)
        fetch(this.state.apiURL+'friends_unadded', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID,
                userID_unadded: this.state.whichUserID})
        }).then(res=>res.json())
            .then(res => {
                    console.log(res);
                    // this.setState({numberOfFans: this.state.numberOfFans+1});
                }
            );
    }
    follow() {
        this.setState({numberOfFans: this.state.numberOfFans+1});
        this.setState({followButtonInvisible: 'invisible'});
        this.setState({unFollowButtonInvisible: ''});
        fetch(this.state.apiURL+'friends_following', {
        // fetch('http://localhost:3000/friends_following', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID_following: this.state.currentUserID,
                                  userID_followed: this.state.whichUserID})
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

    toggleFansSocialBoardInvisible(){
        if (this.state.fansSocialBoardInvisible === 'invisible'){
            this.setState({fansSocialBoardInvisible: ''});
            this.setState({followingsSocialBoardInvisible: 'invisible'});
            this.setState({friendsSocialBoardInvisible: 'invisible'});
        }
        else
            this.setState({fansSocialBoardInvisible: 'invisible'});
    }
    toggleFollowingsSocialBoardInvisible(){
        if (this.state.followingsSocialBoardInvisible === 'invisible'){
            this.setState({followingsSocialBoardInvisible: ''});
            this.setState({fansSocialBoardInvisible: 'invisible'});
            this.setState({friendsSocialBoardInvisible: 'invisible'});
        }
        else
            this.setState({followingsSocialBoardInvisible: 'invisible'});
    }
    toggleFriendsSocialBoardInvisible(){
        if (this.state.friendsSocialBoardInvisible === 'invisible'){
            this.setState({friendsSocialBoardInvisible: ''});
            this.setState({fansSocialBoardInvisible: 'invisible'});
            this.setState({followingsSocialBoardInvisible: 'invisible'});
        }
        else
            this.setState({friendsSocialBoardInvisible: 'invisible'});
    }

    componentDidMount(){
        this.setState({redirectToSignUpLoginTemplate: (localStorage.getItem("currentUser") === null || localStorage.getItem("currentUser") === undefined)});
        if (!(localStorage.getItem("currentUser") === null || localStorage.getItem("currentUser") === undefined)){
            if (this.state.whichUserID === null){
                this.fetchData(this.state.currentUserID);
            }
            else {
                this.fetchData(this.state.whichUserID);
            }
        }
        // this.fetchData();
        window.document.body.scrollTop = 0;
        window.document.documentElement.scrollTop = 0;


        // // 搜尋文章
        // fetch(this.state.apiURL+'search_article')
        //     .then(response => response.json())
        //     .then(parsedJSON => {
        //         this.setState({articles: parsedJSON});
        //         // this.setState({articles: this.state.articlesTempTest});
        //     })
        //     .catch(err => console.log(err));
        // 二維結構的文章
        fetch(this.state.apiURL+'search_articleByCategoryAndTheSameAuthor', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({count: this.state.count, userID: this.state.currentUserID})
        }).then(res => {
            console.log(res.headers);
            return res.json();
        })
            .then(parsedJSON => {
                this.setState({articles: this.state.articles.concat(parsedJSON)});
                console.log(parsedJSON);
            });
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    // 參考連結
    // https://stackoverflow.com/questions/29725828/update-style-of-a-component-onscroll-in-react-js?fbclid=IwAR0UIyP6pWWWiNgZvr7bKSNGKXvr23lidLcJ1VMv80UOcU6FRowjrx2AcAY
    handleScroll() {
        this.setState({scrollY: window.scrollY});
        this.setState({innerHeight: window.innerHeight});
        this.setState({scrollHeight: document.documentElement.scrollHeight});
        let scrollY = this.state.scrollY;
        let innerHeight = this.state.innerHeight;
        let scrollHeight = this.state.scrollHeight;
        console.log(scrollY);
        console.log(innerHeight);
        console.log(scrollHeight);
        if (scrollY >= (scrollHeight*0.7-innerHeight) ){
            this.setState({count: this.state.count+1});
            this.setState({scrollHeight: document.documentElement.scrollHeight});
            // 二維結構的文章
            fetch(this.state.apiURL+'search_articleByCategoryAndTheSameAuthor', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({count: this.state.count, userID: this.state.currentUserID})
            }).then(res => {
                console.log(res.headers);
                return res.json();
            })
                .then(parsedJSON => {
                    if (parsedJSON === undefined)
                        window.removeEventListener('scroll', this.handleScroll);
                    this.setState({articles: this.state.articles.concat(parsedJSON)});
                    console.log(parsedJSON);
                });
        }
    }

    toggleNoticeInvisible(){
        const { notificationInvisible } = this.state;
        if (notificationInvisible === 'invisible'){
            this.setState({articleInvisible: 'invisible'});
            this.setState({notificationInvisible: ''});
        }
        else {
            this.setState({articleInvisible: ''});
            this.setState({notificationInvisible: 'invisible'});
        }
    }

    renderViewMode(){
        const { redirectToSignUpLoginTemplate } = this.state;
        if (redirectToSignUpLoginTemplate)
            return <Redirect push to="/" />;

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
        const { fansSocialBoardInvisible } = this.state;
        const { friendsSocialBoardInvisible } = this.state;
        const { followingsSocialBoardInvisible } = this.state;

        const { fans } = this.state;
        const { followings } = this.state;
        const { friends } = this.state;

        const fansSocialListCardsElements = fans.map((element) =>
            (<div key={element}>
                <SocialListCard
                    element = {element}
                />
            </div>)
        );
        const followingsSocialListCardsElements = followings.map((element) =>
            (<div key={element}>
                <SocialListCard
                    element = {element}
                />
            </div>)
        );
        const friendsSocialListCardsElements = friends.map((element) =>
            (<div key={element}>
                <SocialListCard
                    element = {element}
                />
            </div>)
        );

        const { articles } = this.state;
        // const articleElements = articles.map((article) =>
        //     (<div key = {article._id}>
        //         <ArticleItem
        //             author = { article.author }
        //             title = {article.title}
        //             content = {article.listOfContent[article.listOfContent.length-1].content}
        //             category = {article.category}
        //             articleID = {article._id}
        //             numberOfLikes = {article.likes.length}
        //             likeOrDislike={ article.likes.filter( (like) => like==this.state.currentUser ).length }
        //             whoLikes = { article.likes }
        //             comments = { article.comment }
        //             checkUser = { article.author!=this.state.currentUser ? ' invisible' : '' }
        //             avatarLink = { article.avatarLink }
        //             authorID = { article.authorID }
        //
        //             refetch = {this.refetch}
        //
        //             onUpdateArticle = {this.updateArticle}
        //             onDeleteArticle = {this.deleteArticle}
        //             handleLike = {this.articleLike}
        //             handleCommentLike = {this.commentLike}
        //             deleteComment = {this.deleteComment}
        //             updateComment = {this.updateComment}
        //             addComment = {this.addComment}
        //
        //             currentUserAvatarLink = {currentUserAvatarLink}
        //
        //             articlesInProfile = {true}
        //         />
        //     </div>)
        // );
        const articleElements = articles.map((articleGroup) =>
            (<div key = {articleGroup.centerArticle._id}>
                <ArticleSwipeItem
                    articleGroup = {articleGroup}
                    currentUserAvatarLink = {currentUserAvatarLink}
                    articlesInProfile = {true}
                    refetch = {this.refetch}
                    onUpdateArticle = {this.updateArticle}
                    onDeleteArticle = {this.deleteArticle}
                    handleLike = {this.articleLike}
                    handleCommentLike = {this.commentLike}
                    deleteComment = {this.deleteComment}
                    updateComment = {this.updateComment}
                    addComment={this.addComment}
                />
            </div>)
        );

        const { userName } = this.state;
        const { aboutMe } = this.state;
        const { aboutMeStatic } = this.state;
        const { profileEditingOpacityZero } = this.state;
        const { nonProfileEditingOpacityZero } = this.state;
        const { profileEditingInvisible } = this.state;
        const { nonProfileEditingInvisible } = this.state;

        const { articleInvisible } = this.state;
        const { notificationInvisible } = this.state;

        return (
            <div>
                {/*<button style={{height:'100px'}} onClick={this.profile_setting}>按我</button>*/}
                {/*<img src={loadingGif} alt="loadingGif" className={'loadingGif '+this.state.loadingGifInvisible}/>*/}
                {/*<div className={'loadingGif '+this.state.loadingGifInvisible}> </div>*/}
                <div className={'loadingGif2 ' + this.state.loadingGifInvisible}><Spinner name='ball-spin-fade-loader' /></div>
                <div className='flex justify-content-space-between profileButtonPosition'>
                    <img src={iconTagWhite} className='navigationIcon opacity-zero' />
                    <img src={iconMenuWhite} className='navigationIcon' />
                </div>
                <div className="coverPhoto" style={{'backgroundImage': 'url('+backgroundLink+')'}}>
                    {/*<div className="frostedGlass"><img src={menu} className="navigationIcon"/><img src={tag} className="navigationIcon" /><span>個人頁面</span><img src={palette} className="navigationIcon" /><img src={exit} className="navigationIcon" /></div>*/}
                    <div className="frostedGlass ddd">
                        <img src={logo} className="navigationIcon xxx" onClick={this.redirectToIndex} />
                        <img src={iconSearch} className="navigationIcon nonfunctionalOpacity" />
                        <img src={iconNotice} className="navigationIcon" onClick={this.toggleNoticeInvisible} />
                        <img src={icon03} className="navigationIcon nonfunctionalOpacity" />
                        <img src={icon04} className="navigationIcon nonfunctionalOpacity" />
                        <img src={currentUserAvatarLink} className="navigationIcon ooo" onClick={this.redirectToProfile} />
                    </div>

                    <div className={notificationInvisible}>
                        <Notification />
                    </div>

                    <div className="userPhotoInProfile" style={{'backgroundImage': 'url('+avatarLink+')'}}>
                        <img src={editProfileButton} className='navigationIcon editProfileButtonPosition' onClick={this.toggleRenderMode} />
                    </div>
                    <div className="userPhotoInProfileBorder"> </div>

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
                    <div>
                        <p className="userName">{currentUser}</p>
                    </div>



                    <div>
                        <table className="infoTable">
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="mottoTd">
                                        <div className="mottoDiv">{aboutMeStatic}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="infoNumberTd" onClick={this.toggleFriendsSocialBoardInvisible}>{numberOfFriends}</td>
                                    <td className="infoNumberTd" onClick={this.toggleFansSocialBoardInvisible}>{numberOfFans}</td>
                                    <td className="infoNumberTd" onClick={this.toggleFollowingsSocialBoardInvisible}>{numberOfFollowing}</td>
                                </tr>
                                <tr>
                                    <td className="infoTextTd" onClick={this.toggleFriendsSocialBoardInvisible}>好友</td>
                                    <td className="infoTextTd" onClick={this.toggleFansSocialBoardInvisible}>粉絲</td>
                                    <td className="infoTextTd" onClick={this.toggleFollowingsSocialBoardInvisible}>追蹤</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={"articleWhoLikesBackground"+friendsSocialBoardInvisible} onClick={this.toggleFriendsSocialBoardInvisible}> </div>
                        <div className={"socialListCard "+friendsSocialBoardInvisible}>
                            <div className="flex justify-content">
                                <span>好友</span>
                                <img src={iconCross} className="navigationIcon position-right" alt="iconCross" onClick={this.toggleFriendsSocialBoardInvisible}/>
                            </div>
                            <span>{friendsSocialListCardsElements}</span>
                        </div>
                        <div className={"articleWhoLikesBackground"+fansSocialBoardInvisible} onClick={this.toggleFansSocialBoardInvisible}> </div>
                        <div className={"socialListCard "+fansSocialBoardInvisible}>
                            <div className="flex justify-content">
                                <span>粉絲</span>
                                <img src={iconCross} className="navigationIcon position-right" alt="iconCross" onClick={this.toggleFansSocialBoardInvisible}/>
                            </div>
                            <span>{fansSocialListCardsElements}</span>
                        </div>
                        <div className={"articleWhoLikesBackground"+followingsSocialBoardInvisible} onClick={this.toggleFollowingsSocialBoardInvisible}> </div>
                        <div className={"socialListCard "+followingsSocialBoardInvisible}>
                            <div className="flex justify-content">
                                <span>追蹤</span>
                                <img src={iconCross} className="navigationIcon position-right" alt="iconCross" onClick={this.toggleFollowingsSocialBoardInvisible}/>
                            </div>
                            <span>{followingsSocialListCardsElements}</span>
                        </div>

                    </div>
                    <div className="separationLine"> </div>
                    <div className="iconSort">
                        <img src={iconSort01} className="navigationIcon" onClick={this.setSquare01}/>
                        <img src={iconSort02} className="navigationIcon nonfunctionalOpacity" onClick={this.setSquare02} />
                        <img src={iconSort03} className="navigationIcon nonfunctionalOpacity" />
                    </div>
                </div>

                <div className='profileArticleSortBox'>
                    <div className='flex justify-content-space-between profileArticleSort'>
                        <div>全部</div>
                        <div>貼文</div>
                        <div>相片/影片</div>
                        <div>被標記</div>
                        <div>收藏</div>
                    </div>
                </div>
                <hr className="hrLine" />

                <div className={articleInvisible}>{articleElements}</div>

                {/*<div className={squareDisplay}>1</div>*/}
                {/*<div className={squareDisplay}>2</div>*/}
                {/*<div className={squareDisplay}>3</div>*/}
                {/*<div className={squareDisplay}>4</div>*/}
                {/*<div className={squareDisplay}>5</div>*/}
                {/*<div className={squareDisplay}>6</div>*/}
                {/*<div className={squareDisplay}>7</div>*/}
                {/*<div className={squareDisplay}>8</div>*/}
                {/*<div className={squareDisplay}>9</div>*/}

                {/*<Index*/}
                    {/*invisible = "invisible"*/}
                {/*/>*/}

            </div>
        )
    }
    renderEditMode(){
        const { redirectToSignUpLoginTemplate } = this.state;
        if (redirectToSignUpLoginTemplate)
            return <Redirect push to="/" />;

        const { currentUser } = this.state;
        const { avatarLink } = this.state;
        const { backgroundLink } = this.state;
        const { redirectToIndex } = this.state;
        const { currentUserAvatarLink } = this.state;
        const checkUserForUpdatePhotos = (this.state.whichUserID === null || this.state.whichUserID === this.state.currentUserID) ? '' : 'invisible';

        if (redirectToIndex) {
            return <Redirect push to="/index" />;
        }

        const { articles } = this.state;
        const articleElements = articles.map((articleGroup) =>
            (<div key = {articleGroup.centerArticle._id}>
                <ArticleSwipeItem
                    articleGroup = {articleGroup}
                    currentUserAvatarLink = {currentUserAvatarLink}
                    articlesInProfile = {true}
                    refetch = {this.refetch}
                    onUpdateArticle = {this.updateArticle}
                    onDeleteArticle = {this.deleteArticle}
                    handleLike = {this.articleLike}
                    handleCommentLike = {this.commentLike}
                    deleteComment = {this.deleteComment}
                    updateComment = {this.updateComment}
                    addComment={this.addComment}
                />
            </div>)
        );

        const { userName } = this.state;
        const { aboutMe } = this.state;
        const { profileEditingOpacityZero } = this.state;
        const { nonProfileEditingOpacityZero } = this.state;
        const { profileEditingInvisible } = this.state;
        const { nonProfileEditingInvisible } = this.state;

        return (
            <div>
                <div className={'loadingGif2 ' + this.state.loadingGifInvisible}><Spinner name='ball-spin-fade-loader' /></div>
                <div className='flex justify-content-space-between profileButtonPosition opacity-zero'>
                    <img src={iconTagWhite} className='navigationIcon' />
                    <img src={iconMenuWhite} className='navigationIcon' />
                </div>
                <div className="coverPhoto" style={{'backgroundImage': 'url('+backgroundLink+')'}}>
                    <div className="flex justify-content-space-between frostedGlassEditProfile">
                        <span onClick={this.toggleRenderMode}>取消</span>
                        <span style={{width: 'auto'}}>編輯個人頁面</span>
                        <span onClick={this.end_profile_setting}>完成</span>
                    </div>
                    <div className="userPhotoInProfile" style={{'backgroundImage': 'url('+avatarLink+')'}}>
                        <label>
                            <img src={uploadUserPhotoButton} className='navigationIcon editProfileButtonPosition' />
                            <form encType="multipart/form-data">
                                <input className="invisible" name="uploadAvatar" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                            </form>
                        </label>
                    </div>
                    <div className="userPhotoInProfileBorder"> </div>

                    <div className='flex justify-content coverColorDivPosition'>
                        <label className={checkUserForUpdatePhotos}>
                            <div className="coverColorButton">編輯背景</div>
                            <form encType="multipart/form-data">
                                <input className="invisible" name="uploadBackGroundPhoto" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                            </form>
                        </label>
                        <label className={checkUserForUpdatePhotos}>
                            <div className="coverColorButton"><img src={paletteIcon} className='paletteIcon'/><span>主 色</span></div>
                        </label>
                    </div>

                    <div>
                        <p className="userName opacity-zero">{currentUser}</p>
                        <input className="userNameInput" type="text" name='userName' value={userName} onChange={this.profile_setting}/>
                    </div>

                    <table className="infoTable">
                        <tbody>
                        <tr>
                            <td colSpan="3" className="mottoTd">
                                <div className="mottoDiv opacity-zero">{aboutMe}</div>
                                <textarea className="mottoTextarea" name='aboutMe' value={aboutMe} onChange={this.profile_setting}>

                                </textarea>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className='profileArticleSortBox'>
                    <div className='flex justify-content-space-between profileArticleSort'>
                        <div>全部</div>
                        <div>貼文</div>
                        <div>相片/影片</div>
                        <div>被標記</div>
                        <div>收藏</div>
                    </div>
                </div>
                <hr className="hrLine" />

                {articleElements}

            </div>
        )
    }
    // 判斷渲染一般畫面或編輯畫面
    render(){
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

export default Profile;