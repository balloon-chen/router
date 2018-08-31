import React from 'react';
import '../../stylesheets/articleComment.css'

class AddArticleComment extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken")
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
        this.props.onAddComment(this.state.content, this.props.articleID, this.state.currentUser);
        // 🦄️
        this.props.refetch();
        event.preventDefault();
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input className="articleComment_inputField" type="text" name="留言" placeholder="留言" onChange={this.handleChange} />
                    <input className="articleComment_submit" type="submit" value="發佈" />
                </form>
            </div>
        );
    }
}

export default AddArticleComment;