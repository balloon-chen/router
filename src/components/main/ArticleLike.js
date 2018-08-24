import React from 'react';
import "../../stylesheets/articleItem.css"

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
            <div>
                <div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike"><span>{numberOfLikes}</span></div>
            </div>
        );
    }
    // 渲染已按愛心的畫面
    renderLikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        let likeOrDislike = true;

        return (
            <div>
                <div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike articleLike"><span>{numberOfLikes}</span></div>
            </div>
        );
    }
    // 判斷渲染已按愛心的畫面或未按愛心的畫面
    render(){
        return this.props.likeOrDislike ? this.renderLikeMode() : this.renderDislikeMode();
    }
}

export default ArticleLike;