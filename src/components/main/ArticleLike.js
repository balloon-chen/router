import React from 'react';
import "../../stylesheets/articleItem.css";

import iconDislike from "../../images/dislike.svg";
import iconLike from "../../images/like.svg";

class ArticleLike extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    // 渲染未按愛心的畫面
    renderDislikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        let likeOrDislike = false;

        return (
            <span>
                <img src={iconDislike} onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="navigationIcon" alt="iconComment"/>
                {/*<div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike navigationIcon"> </div>*/}
                <span className="numOfArticleLike">{numberOfLikes}</span>
            </span>
        );
    }
    // 渲染已按愛心的畫面
    renderLikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        let likeOrDislike = true;

        return (
            <span>
                <img src={iconLike} onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="navigationIcon" alt="iconComment"/>
                {/*<div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike navigationIcon"> </div>*/}
                <span className="numOfArticleLike">{numberOfLikes}</span>
            </span>
        );
    }
    // 判斷渲染已按愛心的畫面或未按愛心的畫面
    render(){
        return this.props.likeOrDislike ? this.renderLikeMode() : this.renderDislikeMode();
    }
}

{/*<div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike navigationIcon articleLike"><span>{numberOfLikes}</span></div>*/}

export default ArticleLike;