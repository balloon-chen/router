import React from 'react';
import "../stylesheets/articleItem.css";

class ArticleComment extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            editable: false,
            refresh: '',
            articleID: '',
            newContent: '',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken")
        };
        // this.updateArticle = this.updateArticle.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        // this.fetch = this.fetch.bind(this);
        // this.refetch = this.refetch.bind(this);

        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.renderViewMode = this.renderViewMode.bind(this);
    }

    // updateArticle(event){
    //     this.setState({ articleID: event.target.value });
    //     this.toggleEditMode();
    // }
    // handleChange(event) {
    //     this.setState({ newContent: event.target.value });
    // }
    // handleSubmit(event) {
    //     this.fetch();
    //     this.toggleEditMode();
    //     this.refetch();
    //     event.preventDefault();
    // }
    // fetch() {
    //     fetch('http://140.119.163.194:3000/update_article', {
    //         method: 'put',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({articleID: this.state.articleID,
    //             content: this.state.newContent})
    //     }).then(res=>res.json())
    //         .then(res => console.log(res));
    // }
    // refetch(){
    //     const {refetch} = this.props;
    //     setTimeout(refetch, 500);
    // }

    // onAddComment(content, articleID){
    //     fetch('http://140.119.163.194:3000/add_comment', {
    //         method: 'post',
    //         headers: {
    //             'Accept': 'application/json, text/plain, */*',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({articleID: articleID,
    //             content: content})
    //     }).then(res=>res.json())
    //         .then(res => console.log(res));
    // }
    toggleEditMode(){
        this.setState({ editable: !this.state.editable });
    }

    renderEditMode(){
        const { articleID } = this.props;

        return (
            <div>
                編輯
            </div>
        );
    }
    renderViewMode(){
        const { articleID } = this.props;
        const { comment } = this.props;
        const { commentID } = this.props;
        const { onDeleteComment } = this.props;
        const { commenterID } = this.props;
        const { checkUser } = this.props;

        return (
            <div>
                <hr className="hrLine" />
                <br/>
                <div>{commenterID}: {comment}</div>
                <div style={invisible}>articleID: {articleID}</div>
                <div style={invisible}>commentID: {commentID}</div>
                <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={this.toggleEditMode}>編輯</button>
                <button className={'updateDeleteSubmit'+checkUser} type='submit' onClick={() => onDeleteComment && onDeleteComment(commentID)}>刪除</button>
            </div>
        );
    }
    render(){
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }
}

export default ArticleComment;

const invisible = {
    'display': 'none'
}