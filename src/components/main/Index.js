import React from 'react';
import ArticleItem from './ArticleItem';
import Navigation from '../Navigation';
import {Redirect} from 'react-router-dom';

import logo from '../../images/logo.svg';
import iconSearch from '../../images/iconSearch.svg';
import iconNotice from '../../images/iconNotice.svg';
import icon03 from '../../images/icon03.svg';
import icon04 from '../../images/icon04.svg';
import userPhotoDefault from '../../images/userPhotoDefault.svg';
import newArticleButton from '../../images/newArticleButton.svg';

import Carousel from '../swipeTest/Carousel';
import ArticleSwipeItem from './ArticleSwipeItem';

import loadingGif from "../../images/loadingGif.gif";
import Spinner from 'react-spinkit';
import Notification from "../notification/Notification";

class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            apiURL: 'http://140.119.163.194:3004/',
            // apiURL: 'http://localhost:3000/',
            articles: [],
            redirectToPost: false,
            redirectToIndex: false,
            redirectToProfile: false,
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            currentUserAvatarLink: '',
            loadingGifInvisible: '',

            scrollY: '',
            innerHeight: '',
            scrollHeight: '',
            count: 1,

            newArticleButtonImg: 'newArticleButtonImg',
            lazyLoad: true,

            redirectToSignUpLoginTemplate: false,

            articleInvisible: '',
            notificationInvisible: 'invisible'
        };

        this.fetchData = this.fetchData.bind(this);
        this.refetch = this.refetch.bind(this);

        this.redirectToPost = this.redirectToPost.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.articleLike = this.articleLike.bind(this);
        this.commentLike = this.commentLike.bind(this);

        this.handleScroll = this.handleScroll.bind(this);
        this.handleScrollNewArticleButtonScrolling = this.handleScrollNewArticleButtonScrolling.bind(this);
        this.handleScrollNewArticleButton = this.handleScrollNewArticleButton.bind(this);
        this.toggleNoticeInvisible = this.toggleNoticeInvisible.bind(this);
    }


    // 下層元件函式


    // 共用

    // 重新抓資料並重新渲染畫面
    refetch() {
        setTimeout(this.fetchData, 700);
    }


    // ArticleItem

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
                this.fetchData();
            });
        // setTimeout(this.fetchData, 500);
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


    // ArticleComment

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
                this.fetchData();
            });
        // setTimeout(this.fetchData, 700);
        // alert('articleID: '+articleID+'\ncommentID: '+commentID)
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


    // AddArticleComment

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


    // articleLike

    // 文章按愛心或收回愛心
    articleLike(articleID, likeOrDislike) {
        // alert('articleID: '+articleID+'\nlikesPersonID: '+this.state.currentUser+'\nlikeOrDislike: '+likeOrDislike);
        if (likeOrDislike === false || likeOrDislike === 0) {
            // alert('有');
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
            // alert('沒有');
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


    // 此元件函式


    // 重新導向至發文頁
    redirectToPost() {
        if (localStorage.getItem("articleContents"))
            localStorage.removeItem("articleContents");
        if (localStorage.getItem("articleID"))
            localStorage.removeItem("articleID");
        if (localStorage.getItem("articleTitle"))
            localStorage.removeItem("articleTitle");
        if (localStorage.getItem("articleCategory"))
            localStorage.removeItem("articleCategory");
        this.setState({redirectToPost: true});
    }

    redirectToProfile() {
        localStorage.removeItem("whichUserID");
        this.setState({redirectToProfile: true});
    }

    // 抓資料並渲染畫面
    fetchData() {



        // fetch(this.state.apiURL+'search_articleByUserID', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({userID: this.state.currentUserID})
        // }).then(res=>res.json())
        //     .then(parsedJSON => {
        //         console.log(parsedJSON);
        //         this.setState({articles: parsedJSON.contentOfArticle})
        //         console.log(parsedJSON.contentOfArticle[0])
        //         console.log('authorID: ' + parsedJSON.contentOfArticle[0].authorID)
        //         console.log('userName: ' + parsedJSON.contentOfArticle[0].author)
        //         console.log('articleTitle: ' + parsedJSON.contentOfArticle[0].title)
        //         console.log('articleContent: ' + parsedJSON.contentOfArticle[0].listOfContent[0].content)
        //         console.log('articleCategory :' + parsedJSON.contentOfArticle[0].category)
        //         console.log('like :' + parsedJSON.contentOfArticle[0].likes)
        //         console.log('avatarLink: ' + parsedJSON.contentOfArticle[0].avatarLink)
        //         console.log('comment: ' + parsedJSON.contentOfArticle[0].comment)
        //         console.log('comment[0]: ' + parsedJSON.contentOfArticle[0].comment[0])
        //         // console.log('comment[0].id: ' + parsedJSON.contentOfArticle[0].comment[0].id)
        //     });

        // fetch('http://140.119.163.194:3000/search_article')


        this.setState({count: 1});
        this.setState({lazyLoad: true});
        // 二維結構的文章
        fetch(this.state.apiURL + 'search_articleByCategoryAndTheSameAuthor', {
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
                // this.setState({articles: this.state.articlesTempTest});
                this.setState({loadingGifInvisible: 'invisible'});
                // console.log(parsedJSON[0].centerArticle._id);
                // console.log('authorID: ' + parsedJSON[0].authorID)
                // console.log('userName: ' + parsedJSON[0].author)
                // console.log('articleTitle: ' + parsedJSON[0].title)
                // console.log('articleContent: ' + parsedJSON[0].listOfContent[0].content)
                // console.log('articleCategory :' + parsedJSON[0].category)
                // console.log('like :' + parsedJSON[0].likes)
                // console.log('avatarLink: ' + parsedJSON[0].avatarLink)
                // console.log('comment: ' + parsedJSON[0].comment)
                // console.log('comment[0]: ' + parsedJSON[0].comment[0])
                // console.log('comment[0].id: ' + parsedJSON[0].comment[0].id)
                // console.log('comment: ' + parsedJSON[1].listOfComment[0].content)
            });


        // 一維結構的文章
        // fetch(this.state.apiURL+'search_article')
        //     .then(response => response.json())
        //     .then(parsedJSON => {
        //         // this.setState({articles: parsedJSON});
        //         this.setState({articles: this.state.articlesTempTest});
        //         this.setState({loadingGifInvisible: 'invisible'});
        //         // console.log(parsedJSON)
        //         // console.log(parsedJSON[1][0])
        //         // console.log('authorID: ' + parsedJSON[0][0].authorID)
        //         // console.log('userName: ' + parsedJSON[0][0].author)
        //         // console.log('articleTitle: ' + parsedJSON[0][0].title)
        //         // console.log('articleContent: ' + parsedJSON[0][0].listOfContent[0].content)
        //         // console.log('articleCategory :' + parsedJSON[0][0].category)
        //         // console.log('like :' + parsedJSON[0][0].likes)
        //         // console.log('avatarLink: ' + parsedJSON[0][0].avatarLink)
        //         // console.log('comment: ' + parsedJSON[0][1].listOfComment[0].content)
        //         console.log(parsedJSON[0])
        //         console.log('authorID: ' + parsedJSON[0].authorID)
        //         console.log('userName: ' + parsedJSON[0].author)
        //         console.log('articleTitle: ' + parsedJSON[0].title)
        //         console.log('articleContent: ' + parsedJSON[0].listOfContent[0].content)
        //         console.log('articleCategory :' + parsedJSON[0].category)
        //         console.log('like :' + parsedJSON[0].likes)
        //         console.log('avatarLink: ' + parsedJSON[0].avatarLink)
        //         console.log('comment: ' + parsedJSON[0].comment)
        //         console.log('comment[0]: ' + parsedJSON[0].comment[0])
        //         console.log('comment[0].id: ' + parsedJSON[0].comment[0].id)
        //         // console.log('comment: ' + parsedJSON[1].listOfComment[0].content)
        //     })
        //     .catch(err => console.log(err));


        // 取得個人大頭照
        fetch(this.state.apiURL + 'search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID})
        }).then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({currentUserAvatarLink: res.avatarLink[res.avatarLink.length-1]});
            });
    }

    // componentDidMount() {
    //     this.fetchData();
    // }
    componentDidMount() {
        this.fetchData();
        this.setState({redirectToSignUpLoginTemplate: (localStorage.getItem("currentUser") === null || localStorage.getItem("currentUser") === undefined)});
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('scroll', this.handleScrollNewArticleButtonScrolling);
    }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }

    // 參考連結
    // https://stackoverflow.com/questions/29725828/update-style-of-a-component-onscroll-in-react-js?fbclid=IwAR0UIyP6pWWWiNgZvr7bKSNGKXvr23lidLcJ1VMv80UOcU6FRowjrx2AcAY
    handleScroll() {
        if(this.state.lazyLoad) {
            // console.log('scrollY: '+window.scrollY);
            // console.log('innerHeight: '+window.innerHeight);
            // console.log('scrollHeight: '+document.documentElement.scrollHeight);
            this.setState({scrollY: window.scrollY});
            this.setState({innerHeight: window.innerHeight});
            this.setState({scrollHeight: document.documentElement.scrollHeight});
            let scrollY = this.state.scrollY;
            let innerHeight = this.state.innerHeight;
            let scrollHeight = this.state.scrollHeight;
            console.log(scrollY);
            console.log(innerHeight);
            console.log(scrollHeight);
            if (scrollY >= (scrollHeight * 0.7 - innerHeight)) {
                this.setState({count: this.state.count + 1});
                this.setState({scrollHeight: document.documentElement.scrollHeight});
                // 二維結構的文章
                fetch(this.state.apiURL + 'search_articleByCategoryAndTheSameAuthor', {
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
                        if (parsedJSON[0] === undefined){
                            // alert(this.state.lazyLoad);
                            this.setState({lazyLoad: false});
                            // window.removeEventListener('scroll', this.handleScroll);
                        }
                        this.setState({articles: this.state.articles.concat(parsedJSON)});
                        this.setState({loadingGifInvisible: 'invisible'});
                        console.log(parsedJSON[0]);
                        // window.document.body.scrollTop = 0;
                        // window.document.documentElement.scrollTop = 0;
                    });
            }
        }
    }
    handleScrollNewArticleButtonScrolling(){
        this.setState({newArticleButtonImg: 'newArticleButtonImgScrolling'});
        setTimeout(this.handleScrollNewArticleButton ,500);
    }
    handleScrollNewArticleButton(){
        this.setState({newArticleButtonImg: 'newArticleButtonImg'});
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

    render() {
        const { redirectToSignUpLoginTemplate } = this.state;
        if (redirectToSignUpLoginTemplate)
            return <Redirect push to="/" />;

        const {articles} = this.state;
        console.log(articles)
        const {redirectToPost} = this.state;
        const {redirectToProfile} = this.state;
        const {currentUserAvatarLink} = this.state;
        const {newArticleButtonImg} = this.state;

        if (redirectToPost) {
            return <Redirect push to="/post"/>;
        }
        if (redirectToProfile) {
            return <Redirect push to="/profile"/>;
        }

        // const articleElements = articles.map((article) =>
        //     (<div key = {article[0]._id}>
        //         <ArticleItem
        //             author = { article[0].author }
        //             title = {article[0].title}
        //             content = {article[0].listOfContent[article[0].listOfContent.length-1].content}
        //             category = {article[0].category}
        //             articleID = {article[0]._id}
        //             numberOfLikes = {article[0].numberOfLikes}
        //             likeOrDislike={ article[0].likes.filter( (like) => like==this.state.currentUser ).length }
        //             whoLikes = { article[0].likes }
        //             comments = { article }
        //             checkUser = { article[0].author!=this.state.currentUser ? ' invisible' : '' }
        //             avatarLink = { article[0].avatarLink }
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
        //         />
        //     </div>)
        // );

        // alert(articles.filter( (article) => article._id === '5beaf1783e4f857a0a24f6e3' ))

        // const fff = articles.filter(function(article){
        //     return article._id === '5beaf1783e4f857a0a24f6e3';
        // });
        // alert(fff);

        // const articleElements = articles.map((article) =>
        //     // (<div key = {article._id}>
        //     // 🦄️ swipe
        //     // (<div key = {article._id} style={{backgroundColor: 'rgba(255,255,255,1)', height: '100%'}}>
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
        //             articlesInProfile = {false}
        //         />
        //     </div>)
        // );
        const articleElements = articles.map((articleGroup) =>
            (<div key={articleGroup.centerArticle._id}>
                <ArticleSwipeItem
                    articleGroup={articleGroup}
                    currentUserAvatarLink={currentUserAvatarLink}
                    articlesInProfile={false}
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

        // 在 profile 頁面時隱藏 Nav 和 + 按鈕
        const {invisible} = this.props;

        const { articleInvisible } = this.state;
        const { notificationInvisible } = this.state;

        return (
            <div>
                {/*<img src={loadingGif} alt="loadingGif" className={'loadingGif '+this.state.loadingGifInvisible}/>*/}
                {/*<div className={'loadingGif ' + this.state.loadingGifInvisible}> </div>*/}
                <div className={'loadingGif2 ' + this.state.loadingGifInvisible}><Spinner name='ball-spin-fade-loader' /></div>
                {/*<div className="articleBackground">*/}
                <div className="articleBackground"> </div>
                {/*<div className={invisible}><Navigation /></div>*/}
                <div className="frostedGlass ddd">
                    <img src={logo}
                         className="navigationIcon xxx"
                         onClick={this.redirectToIndex}
                    />
                    <img src={iconSearch} className="navigationIcon nonfunctionalOpacity"/>
                    <img src={iconNotice} className="navigationIcon" onClick={this.toggleNoticeInvisible}/>
                    <img src={icon03} className="navigationIcon nonfunctionalOpacity"/>
                    <img src={icon04} className="navigationIcon nonfunctionalOpacity"/>
                    <img src={currentUserAvatarLink} className="navigationIcon ooo" onClick={this.redirectToProfile}/>
                </div>
                <div className={notificationInvisible}>
                    <Notification />
                </div>

                <div className={articleInvisible}>
                    <br/><br/>
                    <div>{articleElements}</div>


                    {/*🦄️ swipe*/}
                    {/*<div style={{height: '360px'}}>*/}
                    {/*<Carousel axis='x' className="custom-class" frames={articleElements}> </Carousel>*/}
                    {/*<div className='articleCardShadow'> </div>*/}
                    {/*</div>*/}
                    <br/>


                    <div className={invisible}>
                        <div onClick={this.redirectToPost}>
                            {/*<div className="newArticleButton"></div>*/}
                            <img src={newArticleButton} alt="newArticleButton" className={newArticleButtonImg} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Index;