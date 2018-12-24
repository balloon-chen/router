import React from 'react';
import ArticleItem from './ArticleItem';
import Carousel from '../swipeTest/Carousel';
import ProfileArticle from "../profile/ProfileArticle";

class ArticleSwipeItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            index: 0,
            length: this.props.articleGroup.length,
            buttonLeftOpacity: 'invisible',
            buttonRightOpacity: '',
        };
        this.deleteArticle = this.deleteArticle.bind(this);
        this.articleLike = this.articleLike.bind(this);
        this.commentLike = this.commentLike.bind(this);
        this.swipe = this.swipe.bind(this);
    }

    deleteArticle(articleID){
        this.props.onDeleteArticle(articleID);
    }
    articleLike(articleID, likeOrDislike){
        this.props.handleLike(articleID, likeOrDislike);
    }
    commentLike(commentID, articleID, likeOrDislike){
        this.props.handleCommentLike(commentID, articleID, likeOrDislike);
    }

    swipe(event){
        const { index } = this.state;
        const { length } = this.state;

        switch (event.target.name){
            case 'swipe_left':{
                if (index > 0){
                    if (index-1 === 0)
                        this.setState({buttonLeftOpacity: 'invisible'});
                    this.setState({index: index-1});
                    this.setState({buttonRightOpacity: ''});
                }
                else {
                    this.setState({index: index});
                }
                break;
            }
            case 'swipe_right':{
                if (index < length - 1){
                    if (index+1 === (length - 1))
                        this.setState({buttonRightOpacity: 'invisible'});
                    this.setState({index: index+1});
                    this.setState({buttonLeftOpacity: ''});
                }
                else {
                    this.setState({index: index});
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    componentDidMount(){
        const { length } = this.state;

        if (length === 1){
            this.setState({buttonRightOpacity: 'invisible'});
        }
    }

    // 渲染個人檔案畫面
    renderProfileMode() {
        const {articleGroup} = this.props;
        const {currentUserAvatarLink} = this.props;
        const {articlesInProfile} = this.props;
        // const articleElements = articleGroup.map((article) =>
        //     (<div key={articleGroup._id}>
        //         <ArticleItem
        //             author={article.author}
        //             title={article.title}
        //             content={article.listOfContent[article.listOfContent.length - 1].content}
        //             category={article.category}
        //             articleID={article._id}
        //             numberOfLikes={article.likes.length}
        //             likeOrDislike={article.likes.filter((like) => like == this.state.currentUser).length}
        //             whoLikes={article.likes}
        //             comments={article.comment}
        //             checkUser={article.author != this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={article.avatarLink}
        //             authorID={article.authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {article.listOfContent[article.listOfContent.length - 1].mediaLink === undefined ? '' : article.listOfContent[article.listOfContent.length - 1].mediaLink[0].link}/>
        //     </div>)
        // );
        const { index } = this.state;
        const { buttonLeftOpacity } = this.state;
        const { buttonRightOpacity } = this.state;
        // const articleElements =
        //     (<div key={articleGroup[index]._id}>
        //         <ArticleItem
        //             author={articleGroup[index].author}
        //             title={articleGroup[index].title}
        //             content={articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].content}
        //             category={articleGroup[index].category}
        //             articleID={articleGroup[index]._id}
        //             numberOfLikes={articleGroup[index].likes.length}
        //             likeOrDislike={articleGroup[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
        //             whoLikes={articleGroup[index].likes}
        //             comments={articleGroup[index].comment}
        //             checkUser={articleGroup[index].author !== this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={articleGroup[index].avatarLink}
        //             authorID={articleGroup[index].authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink === undefined ? '' : articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink[0].link}
        //             time = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].time}
        //         />
        //
        //     </div>);
        const articleElements =
            (<div key={articleGroup[index]._id}>
                <ProfileArticle
                    author={articleGroup[index].author}
                    title={articleGroup[index].title}
                    content={articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].content}
                    category={articleGroup[index].category}
                    articleID={articleGroup[index]._id}
                    numberOfLikes={articleGroup[index].likes.length}
                    likeOrDislike={articleGroup[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
                    whoLikes={articleGroup[index].likes}
                    comments={articleGroup[index].comment}
                    checkUser={articleGroup[index].author !== this.state.currentUser ? ' invisible' : ''}
                    avatarLink={articleGroup[index].avatarLink}
                    authorID={articleGroup[index].authorID}

                    refetch={this.props.refetch}

                    onUpdateArticle={this.props.updateArticle}
                    onDeleteArticle={this.deleteArticle}
                    handleLike={this.articleLike}
                    handleCommentLike={this.commentLike}
                    deleteComment={this.props.deleteComment}
                    updateComment={this.props.updateComment}
                    addComment={this.props.addComment}

                    currentUserAvatarLink={currentUserAvatarLink}

                    articlesInProfile={articlesInProfile}

                    // 臨時亂做的圖便上傳
                    // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
                    mediaLink = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink === undefined ? '' : articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink[0].link}
                    time = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].time}
                />

            </div>);

        return (
            <div>
                {articleElements}
            </div>
        );
    }

    // 渲染動態牆畫面
    renderIndexMode() {
        // const {articleGroup} = this.props;
        // const {currentUserAvatarLink} = this.props;
        // const {articlesInProfile} = this.props;
        // const articleElements = articleGroup.map((article) =>
        //     (<div key={articleGroup._id}>
        //         <ArticleItem
        //             author={article.author}
        //             title={article.title}
        //             content={article.listOfContent[article.listOfContent.length - 1].content}
        //             category={article.category}
        //             articleID={article._id}
        //             numberOfLikes={article.likes.length}
        //             likeOrDislike={article.likes.filter((like) => like == this.state.currentUser).length}
        //             whoLikes={article.likes}
        //             comments={article.comment}
        //             checkUser={article.author != this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={article.avatarLink}
        //             authorID={article.authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {article.listOfContent[article.listOfContent.length - 1].mediaLink === undefined ? '' : article.listOfContent[article.listOfContent.length - 1].mediaLink[0].link}
        //         />
        //     </div>)
        // );
        //
        // return (
        //     <div>
        //         <div style={{height: '500px'}}>
        //             <Carousel axis='x' className="custom-class" frames={articleElements}> </Carousel>
        //             <div className='articleCardShadow'> </div>
        //         </div>
        //     </div>
        // );




        const {articleGroup} = this.props;
        const {currentUserAvatarLink} = this.props;
        const {articlesInProfile} = this.props;
        // const articleElements = articleGroup.map((article) =>
        //     (<div key={articleGroup._id}>
        //         <ArticleItem
        //             author={article.author}
        //             title={article.title}
        //             content={article.listOfContent[article.listOfContent.length - 1].content}
        //             category={article.category}
        //             articleID={article._id}
        //             numberOfLikes={article.likes.length}
        //             likeOrDislike={article.likes.filter((like) => like == this.state.currentUser).length}
        //             whoLikes={article.likes}
        //             comments={article.comment}
        //             checkUser={article.author != this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={article.avatarLink}
        //             authorID={article.authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {article.listOfContent[article.listOfContent.length - 1].mediaLink === undefined ? '' : article.listOfContent[article.listOfContent.length - 1].mediaLink[0].link}/>
        //     </div>)
        // );
        const { index } = this.state;
        const { buttonLeftOpacity } = this.state;
        const { buttonRightOpacity } = this.state;
        const articleElements =
            (<div key={articleGroup[index]._id}>
                <ArticleItem
                    author={articleGroup[index].author}
                    title={articleGroup[index].title}
                    content={articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].content}
                    category={articleGroup[index].category}
                    articleID={articleGroup[index]._id}
                    numberOfLikes={articleGroup[index].likes.length}
                    likeOrDislike={articleGroup[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
                    whoLikes={articleGroup[index].likes}
                    comments={articleGroup[index].comment}
                    checkUser={articleGroup[index].author !== this.state.currentUser ? ' invisible' : ''}
                    avatarLink={articleGroup[index].avatarLink}
                    authorID={articleGroup[index].authorID}

                    refetch={this.props.refetch}

                    onUpdateArticle={this.props.updateArticle}
                    onDeleteArticle={this.deleteArticle}
                    handleLike={this.articleLike}
                    handleCommentLike={this.commentLike}
                    deleteComment={this.props.deleteComment}
                    updateComment={this.props.updateComment}
                    addComment={this.props.addComment}

                    currentUserAvatarLink={currentUserAvatarLink}

                    articlesInProfile={articlesInProfile}

                    // 臨時亂做的圖便上傳
                    // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
                    mediaLink = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink === undefined ? '' : articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink[0].link}
                    time = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].time}
                />

            </div>);

        return (
            <div>
                {articleElements}
                <div style={{marginTop: '-20px'}}>
                    <span className='swipeText'>相關文章篇數：{this.state.length}</span>
                    <button name='swipe_left' className={buttonLeftOpacity + ' swipeButton'} onClick={this.swipe}>左一篇</button>
                    <button name='swipe_right' className={buttonRightOpacity + ' swipeButton'} onClick={this.swipe}>右一篇</button>
                </div>
            </div>
        );
    }

    render() {
        return this.props.articlesInProfile ? this.renderProfileMode() : this.renderIndexMode();
        // return this.props.articlesInProfile ? this.renderProfileMode() : this.renderProfileMode();
    }
}

export default ArticleSwipeItem;