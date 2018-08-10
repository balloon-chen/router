import React from 'react';
import "../stylesheets/articleItem.css";
import ArticleLike from './ArticleLike';

class ArticleItem extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            refresh: '',
            articleID: '',
            newContent: ''
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
        fetch('http://140.119.163.194:3000/update_article', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({articleID: this.state.articleID,
                content: this.state.newContent})
        }).then(res=>res.json())
            .then(res => console.log(res));
    }
    refetch(){
        const {refetch} = this.props;
        setTimeout(refetch, 500);
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