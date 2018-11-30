import React from 'react';
import ArticleItem from './ArticleItem';
import Carousel from '../swipeTest/Carousel';

class ArticleSwipeItem extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
        };
    }

    // 渲染個人檔案畫面
    renderProfileMode(){
        const { articleGroup } = this.props;
        const { currentUserAvatarLink } = this.props;
        const { articlesInProfile } = this.props;
        const articleElements = articleGroup.map((article) =>
            (<div key = {articleGroup._id}>
                <ArticleItem
                    author = { article.author }
                    title = {article.title}
                    content = {article.listOfContent[article.listOfContent.length-1].content}
                    category = {article.category}
                    articleID = {article._id}
                    numberOfLikes = {article.likes.length}
                    likeOrDislike={ article.likes.filter( (like) => like==this.state.currentUser ).length }
                    whoLikes = { article.likes }
                    comments = { article.comment }
                    checkUser = { article.author!=this.state.currentUser ? ' invisible' : '' }
                    avatarLink = { article.avatarLink }
                    authorID = { article.authorID }

                    refetch = {this.refetch}

                    onUpdateArticle = {this.updateArticle}
                    onDeleteArticle = {this.deleteArticle}
                    handleLike = {this.articleLike}
                    handleCommentLike = {this.commentLike}
                    deleteComment = {this.deleteComment}
                    updateComment = {this.updateComment}
                    addComment = {this.addComment}

                    currentUserAvatarLink = {currentUserAvatarLink}

                    articlesInProfile = {articlesInProfile}
                />
            </div>)
        );

        return (
            <div>
                {articleElements}
            </div>
        );
    }
    // 渲染動態牆畫面
    renderIndexMode(){
        const { articleGroup } = this.props;
        const { currentUserAvatarLink } = this.props;
        const { articlesInProfile } = this.props;
        const articleElements = articleGroup.map((article) =>
            (<div key = {articleGroup._id}>
                <ArticleItem
                    author = { article.author }
                    title = {article.title}
                    content = {article.listOfContent[article.listOfContent.length-1].content}
                    category = {article.category}
                    articleID = {article._id}
                    numberOfLikes = {article.likes.length}
                    likeOrDislike={ article.likes.filter( (like) => like==this.state.currentUser ).length }
                    whoLikes = { article.likes }
                    comments = { article.comment }
                    checkUser = { article.author!=this.state.currentUser ? ' invisible' : '' }
                    avatarLink = { article.avatarLink }
                    authorID = { article.authorID }

                    refetch = {this.refetch}

                    onUpdateArticle = {this.updateArticle}
                    onDeleteArticle = {this.deleteArticle}
                    handleLike = {this.articleLike}
                    handleCommentLike = {this.commentLike}
                    deleteComment = {this.deleteComment}
                    updateComment = {this.updateComment}
                    addComment = {this.addComment}

                    currentUserAvatarLink = {currentUserAvatarLink}

                    articlesInProfile = {articlesInProfile}
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
    render(){
        return this.props.articlesInProfile ? this.renderProfileMode() : this.renderIndexMode();
    }
}

export default ArticleSwipeItem;