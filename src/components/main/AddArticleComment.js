import React from 'react';
import '../../stylesheets/articleComment.css';
import '../../stylesheets/addArticleComment.css';

import userPhotoDefault from '../../images/userPhotoDefault.svg';

class AddArticleComment extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            content: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // 取得輸入值
    handleChange(event) {
        this.setState({ content: event.target.value });
    }
    // 提交表單
    handleSubmit(event) {
        this.props.onAddComment(this.state.currentUserID, this.state.content, this.props.articleID, this.state.currentUser);
        this.setState({ content: '' });
        // 🦄️
        this.props.refetch();
        event.preventDefault();
    }

    render(){
        const { content } = this.state;
        const { currentUserAvatarLink } = this.props;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="AddArticleCommentBackground">
                        {/*<img src={userPhotoDefault} alt="userPhotoDefault" className='userPhoto_AddArticleComment' />*/}
                        <div className="userPhoto_AddArticleComment" style={{'backgroundImage': 'url('+currentUserAvatarLink+')'}}> </div>
                        <input className="articleComment_inputField_AddArticleComment" type="text" name="留言" placeholder="留言......" onChange={this.handleChange} value={content} />
                        <input className="invisible" type="submit" value="發佈" />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddArticleComment;