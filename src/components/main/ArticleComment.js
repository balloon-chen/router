import React from 'react';
import "../../stylesheets/articleItem.css";
import ArticleLike from "./ArticleLike";

import userPhotoDefault from '../../images/userPhotoDefault.svg';

class ArticleComment extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            commentID: '',
            newComment: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),



            // 啦啦啦
            numberOfLikesTemp: 0,
            likeOrDislike: this.props.likeOrDislike,
        };
        this.updateComment = this.updateComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);



        //啦啦啦
        this.handleLikekkk = this.handleLikekkk.bind(this);
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




    //啦啦啦
    handleLikekkk(articleID, likeOrDislike) {
        // alert(likeOrDislike);
        if (likeOrDislike == 0) {
            if (this.state.numberOfLikesTemp == -1)
                this.setState({numberOfLikesTemp: 0});
            else
                this.setState({numberOfLikesTemp: 1});
        }
        else {
            if (this.state.numberOfLikesTemp == 1)
                this.setState({numberOfLikesTemp: 0});
            else
                this.setState({numberOfLikesTemp: -1});
        }
        this.setState({likeOrDislike: !(this.state.likeOrDislike)});
        // this.setState({likeOrDislike: !(this.state.likeOrDislike)});
        this.props.handleCommentLike(articleID, likeOrDislike);
        // this.props.handleCommentLike();
        // setTimeout(this.setState({numberOfLikesTemp: -20}), 5000)
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



        // 啦啦啦
        const { numberOfLikes } = this.props;
        // const { likeOrDislike }=this.props;
        const { likeOrDislike }=this.state;

        return (
            <div>
                <div className="AddArticleCommentBackground">
                    <div className="articleCommentBox1">
                        <div className="articleCommentBox2">
                            <img src={userPhotoDefault} alt="userPhotoDefault" className='userPhoto_AddArticleComment' />
                        </div>
                        <div className="articleCommentBox2">
                            <div className="articleCommentCommenterID">{commenterID}</div>
                            <div className="articleCommentComment">{comment}</div>
                            <div className="articleCommentLike">
                                <ArticleLike
                                    // 啦啦啦
                                    articleID = {commentID}
                                    numberOfLikes = {numberOfLikes + this.state.numberOfLikesTemp}
                                    likeOrDislike = {!!likeOrDislike}
                                    // onHandleLike = {() => handleCommentLike && handleCommentLike(numberOfLikes, likeOrDislike)}
                                    onHandleLike = {() => this.handleLikekkk && this.handleLikekkk(commentID, likeOrDislike)}
                                />
                            </div>
                        </div>
                    </div>
                    <div style={invisible}>articleID: {articleID}</div>
                    <div style={invisible}>commentID: {commentID}</div>
                    <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={this.updateComment} value={commentID}>編輯</button>
                    <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={() => onDeleteComment && onDeleteComment(commentID)}>刪除</button>
                </div>
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