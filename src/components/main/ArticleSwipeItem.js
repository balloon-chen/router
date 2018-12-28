import React from 'react';
import ArticleItem from './ArticleItem';
import ProfileArticle from "../profile/ProfileArticle";
import Gesture from 'rc-gesture';

class ArticleSwipeItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            articleState: 'centerArticle',
            index: 0,
            buttonLeftOpacity: this.props.articleGroup.sameAuthor.length === 0 ? 'invisible' : '',
            buttonRightOpacity: this.props.articleGroup.sameCategory.length === 0 ? 'invisible' : '',
            sameCategory: this.props.articleGroup.sameCategory,
            sameAuthor: this.props.articleGroup.sameAuthor,
            centerArticle: this.props.articleGroup.centerArticle,
            sameCategoryLength: this.props.articleGroup.sameCategory.length,
            sameAuthorLength: this.props.articleGroup.sameAuthor.length,
            swipeDirection: ''
        };
        this.deleteArticle = this.deleteArticle.bind(this);
        this.articleLike = this.articleLike.bind(this);
        this.commentLike = this.commentLike.bind(this);
        this.swipe = this.swipe.bind(this);
        this.swipe2 = this.swipe2.bind(this);
        this.tangentToDegree = this.tangentToDegree.bind(this);
    }

    deleteArticle(articleID){
        this.props.onDeleteArticle(articleID);
    }
    articleLike(articleID, likeOrDislike){
        this.props.handleLike(articleID, likeOrDislike);
    }
    commentLike(commentID, articleID, likeOrDislike){
        this.props.handleCommentLike(commentID, articleID, likeOrDislike);
    }

    swipe(event){
        const { index } = this.state;
        const { articleState } = this.state;
        const { sameCategoryLength } = this.state;
        const { sameAuthorLength } = this.state;

        switch (event.target.name){
            case 'swipe_left':{
                this.setState({buttonRightOpacity: ''});
                if (articleState === 'centerArticle' && sameAuthorLength > 0){
                    if (sameAuthorLength === 1)
                        this.setState({buttonLeftOpacity: 'invisible'});
                    this.setState({articleState: 'sameAuthor'});
                    this.setState({index: 0});
                }
                else if (articleState === 'sameCategory') {
                    if (index === 0) {
                        if (sameAuthorLength === 0)
                            this.setState({buttonLeftOpacity: 'invisible'});
                        this.setState({articleState: 'centerArticle'});
                    }
                    else {
                        this.setState({index: index - 1});
                    }
                }
                else {
                    if ((sameAuthorLength-index) > 1){
                        if ((sameAuthorLength-1) === (index+1))
                            this.setState({buttonLeftOpacity: 'invisible'});
                        this.setState({index: index + 1});
                    }
                }
                break;
            }
            case 'swipe_right':{
                this.setState({buttonLeftOpacity: ''});
                if (articleState === 'centerArticle' && sameCategoryLength > 0){
                    if (sameCategoryLength === 1)
                        this.setState({buttonRightOpacity: 'invisible'});
                    this.setState({articleState: 'sameCategory'});
                    this.setState({index: 0});
                }
                else if (articleState === 'sameAuthor') {
                    if (index === 0) {
                        if (sameCategoryLength === 0)
                            this.setState({buttonRightOpacity: 'invisible'});
                        this.setState({articleState: 'centerArticle'});
                    }
                    else {
                        this.setState({index: index - 1});
                    }
                }
                else {
                    if ((sameCategoryLength-index) > 1){
                        if ((sameCategoryLength-1) === (index+1))
                            this.setState({buttonRightOpacity: 'invisible'});
                        this.setState({index: index + 1});
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
    }
    // react js swipe gesture source:
    // https://github.com/react-component/gesture
    swipe2(event){
        const { index } = this.state;
        const { articleState } = this.state;
        const { sameCategoryLength } = this.state;
        const { sameAuthorLength } = this.state;

        switch (event){
            case 'swipe_left':{
                this.setState({buttonRightOpacity: ''});
                this.setState({swipeDirection: 'articleCardSwipeLeft'});
                if (articleState === 'centerArticle' && sameAuthorLength > 0){
                    if (sameAuthorLength === 1)
                        this.setState({buttonLeftOpacity: 'invisible'});
                    this.setState({articleState: 'sameAuthor'});
                    this.setState({index: 0});
                }
                else if (articleState === 'sameCategory') {
                    if (index === 0) {
                        if (sameAuthorLength === 0)
                            this.setState({buttonLeftOpacity: 'invisible'});
                        this.setState({articleState: 'centerArticle'});
                    }
                    else {
                        this.setState({index: index - 1});
                    }
                }
                else {
                    if ((sameAuthorLength-index) > 1){
                        if ((sameAuthorLength-1) === (index+1))
                            this.setState({buttonLeftOpacity: 'invisible'});
                        this.setState({index: index + 1});
                    }
                }
                break;
            }
            case 'swipe_right':{
                this.setState({buttonLeftOpacity: ''});
                this.setState({swipeDirection: 'articleCardSwipeRight'});
                if (articleState === 'centerArticle' && sameCategoryLength > 0){
                    if (sameCategoryLength === 1)
                        this.setState({buttonRightOpacity: 'invisible'});
                    this.setState({articleState: 'sameCategory'});
                    this.setState({index: 0});
                }
                else if (articleState === 'sameAuthor') {
                    if (index === 0) {
                        if (sameCategoryLength === 0)
                            this.setState({buttonRightOpacity: 'invisible'});
                        this.setState({articleState: 'centerArticle'});
                    }
                    else {
                        this.setState({index: index - 1});
                    }
                }
                else {
                    if ((sameCategoryLength-index) > 1){
                        if ((sameCategoryLength-1) === (index+1))
                            this.setState({buttonRightOpacity: 'invisible'});
                        this.setState({index: index + 1});
                    }
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    tangentToDegree(tangent){
        return Math.round(Math.atan(tangent) / (Math.PI / 180));
    }

    componentDidMount(){
        const { length } = this.state;

        if (length === 1){
            this.setState({buttonRightOpacity: 'invisible'});
        }
    }

    // 渲染個人檔案畫面
    renderProfileMode() {
        const {currentUserAvatarLink} = this.props;
        const {articlesInProfile} = this.props;
        // const {articleGroup} = this.props;
        // const articleElements = articleGroup.map((article) =>
        //     (<div key={articleGroup._id}>
        //         <ArticleItem
        //             author={article.author}
        //             title={article.title}
        //             content={article.listOfContent[article.listOfContent.length - 1].content}
        //             category={article.category}
        //             articleID={article._id}
        //             numberOfLikes={article.likes.length}
        //             likeOrDislike={article.likes.filter((like) => like == this.state.currentUser).length}
        //             whoLikes={article.likes}
        //             comments={article.comment}
        //             checkUser={article.author != this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={article.avatarLink}
        //             authorID={article.authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {article.listOfContent[article.listOfContent.length - 1].mediaLink === undefined ? '' : article.listOfContent[article.listOfContent.length - 1].mediaLink[0].link}/>
        //     </div>)
        // );
        // const { index } = this.state;
        // const { buttonLeftOpacity } = this.state;
        // const { buttonRightOpacity } = this.state;
        // const articleElements =
        //     (<div key={articleGroup[index]._id}>
        //         <ArticleItem
        //             author={articleGroup[index].author}
        //             title={articleGroup[index].title}
        //             content={articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].content}
        //             category={articleGroup[index].category}
        //             articleID={articleGroup[index]._id}
        //             numberOfLikes={articleGroup[index].likes.length}
        //             likeOrDislike={articleGroup[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
        //             whoLikes={articleGroup[index].likes}
        //             comments={articleGroup[index].comment}
        //             checkUser={articleGroup[index].author !== this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={articleGroup[index].avatarLink}
        //             authorID={articleGroup[index].authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink === undefined ? '' : articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink[0].link}
        //             time = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].time}
        //         />
        //
        //     </div>);
        // const centerArticleElements =
        //     (<div key={articleGroup[index]._id}>
        //         <ProfileArticle
        //             author={articleGroup[index].author}
        //             title={articleGroup[index].title}
        //             content={articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].content}
        //             category={articleGroup[index].category}
        //             articleID={articleGroup[index]._id}
        //             numberOfLikes={articleGroup[index].likes.length}
        //             likeOrDislike={articleGroup[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
        //             whoLikes={articleGroup[index].likes}
        //             comments={articleGroup[index].comment}
        //             checkUser={articleGroup[index].author !== this.state.currentUser ? ' invisible' : ''}
        //             avatarLink={articleGroup[index].avatarLink}
        //             authorID={articleGroup[index].authorID}
        //
        //             refetch={this.props.refetch}
        //
        //             onUpdateArticle={this.props.updateArticle}
        //             onDeleteArticle={this.deleteArticle}
        //             handleLike={this.articleLike}
        //             handleCommentLike={this.commentLike}
        //             deleteComment={this.props.deleteComment}
        //             updateComment={this.props.updateComment}
        //             addComment={this.props.addComment}
        //
        //             currentUserAvatarLink={currentUserAvatarLink}
        //
        //             articlesInProfile={articlesInProfile}
        //
        //             // 臨時亂做的圖便上傳
        //             // mediaLink = {article.listOfContent[article.listOfContent.length - 1]}
        //             mediaLink = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink === undefined ? '' : articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].mediaLink[0].link}
        //             time = {articleGroup[index].listOfContent[articleGroup[index].listOfContent.length - 1].time}
        //         />
        //
        //     </div>);
        const { centerArticle } = this.state;
        const centerArticleElements =
            (<div key={centerArticle._id}>
                <ProfileArticle
                    author={centerArticle.author}
                    title={centerArticle.title}
                    content={centerArticle.listOfContent[centerArticle.listOfContent.length - 1].content}
                    category={centerArticle.category}
                    articleID={centerArticle._id}
                    numberOfLikes={centerArticle.likes.length}
                    likeOrDislike={centerArticle.likes.filter((like) => like.userID === this.state.currentUserID).length}
                    whoLikes={centerArticle.likes}
                    comments={centerArticle.comment}
                    checkUser={centerArticle.author !== this.state.currentUser ? ' invisible' : ''}
                    avatarLink={centerArticle.avatarLink[centerArticle.avatarLink.length-1]}
                    authorID={centerArticle.authorID}

                    refetch={this.props.refetch}

                    onUpdateArticle={this.props.updateArticle}
                    onDeleteArticle={this.deleteArticle}
                    handleLike={this.articleLike}
                    handleCommentLike={this.commentLike}
                    deleteComment={this.props.deleteComment}
                    updateComment={this.props.updateComment}
                    addComment={this.props.addComment}

                    currentUserAvatarLink={currentUserAvatarLink}

                    articlesInProfile={articlesInProfile}

                    mediaLink = {centerArticle.listOfContent[centerArticle.listOfContent.length - 1].mediaLink === undefined ? '' : centerArticle.listOfContent[centerArticle.listOfContent.length - 1].mediaLink[0].link}
                    time = {centerArticle.listOfContent[centerArticle.listOfContent.length - 1].time}
                />
            </div>);

        return (
            <div>
                {centerArticleElements}
            </div>
        );
    }

    // 渲染動態牆畫面
    renderIndexMode() {
        const {currentUserAvatarLink} = this.props;
        const {articlesInProfile} = this.props;

        const { buttonLeftOpacity } = this.state;
        const { buttonRightOpacity } = this.state;
        const { centerArticle } = this.state;

        // 預設：中間文章
        const centerArticleElements =
            (<div key={centerArticle._id}>
                <ArticleItem
                    author={centerArticle.author}
                    title={centerArticle.title}
                    content={centerArticle.listOfContent[centerArticle.listOfContent.length - 1].content}
                    category={centerArticle.category}
                    articleID={centerArticle._id}
                    numberOfLikes={centerArticle.likes.length}
                    likeOrDislike={centerArticle.likes.filter((like) => like.userID === this.state.currentUserID).length}
                    whoLikes={centerArticle.likes}
                    comments={centerArticle.comment}
                    checkUser={centerArticle.author !== this.state.currentUser ? ' invisible' : ''}
                    avatarLink={centerArticle.avatarLink[centerArticle.avatarLink.length-1]}
                    authorID={centerArticle.authorID}

                    refetch={this.props.refetch}

                    onUpdateArticle={this.props.updateArticle}
                    onDeleteArticle={this.deleteArticle}
                    handleLike={this.articleLike}
                    handleCommentLike={this.commentLike}
                    deleteComment={this.props.deleteComment}
                    updateComment={this.props.updateComment}
                    addComment={this.props.addComment}

                    currentUserAvatarLink={currentUserAvatarLink}

                    articlesInProfile={articlesInProfile}

                    mediaLink = {centerArticle.listOfContent[centerArticle.listOfContent.length - 1].mediaLink === undefined ? '' : centerArticle.listOfContent[centerArticle.listOfContent.length - 1].mediaLink[0].link}
                    time = {centerArticle.listOfContent[centerArticle.listOfContent.length - 1].time}

                    swipeDirection = {this.state.swipeDirection}
                />
            </div>);

        const { index } = this.state;

        // 右滑：同分類文章
        const { sameCategory } = this.state;
        let sameCategoryElements = '';
        if (sameCategory[index] !== undefined){
            sameCategoryElements =
                (<div key={sameCategory[index]._id}>
                    <ArticleItem
                        author={sameCategory[index].author}
                        title={sameCategory[index].title}
                        content={sameCategory[index].listOfContent[sameCategory[index].listOfContent.length - 1].content}
                        category={sameCategory[index].category}
                        articleID={sameCategory[index]._id}
                        numberOfLikes={sameCategory[index].likes.length}
                        likeOrDislike={sameCategory[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
                        whoLikes={sameCategory[index].likes}
                        comments={sameCategory[index].comment}
                        checkUser={sameCategory[index].author !== this.state.currentUser ? ' invisible' : ''}
                        avatarLink={sameCategory[index].avatarLink[sameCategory[index].avatarLink.length-1]}
                        authorID={sameCategory[index].authorID}

                        refetch={this.props.refetch}

                        onUpdateArticle={this.props.updateArticle}
                        onDeleteArticle={this.deleteArticle}
                        handleLike={this.articleLike}
                        handleCommentLike={this.commentLike}
                        deleteComment={this.props.deleteComment}
                        updateComment={this.props.updateComment}
                        addComment={this.props.addComment}

                        currentUserAvatarLink={currentUserAvatarLink}

                        articlesInProfile={articlesInProfile}

                        mediaLink = {sameCategory[index].listOfContent[sameCategory[index].listOfContent.length - 1].mediaLink === undefined ? '' : sameCategory[index].listOfContent[sameCategory[index].listOfContent.length - 1].mediaLink[0].link}
                        time = {sameCategory[index].listOfContent[sameCategory[index].listOfContent.length - 1].time}

                        swipeDirection = {this.state.swipeDirection}
                    />

                </div>);
        }

        // 左滑：同作者文章
        const { sameAuthor } = this.state;
        let sameAuthorElements = '';
        if (sameAuthor[index] !== undefined){
            sameAuthorElements =
                (<div key={sameAuthor[index]._id}>
                    <ArticleItem
                        author={sameAuthor[index].author}
                        title={sameAuthor[index].title}
                        content={sameAuthor[index].listOfContent[sameAuthor[index].listOfContent.length - 1].content}
                        category={sameAuthor[index].category}
                        articleID={sameAuthor[index]._id}
                        numberOfLikes={sameAuthor[index].likes.length}
                        likeOrDislike={sameAuthor[index].likes.filter((like) => like.userID === this.state.currentUserID).length}
                        whoLikes={sameAuthor[index].likes}
                        comments={sameAuthor[index].comment}
                        checkUser={sameAuthor[index].author !== this.state.currentUser ? ' invisible' : ''}
                        avatarLink={sameAuthor[index].avatarLink[sameAuthor[index].avatarLink.length-1]}
                        authorID={sameAuthor[index].authorID}

                        refetch={this.props.refetch}

                        onUpdateArticle={this.props.updateArticle}
                        onDeleteArticle={this.deleteArticle}
                        handleLike={this.articleLike}
                        handleCommentLike={this.commentLike}
                        deleteComment={this.props.deleteComment}
                        updateComment={this.props.updateComment}
                        addComment={this.props.addComment}

                        currentUserAvatarLink={currentUserAvatarLink}

                        articlesInProfile={articlesInProfile}

                        mediaLink = {sameAuthor[index].listOfContent[sameAuthor[index].listOfContent.length - 1].mediaLink === undefined ? '' : sameAuthor[index].listOfContent[sameAuthor[index].listOfContent.length - 1].mediaLink[0].link}
                        time = {sameAuthor[index].listOfContent[sameAuthor[index].listOfContent.length - 1].time}

                        swipeDirection = {this.state.swipeDirection}
                    />

                </div>);
        }

        const { articleState } = this.state;
        let elements = '';
        if (articleState === 'sameCategory'){
            elements = sameCategoryElements;
        }
        else if (articleState === 'sameAuthor'){
            elements = sameAuthorElements;
        }
        else {
            elements = centerArticleElements;
        }

        return (
            <div>
                <Gesture
                    onSwipe={(gestureStatus) => {
                        if (gestureStatus.moveStatus !== undefined){
                            let degree = this.tangentToDegree(Math.abs(gestureStatus.moveStatus.y) / Math.abs(gestureStatus.moveStatus.x));
                            console.log('滑動角度：'+degree+'度');
                            if (degree <= 45){
                                if (gestureStatus.moveStatus.x < 0){
                                    if (this.state.buttonRightOpacity !== 'invisible')
                                        this.swipe2('swipe_right');
                                }
                                else if (gestureStatus.moveStatus.x === 0) {
                                    // Do nothing
                                }
                                else {
                                    if (this.state.buttonLeftOpacity !== 'invisible')
                                        this.swipe2('swipe_left');
                                }
                            }
                        }
                        console.log(gestureStatus);
                    }}
                >
                    {elements}
                </Gesture>
                <div style={{marginTop: '-20px', marginLeft: '8%'}}>
                    <button name='swipe_left' className={buttonLeftOpacity + ' swipeButton'} onClick={this.swipe}>左一篇</button>
                    <button name='swipe_right' className={buttonRightOpacity + ' swipeButton'} onClick={this.swipe}>右一篇</button>
                </div>
            </div>
        );
    }

    render() {
        return this.props.articlesInProfile ? this.renderProfileMode() : this.renderIndexMode();
    }
}

export default ArticleSwipeItem;