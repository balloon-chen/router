import React from 'react';
import "../../stylesheets/articleItem.css";
import ArticleLike from "./ArticleLike";

class ArticleComment extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            commentID: '',
            newComment: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken")
        };
        this.updateComment = this.updateComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);
    }

    // 一般畫面點擊編輯時取得留言 ID
    updateComment(event) {
        this.setState({ commentID: event.target.value });
        this.toggleEditMode();
    }
    // 編輯畫面取得輸入值
    handleChange(event) {
        this.setState({ newComment: event.target.value });
    }
    // 編輯畫面提交表單
    handleSubmit(event) {
        this.props.onUpdateComment(this.state.commentID, this.state.newComment);
        // 🦄️
        this.props.refetch();
        this.toggleEditMode();
        event.preventDefault();
    }
    // 切換一般畫面或編輯畫面
    toggleEditMode(){
        this.setState({ editable: !this.state.editable });
    }

    // 渲染編輯畫面
    renderEditMode(){
        const { comment } = this.props;
        const { commenterID } = this.props;
        const { checkUser } = this.props;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <hr className="hrLine" />
                    <br/>
                    <div>{commenterID}: <input className="" type="text" placeholder={comment} onChange={this.handleChange} /></div>
                    <button className={'updateDeleteSubmit'+checkUser} type='submit'>確定</button>
                </form>
            </div>
        );
    }
    // 渲染一般畫面
    renderViewMode(){
        const { articleID } = this.props;
        const { comment } = this.props;
        const { commentID } = this.props;
        const { onDeleteComment } = this.props;
        const { commenterID } = this.props;
        const { checkUser } = this.props;

        const { handleCommentLike } = this.props;
        const { numberOfLikes } = this.props;
        const { likeOrDislike }=this.props;

        return (
            <div>
                <hr className="hrLine" />
                <br/>
                <div>{commenterID}: {comment}</div>
                <div style={invisible}>articleID: {articleID}</div>
                <div style={invisible}>commentID: {commentID}</div>
                <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={this.updateComment} value={commentID}>編輯</button>
                <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={() => onDeleteComment && onDeleteComment(commentID)}>刪除</button>
                <ArticleLike
                    articleID = {commentID}
                    numberOfLikes = {numberOfLikes}
                    likeOrDislike = {!!likeOrDislike}
                    onHandleLike = {() => handleCommentLike && handleCommentLike(numberOfLikes, likeOrDislike)}
                />
            </div>
        );
    }
    // 判斷渲染一般畫面或編輯畫面
    render(){
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

export default ArticleComment;

const invisible = {
    'display': 'none'
};