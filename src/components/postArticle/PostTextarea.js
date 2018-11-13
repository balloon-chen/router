import React from 'react';

class PostTextarea extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articleContent: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.focus = this.focus.bind(this);
    }

    focus(){
        this.props.focus('current');
    }

    // 取得輸入值
    handleChange(event) {
        this.setState({articleContent: event.target.value});
    }

    handleKeyDown(e){
        const { onSubmit } = this.props;
        const { articleContent } = this.state;
        switch (e.keyCode){
            case 13:
                onSubmit && onSubmit(articleContent);
                this.setState({ articleContent: "" });
                break;
        }
    }

    render(){
        const { fontSize } = this.props;

        return (
            <div className="inputField_content_placeholder">
                <p className={fontSize}>當前內文：{this.state.articleContent}</p>
                <input
                    autoFocus
                    type="text"
                    className={'inputField_content '+fontSize}
                    name="內文"
                    placeholder="你想分享甚麼…"
                    value={this.state.articleContent}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.focus}
                />
            </div>
        );
    }
}

export default PostTextarea;