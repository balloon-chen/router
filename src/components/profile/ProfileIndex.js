import React from 'react';
import Profile from './Profile';

class ProfileIndex extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            // apiURL: 'http://140.119.163.194:3000/',
            apiURL: 'http://localhost:3000/',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            articles: {}
        };
        this.fetchPersonalArticleData = this.fetchPersonalArticleData.bind(this)
    }

    // 取得個人資料
    fetchPersonalArticleData(){
        // fetch('http://140.119.163.194:3000/search_article')
        fetch(this.state.apiURL+'search_article')
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

    componentDidMount(){
        this.fetchPersonalArticleData();
    }

    render(){
        const { articles } = this.state;

        const articleElements = articles.map((article) =>
            (<div key = {article[0]._id}>
                <Profile
                    numberOfPersonalArticles = { article[0].author.filter( (author) => author==this.state.currentUser ).length }
                />
            </div>)
        );

        return (
            <div>
                <div>{articleElements}</div>
            </div>
        )
    }
}

export default ProfileIndex;