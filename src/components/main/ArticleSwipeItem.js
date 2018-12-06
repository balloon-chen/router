import React from 'react';
import ArticleItem from './ArticleItem';
import Carousel from '../swipeTest/Carousel';

class ArticleSwipeItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
        };
        this.deleteArticle = this.deleteArticle.bind(this);
        this.articleLike = this.articleLike.bind(this);
        this.commentLike = this.commentLike.bind(this);
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
        const articleElements =
            (<div key={articleGroup[0]._id}>
                <ArticleItem
                    author={articleGroup[0].author}
                    title={articleGroup[0].title}
                    content={articleGroup[0].listOfContent[articleGroup[0].listOfContent.length - 1].content}
                    category={articleGroup[0].category}
                    articleID={articleGroup[0]._id}
                    numberOfLikes={articleGroup[0].likes.length}
                    likeOrDislike={articleGroup[0].likes.filter((like) => like === this.state.currentUser).length}
                    whoLikes={articleGroup[0].likes}
                    comments={articleGroup[0].comment}
                    checkUser={articleGroup[0].author !== this.state.currentUser ? ' invisible' : ''}
                    avatarLink={articleGroup[0].avatarLink}
                    authorID={articleGroup[0].authorID}

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
                    mediaLink = {articleGroup[0].listOfContent[articleGroup[0].listOfContent.length - 1].mediaLink === undefined ? '' : articleGroup[0].listOfContent[articleGroup[0].listOfContent.length - 1].mediaLink[0].link}/>
            </div>);

        return (
            <div>
                {articleElements}
            </div>
        );
    }

    // 渲染動態牆畫面
    renderIndexMode() {
        const {articleGroup} = this.props;
        const {currentUserAvatarLink} = this.props;
        const {articlesInProfile} = this.props;
        const articleElements = articleGroup.map((article) =>
            (<div key={articleGroup._id}>
                <ArticleItem
                    author={article.author}
                    title={article.title}
                    content={article.listOfContent[article.listOfContent.length - 1].content}
                    category={article.category}
                    articleID={article._id}
                    numberOfLikes={article.likes.length}
                    likeOrDislike={article.likes.filter((like) => like == this.state.currentUser).length}
                    whoLikes={article.likes}
                    comments={article.comment}
                    checkUser={article.author != this.state.currentUser ? ' invisible' : ''}
                    avatarLink={article.avatarLink}
                    authorID={article.authorID}

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
                    mediaLink = {article.listOfContent[article.listOfContent.length - 1].mediaLink === undefined ? '' : article.listOfContent[article.listOfContent.length - 1].mediaLink[0].link}
                />
            </div>)
        );

        return (
            <div>
                <div style={{height: '400px'}}>
                    <Carousel axis='x' className="custom-class" frames={articleElements}> </Carousel>
                    <div className='articleCardShadow'> </div>
                </div>
            </div>
        );
    }

    render() {
        return this.props.articlesInProfile ? this.renderProfileMode() : this.renderIndexMode();
    }
}

export default ArticleSwipeItem;