import React from 'react';
import "../../stylesheets/articleItem.css";

import iconDislike from "../../images/dislike.svg";
import iconLike from "../../images/like.svg";
import iconCross from "../../images/iconCross.png";
import ArticleWhoLikes from "./ArticleWhoLikes";

class ArticleLike extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            invisible: 'invisible'
        };
        this.toggleWhoLikesInvisible = this.toggleWhoLikesInvisible.bind(this);
    }

    toggleWhoLikesInvisible(){
        if (this.state.invisible === 'invisible')
            this.setState({invisible: ''});
        else
            this.setState({invisible: 'invisible'});
    }

    // 渲染未按愛心的畫面
    renderDislikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        const { whoLikes } = this.props;
        const { invisible } = this.state;

        const whoLikesElements = whoLikes.map((whoLike) =>
            (<div key={whoLike}>
                <ArticleWhoLikes
                    whoLike = {whoLike}
                />
            </div>)
        );

        let likeOrDislike = false;

        return (
            <span className='likeGroup'>

                <img src={iconDislike} onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="navigationIconSmall" alt="iconComment"/>
                {/*<div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike navigationIcon"> </div>*/}
                <span className="numOfArticleLike" onClick={this.toggleWhoLikesInvisible}>{numberOfLikes}</span>


                <div className={"articleWhoLikesBackground"+invisible} onClick={this.toggleWhoLikesInvisible}> </div>
                {/*<div className={"articleWhoLikesCard "+invisible}>*/}
                    {/*按讚的人：{whoLikesElements}*/}
                {/*</div>*/}
                <div className={"articleWhoLikesCard "+invisible}>
                    <div className="flex justify-content">
                        <img src={iconLike} className="navigationIcon" alt="iconLike"/>
                        <span>喜歡</span>
                        <img src={iconCross} className="navigationIcon position-right" alt="iconCross" onClick={this.toggleWhoLikesInvisible}/>
                    </div>
                    <span>{whoLikesElements}</span>
                </div>
            </span>
        );
    }
    // 渲染已按愛心的畫面
    renderLikeMode(){
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        const { whoLikes } = this.props;
        const { invisible } = this.state;

        const whoLikesElements = whoLikes.map((whoLike) =>
            (<div key={whoLike}>
                <ArticleWhoLikes
                    whoLike = {whoLike}
                />
            </div>)
        );

        let likeOrDislike = true;

        return (
            <span className={'likeGroup'}>
                <img src={iconLike} onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="navigationIconSmall" alt="iconComment"/>
                {/*<div onClick={() => onHandleLike && onHandleLike(articleID, likeOrDislike)} className="articleDislike navigationIcon"> </div>*/}
                <span className="numOfArticleLike" onClick={this.toggleWhoLikesInvisible}>{numberOfLikes}</span>
                <div className={"articleWhoLikesBackground"+invisible} onClick={this.toggleWhoLikesInvisible}> </div>


                <div className={"articleWhoLikesCard "+invisible}>
                    <div className="flex justify-content">
                        <img src={iconLike} className="navigationIcon" alt="iconLike"/>
                        <span>喜歡</span>
                        <img src={iconCross} className="navigationIcon position-right" alt="iconCross" onClick={this.toggleWhoLikesInvisible}/>
                    </div>

                    <span>{whoLikesElements}</span>
                </div>


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