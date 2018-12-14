import React from 'react';
import "../../stylesheets/articleItem.css";
import ArticleLike from './ArticleLike';
import AddArticleComment from './AddArticleComment';
import ArticleComment from './ArticleComment';
import { Redirect } from 'react-router-dom';

import iconMenu from '../../images/iconMenu.svg';
import iconComment from '../../images/iconComment.svg';
import iconNotTag from '../../images/iconNotTag.svg';
import iconAlreadyTag from '../../images/iconAlreadyTag.svg';
import ArticleWhoLikes from "./ArticleWhoLikes";

import separationLineA from '../../images/editor/separationLineA.svg';
import separationLineB from '../../images/editor/separationLineB.svg';
import separationLineC from '../../images/editor/separationLineC.svg';
import separationLineD from '../../images/editor/separationLineD.svg';
import quoteA from '../../images/editor/quoteA.svg';
import quoteB from '../../images/editor/quoteB.svg';

class ArticleItem extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            articleID: '',
            newContent: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),

            // 啦啦啦
            numberOfLikesTemp: 0,
            likeOrDislike: this.props.likeOrDislike,

            invisible: 'invisible',
            redirectToProfile: '',

            redirectToPost: false,

            articlesInProfile: this.props.articlesInProfile,
            articlesInProfileDisplay: 'invisible'
        };
        this.updateArticle = this.updateArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);


        //啦啦啦
        this.handleLikekkk = this.handleLikekkk.bind(this);
        this.commentLikeOrDislike = this.commentLikeOrDislike.bind(this);


        this.toggleCommentInvisible = this.toggleCommentInvisible.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.timeConverter = this.timeConverter.bind(this);
    }

    toggleCommentInvisible(){
        if (this.state.invisible === 'invisible')
            this.setState({invisible: ''});
        else
            this.setState({invisible: 'invisible'});
    }

    // 一般畫面點擊編輯時取得文章 ID
    updateArticle(event){
        // this.setState({ articleID: event.target.value });
        // this.toggleEditMode();
        // 🦄
        // this.setState({redirectToPost: true})
        // 🦄
        localStorage.setItem("articleContents", this.props.content);
        localStorage.setItem("articleID", this.props.articleID);
        localStorage.setItem("articleTitle", this.props.title);
        localStorage.setItem("articleCategory", this.props.category);
        localStorage.setItem("myImg", this.props.mediaLink.toString());
        window.location.assign('http://140.119.163.194:3001/post');
    }
    // 編輯畫面取得輸入值
    handleChange(event) {
        this.setState({ newContent: event.target.value });
    }
    // 編輯畫面提交表單
    handleSubmit(event) {
        this.props.onUpdateArticle(this.state.articleID, this.state.newContent);
        // 🦄️
        this.props.refetch();
        this.toggleEditMode();
        event.preventDefault();
    }
    // 切換一般畫面或編輯畫面
    toggleEditMode(){
        this.setState({ editable: !this.state.editable });
    }




    //啦啦啦
    handleLikekkk(articleID, likeOrDislike) {
        // alert(likeOrDislike);
        if (likeOrDislike == 0) {
            if (this.state.numberOfLikesTemp == -1)
                this.setState({numberOfLikesTemp: 0});
            else
                this.setState({numberOfLikesTemp: 1});
        }
        else {
            if (this.state.numberOfLikesTemp == 1)
                this.setState({numberOfLikesTemp: 0});
            else
                this.setState({numberOfLikesTemp: -1});
        }
        this.setState({likeOrDislike: !(this.state.likeOrDislike)});
        // this.setState({likeOrDislike: !(this.state.likeOrDislike)});
        this.props.handleLike(articleID, likeOrDislike);
        // setTimeout(this.setState({numberOfLikesTemp: -20}), 5000)
    }
    // 啦啦啦
    commentLikeOrDislike(commentID, articleID, likeOrDislike){
        this.props.handleCommentLike(commentID, articleID, likeOrDislike);
    }

    redirectToProfile(event){
        switch (event.target.name){
            case 'author':{
                localStorage.setItem("whichUserID", event.target.value);
                // this.setState({redirectToProfile: true});
                // 🦄
                window.location.assign('http://140.119.163.194:3001/profile');
                break;
            }
            default: {
                break;
            }
        }
    }


    componentDidMount(){
        if (this.state.articlesInProfile){
            let id = localStorage.getItem("whichUserID") ? localStorage.getItem("whichUserID") : this.state.currentUserID;
            if (this.props.authorID === id){
                this.setState({articlesInProfileDisplay: ''});
            }
            else {
                this.setState({articlesInProfileDisplay: 'invisible'});
            }
        }
        else {
            this.setState({articlesInProfileDisplay: ''});
        }
    }

    timeConverter(UNIX_timestamp){
        let a = new Date(UNIX_timestamp * 1000);
        let months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        // let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        let time = month + date + '日 ' + hour + ':' + min;
        return time;
    }

    // 渲染編輯畫面
    renderEditMode(){
        const { author } = this.props;
        const { title } = this.props;
        const { content } = this.props;
        const { category } = this.props;
        const { articleID } = this.props;
        const { numberOfLikes } = this.props;
        const { onHandleLike } = this.props;
        const { likeOrDislike }=this.props;
        let contentToObjects = JSON.parse(content);
        const contentToObjectsElements = contentToObjects.map( (contentToObject) => {
            let quoteAInvisible = contentToObject.quoteAInvisible || 'quoteAInvisible';
            let quoteBInvisible = contentToObject.quoteBInvisible || 'quoteBInvisible';
            let separationLineAInvisible = contentToObject.separationLineAInvisible || 'separationLineAInvisible';
            let separationLineBInvisible = contentToObject.separationLineBInvisible || 'separationLineBInvisible';
            let separationLineCInvisible = contentToObject.separationLineCInvisible || 'separationLineCInvisible';
            let separationLineDInvisible = contentToObject.separationLineDInvisible || 'separationLineDInvisible';
            let paragraphListDotInvisible = contentToObject.paragraphListDotInvisible || 'paragraphListDotInvisible';
            let paragraphListNumberInvisible = contentToObject.paragraphListNumberInvisible || 'paragraphListDotInvisible';
            return (
                <div key={contentToObject.id}>

                    <div className={separationLineAInvisible + ' flex justify-content'}><img src={separationLineA} alt="separationLine01" className='postArticleList_separationLine' /></div>
                    <div className={separationLineBInvisible + ' flex justify-content'}><img src={separationLineB} alt="separationLine02" className='postArticleList_separationLine' /></div>
                    <div className={separationLineCInvisible + ' flex justify-content'}><img src={separationLineC} alt="separationLine03" className='postArticleList_separationLine' /></div>
                    <div className={separationLineDInvisible + ' flex justify-content'}><img src={separationLineD} alt="separationLine04" className='postArticleList_separationLine' /></div>

                    <div className={contentToObject.inputInvisible + ' flex justify-content-flex-start'}>

                        {/*quoteA*/}
                        <div className={'quoteADiv'+' '+quoteAInvisible}><img src={quoteA} alt="quoteA" className='postArticleList_quote postArticleList_quoteA' style={{'marginLeft':'-14px'}} /></div>
                        {/*quoteB*/}
                        <div className={'quoteBDiv'+' '+quoteBInvisible}><img src={quoteB} alt="quoteB" className='postArticleList_quote postArticleList_quoteB' /></div>

                        {/*paragraphListDot*/}
                        <div className={'paragraphListDotDiv'+' '+paragraphListDotInvisible}>・</div>
                        {/*paragraphListNumber*/}
                        <div className={'paragraphListNumberDiv'+' '+paragraphListNumberInvisible}>{contentToObject.paragraphListNumber}. </div>

                        <div className = {'postArticleList_inputField postArticleList_inputField_bottom '+contentToObject.fontSize+' '+contentToObject.quote+' '+contentToObject.paragraphList}>
                            {contentToObject.articleContent}
                            <textarea
                                // rows={1}
                                className = {'postArticleList_inputField postArticleList_inputField_top '+contentToObject.fontSize+' '+contentToObject.quote+' '+contentToObject.paragraphList}
                                value = {contentToObject.articleContent}
                                ref={this.textInput}
                                onChange = {this.handleChange}
                                onFocus={this.focus}
                                onClick={this.mouseLocation}
                                onKeyUp={this.mouseLocation}
                                onKeyDown={this.handleKeyDown}
                            />
                        </div>
                    </div>


                </div>
            )
        } );
        const { avatarLink } = this.props;
        const { authorID } = this.props;

        return (
            <div className="articleCard">
                {/*<form onSubmit={this.handleSubmit}>*/}
                {/*<span className="articleCategory">{category}</span>*/}
                {/*<span className="articleTitle">{title}</span>*/}
                {/*<br/>*/}
                {/*<hr className="hrLine" />*/}
                {/*<br/>*/}
                {/*<div className="userPhoto"> </div>*/}
                {/*<span className="articleAuthor">{author}</span>*/}
                {/*<input className="articleContent" type="text" placeholder={content} onChange={this.handleChange} />*/}
                {/*<input className="updateDeleteSubmit" type="submit" value="確定" />*/}
                {/*</form>*/}


                <div className={'articleImage'}>
                    <span className="articleCategory">{category}</span>
                    <span className="articleTitle">{title}</span>
                </div>

                <div className={"aaa"}>
                    <button name="author" onClick={this.redirectToProfile} value={authorID}>
                        <div className="userPhoto" style={{'backgroundImage': 'url('+avatarLink+')'}} onClick={this.redirectToProfile}> </div>
                    </button>
                    <div>
                        <button name="author" onClick={this.redirectToProfile} value={authorID}>
                            <div className="articleAuthor">{author}</div>
                        </button>
                        <div className={"articleDateAndPosition"}>5月21日 9:31 · 台南市</div>
                    </div>
                    <img src={iconMenu} className={"navigationIcon bbb"} alt="iconMenu"/>
                </div>

                <div style={{'width':'100%', 'height':'10px'}}> </div>
                <div>{contentToObjectsElements}</div>


            </div>
        );
    }
    // 渲染一般畫面
    renderViewMode(){
        const { author } = this.props;
        const { title } = this.props;
        const { articleID } = this.props;
        const { content } = this.props;
        const { category } = this.props;
        let contentToObjects = JSON.parse(content);


        const { redirectToPost } = this.state;
        if (redirectToPost) {
            localStorage.setItem("articleContents", content);
            localStorage.setItem("articleID", articleID);
            localStorage.setItem("articleTitle", title);
            localStorage.setItem("articleCategory", category);
            return <Redirect push to="/post" />;
        }


        const contentToObjectsElements = contentToObjects.map( (contentToObject) => {
            let quoteAInvisible = contentToObject.quoteAInvisible || 'quoteAInvisible';
            let quoteBInvisible = contentToObject.quoteBInvisible || 'quoteBInvisible';
            let separationLineAInvisible = contentToObject.separationLineAInvisible || 'separationLineAInvisible';
            let separationLineBInvisible = contentToObject.separationLineBInvisible || 'separationLineBInvisible';
            let separationLineCInvisible = contentToObject.separationLineCInvisible || 'separationLineCInvisible';
            let separationLineDInvisible = contentToObject.separationLineDInvisible || 'separationLineDInvisible';
            let paragraphListDotInvisible = contentToObject.paragraphListDotInvisible || 'paragraphListDotInvisible';
            let paragraphListNumberInvisible = contentToObject.paragraphListNumberInvisible || 'paragraphListDotInvisible';
            return (
                <div key={contentToObject.id}>

                    <div className={separationLineAInvisible + ' flex justify-content'}><img src={separationLineA} alt="separationLine01" className='postArticleList_separationLine' /></div>
                    <div className={separationLineBInvisible + ' flex justify-content'}><img src={separationLineB} alt="separationLine02" className='postArticleList_separationLine' /></div>
                    <div className={separationLineCInvisible + ' flex justify-content'}><img src={separationLineC} alt="separationLine03" className='postArticleList_separationLine' /></div>
                    <div className={separationLineDInvisible + ' flex justify-content'}><img src={separationLineD} alt="separationLine04" className='postArticleList_separationLine' /></div>

                    <div className={contentToObject.inputInvisible + ' flex justify-content-flex-start'}>

                        {/*quoteA*/}
                        <div className={'quoteADiv'+' '+quoteAInvisible}><img src={quoteA} alt="quoteA" className='postArticleList_quote postArticleList_quoteA' style={{'marginLeft':'-14px'}} /></div>
                        {/*quoteB*/}
                        <div className={'quoteBDiv'+' '+quoteBInvisible}><img src={quoteB} alt="quoteB" className='postArticleList_quote postArticleList_quoteB' /></div>

                        {/*paragraphListDot*/}
                        <div className={'paragraphListDotDiv'+' '+paragraphListDotInvisible}>・</div>
                        {/*paragraphListNumber*/}
                        <div className={'paragraphListNumberDiv'+' '+paragraphListNumberInvisible}>{contentToObject.paragraphListNumber}. </div>

                        <div className = {'postArticleList_inputField postArticleList_inputField_bottom '+contentToObject.fontSize+' '+contentToObject.quote+' '+contentToObject.paragraphList}>
                            {contentToObject.articleContent}
                            {/*<textarea*/}
                            {/*// rows={1}*/}
                            {/*className = {'postArticleList_inputField postArticleList_inputField_top '+contentToObject.fontSize+' '+contentToObject.quote+' '+contentToObject.paragraphList}*/}
                            {/*value = {contentToObject.articleContent}*/}
                            {/*ref={this.textInput}*/}
                            {/*onChange = {this.handleChange}*/}
                            {/*onFocus={this.focus}*/}
                            {/*onClick={this.mouseLocation}*/}
                            {/*onKeyUp={this.mouseLocation}*/}
                            {/*onKeyDown={this.handleKeyDown}*/}
                            {/*/>*/}
                        </div>
                    </div>


                </div>
            )
        } );

        const { onDeleteArticle } = this.props;
        const { avatarLink } = this.props;
        const { handleLike } = this.props;
        const { handleCommentLike } = this.props;


        // 啦啦啦
        const { numberOfLikes } = this.props;
        // const { likeOrDislike }=this.props;
        // const { numberOfLikes } = this.state;
        const { likeOrDislike }=this.state;






        const { checkUser } = this.props;

        const { whoLikes } = this.props;

        const { comments } = this.props;
        // 🦄️
        if (comments[0] !== undefined) {
            // alert(comments[0]);
        }
        const commentElements = comments.map((comment) => {
            // alert(comment);
            if (comment !== null) {
                // alert(comment.listOfComment[comment.listOfComment.length-1].content);
                console.log(comment.listOfComment[0].content);
                return (<div key = {comment.id}>
                    <ArticleComment
                        commentID = {comment.id}
                        commenterID = {comment.commenterID}
                        // articleID = {comment.articleID}
                        articleID = {articleID}
                        comment = {comment.listOfComment[0].content}
                        checkUser = {comment.commenterID!==this.state.currentUserID ? ' invisible' : ''}
                        onDeleteComment={this.props.deleteComment}
                        onUpdateComment={this.props.updateComment}

                        refetch={this.props.refetch}

                        numberOfLikes = {comment.numberOfLikes}
                        likeOrDislike={ comment.likes.filter( (like) => like.userID === this.state.currentUserID ).length }
                        // handleCommentLike = {() => handleCommentLike && handleCommentLike(comment._id, comment.likes.filter( (like) => like==this.state.currentUser ).length)}
                        handleCommentLike={this.commentLikeOrDislike}
                        whoLikes = {comment.likes}

                        commenterName = {comment.commenterName}
                        commenter_avatarLink = {comment.commenter_avatarLink}
                    />
                </div>)
            }
        });
        let numOfArticleComment = comments.length;
        const { invisible } = this.state;
        const { redirectToProfile } = this.state;
        if (redirectToProfile) {
            return <Redirect push to="/profile" />;
        }
        const { authorID } = this.props;

        // 臨時亂做的圖便上傳
        let { mediaLink } = this.props;
        let mediaLinkFixed = ( mediaLink === '') ? "../../images/annihilation.jpg" : mediaLink;
        // alert(mediaLink)
        const { time } = this.props;
        const timeForm = this.timeConverter(time);

        return (
            <div className={this.state.articlesInProfileDisplay}>
                {/*臨時亂做的圖便上傳*/}
                {/*<p style={{wordBreak: 'break-all'}}>{mediaLinkFixed}</p>*/}
                <div className="articleCard">
                    {/*<div className={'articleImage'}> </div>*/}
                    {/*<div className={'articleImage'} style={{'backgroundImage': 'url('+mediaLinkFixed+')'}}> </div>*/}
                    {/*<div className={'articleImage'} style={{'backgroundImage': 'url('+mediaLinkFixed+')'}}>*/}
                    <div className={'articleImage'}>
                        <div className='test'>
                            <img src={mediaLinkFixed} alt="" className='test2'/>
                        </div>
                        <span className="articleCategory">{category}</span>
                        <span className="articleTitle">{title}</span>
                    </div>

                    <div className={"aaa"}>
                        <button name="author" onClick={this.redirectToProfile} value={authorID} className='buttonNoneStyle'>
                            <div className="userPhoto" style={{'backgroundImage': 'url('+avatarLink+')'}} onClick={this.redirectToProfile}> </div>
                        </button>
                        <div>
                            {/*<div className="articleAuthor"><input type="button" onClick={this.redirectToProfile} value={author}/>{author}</div>*/}
                            <button name="author" onClick={this.redirectToProfile} value={authorID}  className='buttonNoneStyle'>
                                <div className="articleAuthor">{author}</div>
                            </button>
                            <div className={"articleDateAndPosition"}>{timeForm} · 台北市</div>
                        </div>
                        <img src={iconMenu} className={"navigationIcon bbb nonfunctionalOpacity"} alt="iconMenu"/>
                    </div>

                    {/*<p className="articleContent">{content}</p>*/}
                    <div style={{'width':'100%', 'height':'10px'}}> </div>
                    <div>{contentToObjectsElements}</div>
                    {/*文章格式壞掉可用*/}
                    {/*<div>{content}</div>*/}
                    <div>
                        <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={this.updateArticle} value={articleID}>編輯</button>
                        <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={() => onDeleteArticle && onDeleteArticle(articleID)}>刪除</button>
                        {/*文章格式壞掉可用*/}
                        {/*<button className={'updateDeleteSubmit'} type='submit' onClick={() => onDeleteArticle && onDeleteArticle(articleID)}>刪除</button>*/}
                    </div>

                    <div>
                        <img src={iconComment} className="navigationIcon" alt="iconComment" onClick={this.toggleCommentInvisible} />
                        <span className="numOfArticleComment">{numOfArticleComment}</span>
                        {/*like 先拿掉*/}
                        <ArticleLike
                            numberOfLikes = {numberOfLikes + this.state.numberOfLikesTemp}
                            // 啦啦啦
                            likeOrDislike = {!!likeOrDislike}
                            articleID = {articleID}
                            // 啦啦啦
                            // onHandleLike = {() => handleLike && handleLike(articleID, likeOrDislike)}
                            onHandleLike = {() => this.handleLikekkk && this.handleLikekkk(articleID, likeOrDislike)}
                            whoLikes = {whoLikes}
                            abc = {likeOrDislike}
                        />
                        <img src={iconNotTag} className="navigationIcon eee nonfunctionalOpacity" alt="iconNotTag"/>
                    </div>

                    {/*<ArticleWhoLikes*/}
                    {/*whoLikes = {whoLikes}*/}
                    {/*/>*/}

                    <div className={invisible}>
                        <hr className="hrLine" />

                        <AddArticleComment
                            articleID = {articleID}
                            onAddComment = {this.props.addComment}
                            currentUserAvatarLink = {this.props.currentUserAvatarLink}
                            refetch = {this.props.refetch}
                        />

                        <div>{commentElements}</div>
                    </div>


                </div>
            </div>
        );
    }
    // 判斷渲染一般畫面或編輯畫面
    render(){
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

export default ArticleItem;