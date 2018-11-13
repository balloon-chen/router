import React from 'react';

class PostArticleInput extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articleContent: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.focus = this.focus.bind(this);
        this.backSpace = this.backSpace.bind(this);
    }

    focus(){
        this.props.focus('current');
    }

    // 取得輸入值
    handleChange(event) {
        this.setState({articleContent: event.target.value});
    }

    handleKeyDown(event){
        const { onSubmit } = this.props;
        switch (event.keyCode){
            case 13:
                let contentOld = event.target.value.substring(0, event.target.selectionStart);
                let contentNew = event.target.value.substring(event.target.selectionStart);
                onSubmit && onSubmit(contentOld);
                this.setState({ articleContent: contentNew });
                break;
            case 8:
                this.backSpace(event);
                break;
            default:
                break;
        }
    }

    backSpace(event){
        const { merge } = this.props;
        if (event.target.selectionStart === 0){
            merge(event.target.value, 'current');
            this.setState({articleContent: ''});
        }
    }

    render(){
        const { fontSize } = this.props;
        const { quoteAInvisible } = this.props;
        const { quoteBInvisible } = this.props;
        const { quote } = this.props;
        const { paragraphList } = this.props;
        const { placeholder_display } = this.props;

        return (
            <div className="inputField_content_placeholder ">
                {/*<p className={fontSize}>當前內文：{this.state.articleContent}</p>*/}
                {/*quoteA*/}
                <div className={'quoteADiv'+' '+quoteAInvisible}>quoteA↓</div>
                {/*quoteB*/}
                <div className={'quoteBDiv'+' '+quoteBInvisible}>quoteB↓</div>
                <input
                    autoFocus
                    type="text"
                    className={'inputField_content '+fontSize+' '+quote+' '+paragraphList}
                    name="內文"
                    placeholder={placeholder_display}
                    value={this.state.articleContent}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onFocus={this.focus}
                />
            </div>
        );
    }
}

export default PostArticleInput;