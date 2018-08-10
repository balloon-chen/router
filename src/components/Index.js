import React from 'react';
import ArticleItem from './ArticleItem';
import Navigation from './Navigation';
import { Redirect } from 'react-router-dom';

class Index extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articles: [],
            redirectToPost: false,
            likesPersonID: 'user07'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.redirectToPost = this.redirectToPost.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.like = this.like.bind(this);
    }

    redirectToPost(){
        this.setState({redirectToPost: true});
    }
    handleChange(event) {
        switch (event.target.placeholder){
            case '用戶名稱':{
                this.setState({userName: event.target.value});
                break;
            }
            case '電子郵件':{
                this.setState({userEmail: event.target.value});
                break;
            }
            case '密碼':{
                this.setState({userPassword: event.target.value});
                break;
            }
            default: {
                break;
            }
        }
    }
    handleSubmit(event) {
        alert(
            '用戶名稱：' + this.state.userName + '\n' +
            '電子郵件：' + this.state.userEmail + '\n' +
            '密碼：' + this.state.userPassword
        );
        this.fetch();
        event.preventDefault();
    }
    fetch() {
        fetch('http://140.119.163.194:3000/search_article')
            .then(response => response.json())
            .then(parsedJSON => {
                this.setState({articles: parsedJSON})
                console.log(parsedJSON)
                console.log(parsedJSON[1][0])
                console.log('authorID: ' + parsedJSON[0][0].authorID)
                console.log('userName: ' + parsedJSON[0][0].author)
                console.log('articleTitle: ' + parsedJSON[0][0].title)
                console.log('articleContent: ' + parsedJSON[0][0].listOfContent[0].content)
                console.log('articleCategory :' + parsedJSON[0][0].category)
                console.log('like :' + parsedJSON[0][0].likes)
            })
            .catch(err => console.log(err));
    }
    deleteArticle(articleID){
        fetch('http://140.119.163.194:3000/delete_article', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({articleID: articleID})
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
            });
        setTimeout(this.fetch, 500);
    }
    like(articleID, likeOrDislike){
        if (likeOrDislike == false){
            fetch('http://140.119.163.194:3000/likes_article', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({articleID: articleID,
                    likesPersonID: this.state.likesPersonID})
            }).then(res=>res.json())
                .then(res => console.log(res));
            setTimeout(this.fetch, 500);
        }
        else {
            fetch('http://140.119.163.194:3000/dislikes_article', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({articleID: articleID,
                    likesPersonID: this.state.likesPersonID})
            }).then(res=>res.json())
                .then(res => console.log(res));
            setTimeout(this.fetch, 500);
        }
    }

    componentDidMount() {
        this.fetch();
    }

    render(){
        const { articles } = this.state;
        const { redirectToPost } = this.state;

        if (redirectToPost) {
            return <Redirect push to="/post" />;
        }

        const articleElements = articles.map((article) =>
            (<div key={article[0]._id}>
                <ArticleItem
                    author = { article[0].author }
                    title = {article[0].title}
                    content = {article[0].listOfContent[article[0].listOfContent.length-1].content}
                    category = {article[0].category}
                    articleID = {article[0]._id}
                    numberOfLikes = {article[0].numberOfLikes}
                    likeOrDislike={ article[0].likes.filter( (like) => like==this.state.likesPersonID ).length }
                    onDelete = {this.deleteArticle}
                    refetch = {this.fetch}
                    onHandleLike = {this.like}
                    whoLikes = { article[0].likes }
                />
            </div>)
        );

        return (
            <div className="articleBackground">
                <Navigation />
                <div>{articleElements}</div>
                <div onClick={this.redirectToPost}>
                    <div className="newArticleButton"></div>
                </div>
            </div>
        );
    }
}

export default Index;