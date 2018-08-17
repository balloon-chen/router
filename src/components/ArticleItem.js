import React from 'react';
import "../stylesheets/articleItem.css";
import ArticleLike from './ArticleLike';
import AddArticleComment from './AddArticleComment';
import ArticleComment from './ArticleComment';

class ArticleItem extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            refresh: '',
            articleID: '',
            newContent: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken")
        };
        this.updateArticle = this.updateArticle.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);
        this.refetch = this.refetch.bind(this);
    }

    updateArticle(event){
        this.setState({ articleID: event.target.value });
        this.toggleEditMode();
    }
    toggleEditMode(){
        this.setState({ editable: !this.state.editable });
    }
    deleteArticle(event){
        fetch('http://140.119.163.194:3000/delete_article', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({articleID: event.target.value})
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
            });
    }
    handleChange(event) {
        this.setState({ newContent: event.target.value });
    }
    handleSubmit(event) {
        this.fetch();
        this.toggleEditMode();
        this.refetch();
        event.preventDefault();
    }
    fetch() {
        let formData = new FormData();
        alert(this.state.articleID+'\n'+this.state.newContent);
        formData.append('articleID', this.state.articleID);
        formData.append('content', this.state.newContent);


        fetch('http://140.119.163.194:3000/update_article', {
            method: 'put',
            // headers: {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({articleID: this.state.articleID,
            //     content: this.state.newContent})
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
    }
    refetch(){
        const {refetch} = this.props;
        setTimeout(refetch, 700);
    }

    onAddComment(content, articleID, currentUser){
        let formData = new FormData();
        // alert(content);
        // alert(articleID);
        // alert(currentUser);
        formData.append('content', content);
        formData.append('articleID', articleID);
        formData.append('commenterID', currentUser);


        fetch('http://140.119.163.194:3000/add_comment', {
            method: 'post',
            // headers: {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({commenterID: currentUser,
            //     articleID: articleID,
            //     content: content})
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
        this.refetch();
    }

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
    renderViewMode(){
        const { author } = this.props;
        const { title } = this.props;
        const { content } = this.props;
        const { category } = this.props;
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onDelete } = this.props;
        const { onHandleLike } = this.props;
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
                    <button className="updateDeleteSubmit" type='submit' onClick={() => onDelete && onDelete(articleID)}>刪除</button>
                    <ArticleLike
                        numberOfLikes = {numberOfLikes}
                        likeOrDislike = {!!likeOrDislike}
                        articleID = {articleID}
                        handleLike = {() => onHandleLike && onHandleLike(articleID, likeOrDislike)}
                    />
                    <div style={invisible}>按讚的人：{whoLikes}</div>
                    <br/>
                    <hr className="hrLine" />
                    <br/>
                    <AddArticleComment
                        articleID = {articleID}
                        onAddComment = {this.onAddComment}
                        refetch = {this.refetch}
                    />
                    <div>{commentElements}</div>
                </div>
            </div>
        );
    }
    render(){
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

export default ArticleItem;

const invisible = {
    'display': 'none'
}