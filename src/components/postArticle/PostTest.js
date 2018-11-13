import React from 'react';
import update from 'immutability-helper';
import '../../stylesheets/postArticle.css';
import '../../stylesheets/postEditor.css';
import PostTextarea from './PostTextarea'
import PostTestList from './PostTestList'

class PostTest extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            fontSize: '',
            currentID: '',
            articleContents: [
                {
                    id: 0,
                    articleContent: "12345",
                    fontSize: 'h1'
                },
                {
                    id: 1,
                    articleContent: "67890",
                    fontSize: ''
                },
                {
                    id: 2,
                    articleContent: "apple",
                    fontSize: 'h2'
                },
                {
                    id: 3,
                    articleContent: "banana",
                    fontSize: ''
                }
            ]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.fontSize = this.fontSize.bind(this);
        this.fetch = this.fetch.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.focus = this.focus.bind(this);
        this.fontSizeUpdate = this.fontSizeUpdate.bind(this);
    }

    focus(id){
        console.log(id);
        this.setState({currentID: id})
    }

    fontSize(){
        const { articleContents } = this.state;
        const articleContentsIndex = this.state.currentID;
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            if (target.fontSize === '') {
                let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: 'h1'}} );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            else if (target.fontSize === 'h1') {
                let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: 'h2'}} );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            else {
                let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: ''}} );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            setTimeout(this.fontSizeUpdate, 1);
        }
        else {
            const { fontSize } = this.state;
            if (fontSize === '')
                this.setState({fontSize: 'h1'});
            else if (fontSize === 'h1')
                this.setState({fontSize: 'h2'});
            else
                this.setState({fontSize: ''});
        }
    }

    fontSizeUpdate(){
        this.setState({articleContents: []});
        this.setState({articleContents: articleContentsUpdate});
    }

    onSubmit(content) {
        const { articleContents } = this.state;
        const { fontSize } = this.state;
        this.setState({
            articleContents: [...articleContents, {
                id: articleContents[articleContents.length-1].id + 1,
                articleContent: content,
                fontSize: fontSize
            }]
        })
    }

    onUpdate(id, content) {
        const { articleContents } = this.state;
        const target = articleContents.find( (articleContent) => articleContent.id === id );
        if (target)
            target.articleContent = content;
    }

    // 送出資料
    fetch(){
        console.log(this.state.articleContents);
    }

    render(){
        const { fontSize } = this.state;
        const { articleContents } = this.state;
        const articleContentsElements = articleContents.map((articleContent) =>
            (<div key={articleContent.id}>
                <PostTestList
                    id = {articleContent.id}
                    fontSize = {articleContent.fontSize}
                    articleContent = {articleContent.articleContent}
                    onUpdate = {this.onUpdate}
                    focus = {this.focus}
                />
            </div>)
        );

        return (
            <div style={{'height':'100vh'}}>

                {articleContentsElements}

                <PostTextarea
                    fontSize = {fontSize}
                    onSubmit = {this.onSubmit}
                    focus = {this.focus}
                />

                <button onClick={this.fontSize} style={temp}>字體大小</button>

                <button onClick={this.fetch} style={temp2}>送出</button>

            </div>
        );
    }
}

export default PostTest;

const temp = {
    'position': 'absolute',
    'top': '80%',
    'border': '1px solid grey',
    'borderRadius': '20px'
};
const temp2 = {
    'position': 'absolute',
    'top': '85%',
    'border': '1px solid grey',
    'borderRadius': '20px'
};

let articleContentsUpdate = [];