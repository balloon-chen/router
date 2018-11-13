import React from 'react';

class PostTestList extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articleContent: this.props.articleContent || '你沒打字唷！',
            fontSize: this.props.fontSize || ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.focus = this.focus.bind(this);
        this.fontSize = this.fontSize.bind(this);
    }

    focus(){
        const { id } = this.props;
        this.props.focus(id);
    }

    fontSize(){
        const { fontSize } = this.state;
        if (fontSize === '')
            this.setState({fontSize: 'h1'});
        else if (fontSize === 'h1')
            this.setState({fontSize: 'h2'});
        else
            this.setState({fontSize: ''});
    }

    // 取得輸入值
    handleChange(event) {
        this.setState({articleContent: event.target.value});
        setTimeout(this.handleKeyDown, 100);
    }

    handleKeyDown(){
        const { id } = this.props;
        const { onUpdate } = this.props;
        const { articleContent } = this.state;
        onUpdate && onUpdate(id, articleContent);
    }

    render(){
        const { id } = this.props;
        const { fontSize } = this.state;
        const { articleContent } = this.state;

        return (
            <div>
                <span>{id}：</span>
                <input
                    className = {fontSize}
                    value = {articleContent}
                    onChange = {this.handleChange}
                    onFocus={this.focus}
                />
            </div>
        );
    }
}

export default PostTestList;