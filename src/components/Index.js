import React from 'react';
import ArticleItem from './ArticleItem';
import { Redirect } from 'react-router-dom';

class Index extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articles: [],
            redirectToPost: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.redirectToPost = this.redirectToPost.bind(this);
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
                console.log(parsedJSON[1][0])
                console.log('authorID: ' + parsedJSON[parsedJSON.length-1][0].authorID)
                console.log('userName: ' + parsedJSON[parsedJSON.length-1][0].author)
                console.log('articleTitle: ' + parsedJSON[parsedJSON.length-1][0].title)
                console.log('articleContent: ' + parsedJSON[parsedJSON.length-1][0].listOfContent[0].content)
                console.log('articleCategory :' + parsedJSON[parsedJSON.length-1][0].category)
            })
            .catch(err => console.log(err))
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
                />
            </div>)
        );

        return (
            <div>
                <div>{articleElements}</div>
                <button className="newArticle" onClick={this.redirectToPost}>+</button>
            </div>
        );
    }
}

export default Index;