import React from 'react';
import "../../stylesheets/articleItem.css";
import "../../stylesheets/articleWhoLikes.css"

class ArticleWhoLikes extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
        };
    }

    render(){
        const { whoLikes } = this.props;

        return (
            <div>
                <div className="articleWhoLikesCard">按讚的人：{whoLikes}</div>
            </div>
        );
    }
}

export default ArticleWhoLikes;