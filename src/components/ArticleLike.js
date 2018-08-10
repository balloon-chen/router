import React from 'react';
import "../stylesheets/articleItem.css"

class ArticleLike extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {};
    }

    renderDislikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { handleLike } = this.props;
        let likeOrDislike = false;

        return (
            <div>
                <div onClick={() => handleLike && handleLike(articleID, likeOrDislike)} className="articleDislike"><span>{numberOfLikes}</span></div>
            </div>
        );
    }
    renderLikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { handleLike } = this.props;
        let likeOrDislike = true;

        return (
            <div>
                <div onClick={() => handleLike && handleLike(articleID, likeOrDislike)} className="articleDislike articleLike"><span>{numberOfLikes}</span></div>
            </div>
        );
    }
    render(){
        return this.props.likeOrDislike ? this.renderLikeMode() : this.renderDislikeMode();
    }
}

export default ArticleLike;