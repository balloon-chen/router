import React from 'react';
import "../../stylesheets/articleItem.css";
import ArticleLike from './ArticleLike';
import AddArticleComment from './AddArticleComment';
import ArticleComment from './ArticleComment';

class ArticleItem extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            articleID: '',
            newContent: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken")
        };
        this.updateArticle = this.updateArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);
    }

    // 一般畫面點擊編輯時取得文章 ID
    updateArticle(event){
        this.setState({ articleID: event.target.value });
        this.toggleEditMode();
    }
    // 編輯畫面取得輸入值
    handleChange(event) {
        this.setState({ newContent: event.target.value });
    }
    // 編輯畫面提交表單
    handleSubmit(event) {
        this.props.onUpdateArticle(this.state.articleID, this.state.newContent);
        this.toggleEditMode();
        event.preventDefault();
    }
    // 切換一般畫面或編輯畫面
    toggleEditMode(){
        this.setState({ editable: !this.state.editable });
    }

    // 渲染編輯畫面
    renderEditMode(){
        const { author } = this.props;
        const { title } = this.props;
        const { content } = this.props;
        const { category } = this.props;
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        const { likeOrDislike }=this.props;

        return (
            <div className="articleCard">
                <form onSubmit={this.handleSubmit}>
                    <span className="articleCategory">{category}</span>
                    <span className="articleTitle">{title}</span>
                    <br/>
                    <hr className="hrLine" />
                    <br/>
                    <div className="userPhoto"></div>
                    <span className="articleAuthor">{author}</span>
                    <input className="articleContent" type="text" placeholder={content} onChange={this.handleChange} />
                    <input className="updateDeleteSubmit" type="submit" value="確定" />
                </form>
                <ArticleLike
                    numberOfLikes = {numberOfLikes}
                    likeOrDislike = {!!likeOrDislike}
                    articleID = {articleID}
                    handleLike = {() => onHandleLike && onHandleLike(articleID, likeOrDislike)}
                />
            </div>
        );
    }
    // 渲染一般畫面
    renderViewMode(){
        const { author } = this.props;
        const { title } = this.props;
        const { content } = this.props;
        const { category } = this.props;
        const { articleID } = this.props;
        const { onDeleteArticle } = this.props;
        const { handleLike } = this.props;
        const { handleCommentLike } = this.props;
        const { numberOfLikes } = this.props;
        const { likeOrDislike }=this.props;

        const { whoLikes } = this.props;

        const { comments } = this.props;
        const commentElements = comments.slice(1).map((comment) => {
            return (<div key = {comment._id}>
                <ArticleComment
                    commentID = {comment._id}
                    commenterID = {comment.commenterID}
                    articleID = {comment.articleID}
                    comment = {comment.listOfComment[0].content}
                    checkUser = {comment.commenterID!=this.state.currentUser ? ' invisible' : ''}
                    onDeleteComment = {this.props.deleteComment}
                    onUpdateComment = {this.props.updateComment}
                    refetch = {this.refetch}

                    numberOfLikes = {comment.numberOfLikes}
                    likeOrDislike={ comment.likes.filter( (like) => like==this.state.currentUser ).length }
                    handleCommentLike = {() => handleCommentLike && handleCommentLike(comment._id, comment.likes.filter( (like) => like==this.state.currentUser ).length)}
                />
            </div>)
        });

        return (
            <div>
                <div className="articleCard">
                    <span className="articleCategory">{category}</span>
                    <span className="articleTitle">{title}</span>
                    <br/>
                    <hr className="hrLine" />
                    <br/>
                    <div className="userPhoto"></div>
                    <span className="articleAuthor">{author}</span>
                    <p className="articleContent">{content}</p>
                    <button className="updateDeleteSubmit" type='submit' onClick={this.updateArticle} value={articleID}>編輯</button>
                    <button className="updateDeleteSubmit" type='submit' onClick={() => onDeleteArticle && onDeleteArticle(articleID)}>刪除</button>
                    <ArticleLike
                        numberOfLikes = {numberOfLikes}
                        likeOrDislike = {!!likeOrDislike}
                        articleID = {articleID}
                        onHandleLike = {() => handleLike && handleLike(articleID, likeOrDislike)}
                    />
                    <div style={invisible}>按讚的人：{whoLikes}</div>
                    <br/>
                    <hr className="hrLine" />
                    <br/>
                    <AddArticleComment
                        articleID = {articleID}
                        onAddComment = {this.props.addComment}
                        refetch = {this.refetch}
                    />
                    <div>{commentElements}</div>
                </div>
            </div>
        );
    }
    // 判斷渲染一般畫面或編輯畫面
    render(){
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

export default ArticleItem;

const invisible = {
    'display': 'none'
};