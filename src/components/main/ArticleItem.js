import React from 'react';
import "../../stylesheets/articleItem.css";
import ArticleLike from './ArticleLike';
import AddArticleComment from './AddArticleComment';
import ArticleComment from './ArticleComment';

import iconMenu from '../../images/iconMenu.svg';
import iconComment from '../../images/iconComment.svg';
import iconNotTag from '../../images/iconNotTag.svg';
import iconAlreadyTag from '../../images/iconAlreadyTag.svg';
import ArticleWhoLikes from "./ArticleWhoLikes";

class ArticleItem extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            articleID: '',
            newContent: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),

            // 啦啦啦
            numberOfLikesTemp: 0,
            likeOrDislike: this.props.likeOrDislike,

            invisible: 'invisible'
        };
        this.updateArticle = this.updateArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);


        //啦啦啦
        this.handleLikekkk = this.handleLikekkk.bind(this);
        this.commentLikeOrDislike = this.commentLikeOrDislike.bind(this);


        this.toggleCommentInvisible = this.toggleCommentInvisible.bind(this);
    }

    toggleCommentInvisible(){
        if (this.state.invisible === 'invisible')
            this.setState({invisible: ''});
        else
            this.setState({invisible: 'invisible'});
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
        this.props.handleLike(articleID, likeOrDislike);
        // setTimeout(this.setState({numberOfLikesTemp: -20}), 5000)
    }
    // 啦啦啦
    commentLikeOrDislike(commentID, likeOrDislike){
        this.props.handleCommentLike(commentID, likeOrDislike)
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
        const { avatarLink } = this.props;
        const { handleLike } = this.props;
        const { handleCommentLike } = this.props;



        // 啦啦啦
        const { numberOfLikes } = this.props;
        // const { likeOrDislike }=this.props;
        // const { numberOfLikes } = this.state;
        const { likeOrDislike }=this.state;






        const { checkUser } = this.props;

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

                    refetch = {this.props.refetch}

                    numberOfLikes = {comment.numberOfLikes}
                    likeOrDislike={ comment.likes.filter( (like) => like==this.state.currentUser ).length }
                    // handleCommentLike = {() => handleCommentLike && handleCommentLike(comment._id, comment.likes.filter( (like) => like==this.state.currentUser ).length)}
                    handleCommentLike = { this.commentLikeOrDislike }
                />
            </div>)
        });
        let numOfArticleComment = comments.slice(1).length;
        const { invisible } = this.state;

        return (
            <div>
                <div className="articleCard">

                    <div className={'articleImage'}>
                        <span className="articleCategory">{category}</span>
                        <span className="articleTitle">{title}</span>
                    </div>

                    <div className={"aaa"}>
                        <div className="userPhoto" style={{'backgroundImage': 'url('+avatarLink+')'}}> </div>
                        <div>
                            <div className="articleAuthor">{author}</div>
                            <div className={"articleDateAndPosition"}>5月21日 9:31 · 台南市</div>
                        </div>
                        <img src={iconMenu} className={"navigationIcon bbb"} alt="iconMenu"/>
                    </div>

                    <p className="articleContent">{content}</p>
                    <div>
                        <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={this.updateArticle} value={articleID}>編輯</button>
                        <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={() => onDeleteArticle && onDeleteArticle(articleID)}>刪除</button>
                    </div>

                    <div>
                        <img src={iconComment} className="navigationIcon" alt="iconComment" onClick={this.toggleCommentInvisible} />
                        <span className="numOfArticleComment">{numOfArticleComment}</span>
                        <ArticleLike
                            numberOfLikes = {numberOfLikes + this.state.numberOfLikesTemp}
                            // 啦啦啦
                            likeOrDislike = {!!likeOrDislike}
                            articleID = {articleID}
                            // 啦啦啦
                            // onHandleLike = {() => handleLike && handleLike(articleID, likeOrDislike)}
                            onHandleLike = {() => this.handleLikekkk && this.handleLikekkk(articleID, likeOrDislike)}
                        />
                        <img src={iconNotTag} className={"navigationIcon eee"} alt="iconNotTag"/>
                    </div>

                    <ArticleWhoLikes
                        whoLikes = {whoLikes}
                    />

                    <div className={invisible}>
                        <hr className="hrLine" />

                        <AddArticleComment
                            articleID = {articleID}
                            onAddComment = {this.props.addComment}
                            refetch = {this.props.refetch}
                        />

                        <div>{commentElements}</div>
                    </div>


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