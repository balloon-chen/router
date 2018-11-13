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
        const { whoLike } = this.props;

        return (
            <div>
                <div className="flex">
                    <div className="userPhoto"> </div>
                    <span>{whoLike}</span>
                    <span className="position-right button">加好友</span>
                </div>
            </div>
        );
    }
}

export default ArticleWhoLikes;