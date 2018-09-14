import React from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from './Navigation';
import '../stylesheets/postArticle.css';

class PostArticle extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articleTitle: "",
            articleContent: "",
            articleCategory: "未分類",
            redirectToIndex: false,
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.redirectToIndex = this.redirectToIndex.bind(this);
    }

    // 取得輸入值
    handleChange(event) {
        switch (event.target.name){
            case '標題':{
                this.setState({articleTitle: event.target.value});
                break;
            }
            case '內文':{
                this.setState({articleContent: event.target.value});
                break;
            }
            case '文章類別':{
                this.setState({articleCategory: event.target.value});
                break;
            }
            default: {
                break;
            }
        }
    }
    // 提交表單後重新導向至 index 頁
    redirectToIndex() {
        this.setState({redirectToIndex: true});
    }
    // 提交表單
    handleSubmit(event) {
        this.fetch();
        setTimeout(this.redirectToIndex, 700);
        event.preventDefault();
    }
    // 連接 API 並填入文章內容
    fetch() {
        let formData = new FormData();

        formData.append('authorID', this.state.currentUserID);
        formData.append('author', this.state.currentUser);
        formData.append('category', this.state.articleCategory);
        formData.append('content', this.state.articleContent);
        formData.append('title', this.state.articleTitle);
        formData.append('privacy', 'public');

        fetch('http://140.119.163.194:3000/add_article', {
            method: 'post',
            // 舊的 fetch 作法
            // headers: {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({authorID: this.state.currentToken,
            //                       title: this.state.articleTitle,
            //                       name: this.state.currentUser,
            //                       category: this.state.articleCategory,
            //                       content: this.state.articleContent})
            body: formData
        }).then(res=>res.json())
            .then(res => console.log(res));
    }

    render(){
        const { redirectToIndex } = this.state;
        if (redirectToIndex) {
            return <Redirect push to="/index" />;
        }

        return (
            <div>
                <Navigation />
                <form onSubmit={this.handleSubmit}>
                    <input className="inputField_title" type="text" name="標題" placeholder="標題" onChange={this.handleChange} />
                    <textarea className="inputField_content" name="內文" placeholder="內文" onChange={this.handleChange}></textarea>
                    <select className="selectCategory" name="文章類別" onChange={this.handleChange}>
                        <option value="未分類">分類</option>
                        <option value="創作">創作</option>
                        <option value="旅遊">旅遊</option>
                        <option value="生活">生活</option>
                        <option value="運動">運動</option>
                        <option value="娛樂">娛樂</option>
                    </select>
                    <input className="submit" type="submit" value="完成" />
                </form>
            </div>
        );
    }
}

export default PostArticle;