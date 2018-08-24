import React from 'react';
import ArticleItem from './ArticleItem';
import Navigation from '../Navigation';
import { Redirect } from 'react-router-dom';

class Index extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articles: [],
            redirectToPost: false,
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken")
        };



        this.refetch = this.refetch.bind(this);





        this.fetch = this.fetch.bind(this);
        this.redirectToPost = this.redirectToPost.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.articleLike = this.articleLike.bind(this);
        this.commentLike = this.commentLike.bind(this);
    }


    // 下層元件函式


    // 共用

    // 重新抓資料並重新渲染畫面
    refetch(){
        setTimeout(this.fetch, 700);
    }


    // ArticleItem

    // 刪除文章
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
    // 更新文章
    updateArticle(articleID, newContent) {
        let formData = new FormData();
        formData.append('articleID', articleID);
        formData.append('content', newContent);

        fetch('http://140.119.163.194:3000/update_article', {
            method: 'put',
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
        // 🦄️
        setTimeout(this.fetch, 700);
    }


    // ArticleComment

    // 刪除留言
    deleteComment(commentID){
        fetch('http://140.119.163.194:3000/delete_comment', {
            method: 'put',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({commentID: commentID})
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
            });
        setTimeout(this.fetch, 700);
    }
    // 更新留言
    updateComment(commentID, newComment) {
        let formData = new FormData();
        formData.append('commentID', commentID);
        formData.append('content', newComment);

        fetch('http://140.119.163.194:3000/update_comment', {
            method: 'put',
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
        // 🦄️
        setTimeout(this.fetch, 700);
    }


    // AddArticleComment

    // 新增留言
    addComment(content, articleID, currentUser){
        let formData = new FormData();

        formData.append('content', content);
        formData.append('articleID', articleID);
        formData.append('commenterID', currentUser);

        fetch('http://140.119.163.194:3000/add_comment', {
            method: 'post',
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
        // 🦄️
        setTimeout(this.fetch, 700);
    }


    // articleLike

    // 文章按愛心或收回愛心
    articleLike(articleID, likeOrDislike){
        if (likeOrDislike == false){
            fetch('http://140.119.163.194:3000/likes_article', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({articleID: articleID,
                    likesPersonID: this.state.currentUser})
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
                    dislikesPersonID: this.state.currentUser})
            }).then(res=>res.json())
                .then(res => console.log(res));
            setTimeout(this.fetch, 500);
        }
    }
    // 留言按愛心或收回愛心
    commentLike(commentID, likeOrDislike){
        if (likeOrDislike == false){
            fetch('http://140.119.163.194:3000/likes_comment', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({commentID: commentID,
                    likesPersonID: this.state.currentUser})
            }).then(res=>res.json())
                .then(res => console.log(res));
            setTimeout(this.fetch, 500);
        }
        else {
            fetch('http://140.119.163.194:3000/dislikes_comment', {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({commentID: commentID,
                    dislikesPersonID: this.state.currentUser})
            }).then(res=>res.json())
                .then(res => console.log(res));
            setTimeout(this.fetch, 500);
        }
    }



    // 此元件函式


    // 重新導向至發文頁
    redirectToPost(){
        this.setState({redirectToPost: true});
    }

    // 抓資料並渲染畫面
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
                console.log('comment: ' + parsedJSON[0][1].listOfComment[0].content)
            })
            .catch(err => console.log(err));
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
            (<div key = {article[0]._id}>
                <ArticleItem
                    author = { article[0].author }
                    title = {article[0].title}
                    content = {article[0].listOfContent[article[0].listOfContent.length-1].content}
                    category = {article[0].category}
                    articleID = {article[0]._id}
                    numberOfLikes = {article[0].numberOfLikes}
                    likeOrDislike={ article[0].likes.filter( (like) => like==this.state.currentUser ).length }
                    whoLikes = { article[0].likes }
                    comments = { article }

                    onUpdateArticle = {this.updateArticle}
                    onDeleteArticle = {this.deleteArticle}
                    refetch = {this.refetch}
                    handleLike = {this.articleLike}
                    handleCommentLike = {this.commentLike}
                    deleteComment = {this.deleteComment}
                    updateComment = {this.updateComment}
                    addComment = {this.addComment}
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