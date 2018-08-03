import React from 'react';
import { Redirect } from 'react-router-dom';
import '../stylesheets/postArticle.css'

class PostArticle extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            authorID: "發文人的ID",
            userName: "test",
            articleTitle: "test",
            articleContent: "test123",
            articleCategory: "未分類",
            submit: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.setStateSubmit = this.setStateSubmit.bind(this);
    }

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
    setStateSubmit() {
        this.setState({submit: true});
    }
    handleSubmit(event) {
        // alert(
        //     '標題：' + this.state.articleTitle + '\n' +
        //     '內文：' + this.state.articleContent + '\n' +
        //     '文章類別：' + this.state.articleCategory
        // );
        this.fetch();
        setTimeout(this.setStateSubmit, 700);
        event.preventDefault();
    }
    fetch() {
        fetch('http://140.119.163.194:3000/add_article', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({authorID: this.state.authorID,
                                  title: this.state.articleTitle,
                                  name: this.state.userName,
                                  category: this.state.articleCategory,
                                  content: this.state.articleContent})
        }).then(res=>res.json())
            .then(res => console.log(res));
    }

    render(){
        const { submit } = this.state;
        if (submit) {
            return <Redirect push to="/index" />;
        }

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="inputField_title" type="text" name="標題" placeholder="標題" onChange={this.handleChange} />
                    <textarea className="inputField_content" name="內文" placeholder="內文" onChange={this.handleChange}></textarea>
                    <select className="selectCategory" name="文章類別" onChange={this.handleChange}>
                        <option value="未分類">未分類</option>
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