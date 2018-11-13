import React from 'react';
import '../../stylesheets/postArticleList.css';

import separationLineA from '../../images/editor/separationLineA.svg';
import separationLineB from '../../images/editor/separationLineB.svg';
import separationLineC from '../../images/editor/separationLineC.svg';
import separationLineD from '../../images/editor/separationLineD.svg';
import quoteA from '../../images/editor/quoteA.svg';
import quoteB from '../../images/editor/quoteB.svg';

class PostArticleList extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articleContent: this.props.articleContent || '',
            fontSize: this.props.fontSize || '',
            quoteAInvisible: this.props.quoteAInvisible || 'quoteAInvisible',
            quoteBInvisible: this.props.quoteBInvisible || 'quoteBInvisible',
            quote: this.props.quote || '',
            separationLineAInvisible: this.props.separationLineAInvisible || 'separationLineAInvisible',
            separationLineBInvisible: this.props.separationLineBInvisible || 'separationLineBInvisible',
            separationLineCInvisible: this.props.separationLineCInvisible || 'separationLineCInvisible',
            separationLineDInvisible: this.props.separationLineDInvisible || 'separationLineDInvisible',
            inputInvisible: this.props.inputInvisible || '',
            paragraphList: this.props.paragraphList || '',
            paragraphListNumber: this.props.paragraphListNumber || '',
            paragraphListDotInvisible: this.props.paragraphListDotInvisible || 'paragraphListDotInvisible',
            paragraphListNumberInvisible: this.props.paragraphListNumberInvisible || 'paragraphListDotInvisible',
        };
        this.focus = this.focus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.mouseLocation = this.mouseLocation.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.backSpace = this.backSpace.bind(this);
        this.enter = this.enter.bind(this);



        this.textInput = React.createRef();
        this.setMouseLocation = this.setMouseLocation.bind(this);
        this.xxx = this.xxx.bind(this);
    }




    // 設定游標位置
    // setMouseLocation(event){
    //     if (event.target.setSelectionRange) {
    //         // IE Support
    //         event.target.focus();
    //         event.target.setSelectionRange(3, 3);
    //     }
    //     else if (event.target.createTextRange) {
    //         // Firefox support
    //         let range = event.target.createTextRange();
    //         range.collapse(true);
    //         range.moveEnd('character', 3);
    //         range.moveStart('character', 3);
    //         range.select();
    //     }
    // }

    xxx(){
        const { id } = this.props;
        const { setMouseLocation } = this.props;
        setMouseLocation(id);
    }

    setMouseLocation(location){
        const { id } = this.props;
        alert(id)
        if (this.textInput.current.setSelectionRange) {
            // IE Support
            this.textInput.current.focus();
            this.textInput.current.setSelectionRange(location, location);
        }
        else if (this.textInput.current.createTextRange) {
            // Firefox support
            let range = this.textInput.current.createTextRange();
            range.collapse(true);
            range.moveEnd('character', 3);
            range.moveStart('character', 3);
            range.select();
        }
    }




    focus(){
        const { id } = this.props;
        this.props.focus(id);
    }

    // 取得輸入值
    handleChange(event) {
        this.setState({articleContent: event.target.value});
        setTimeout(this.updateContent, 100);
    }

    // 上傳當前物件 id 及新的內文至上層元件
    updateContent(){
        const { id } = this.props;
        const { onUpdate } = this.props;
        const { articleContent } = this.state;
        onUpdate && onUpdate(id, articleContent);
    }

    // 取得當前游標在輸入框中的位置
    mouseLocation(event) {
        event.preventDefault();
        if (event.target.createRange) {
            //for IE 🦄️ 好像有問題
            let r = document.selection.createRange().duplicate();
            r.moveEnd('character', event.value.length);
            console.log('cursor location for IE: ' + event.value.lastIndexOf(r.text))
        }
        else {
            //for Firefox
            console.log('cursor location for Firefox: ' + event.target.selectionStart);
        }
    }

    handleKeyDown(event){
        switch (event.keyCode){
            case 8:
                this.backSpace(event);
                break;
            case 13:
                this.enter(event);
                break;
            default:
                break;
        }
    }

    backSpace(event){
        const { merge } = this.props;
        const { id } = this.props;
        if (event.target.selectionStart === 0){
            merge(event.target.value, id);
        }
    }

    enter(event){
        const { fragment } = this.props;
        const { id } = this.props;
        const { fontSize } = this.state;
        const { quoteAInvisible } = this.state;
        const { quoteBInvisible } = this.state;
        const { quote } = this.state;
        const { paragraphList } = this.state;
        const { paragraphListDotInvisible } = this.state;
        const { paragraphListNumberInvisible } = this.state;
        let style = {
            fontSize: fontSize,
            quoteAInvisible: quoteAInvisible,
            quoteBInvisible: quoteBInvisible,
            quote: quote,
            paragraphList: paragraphList,
            paragraphListDotInvisible: paragraphListDotInvisible,
            paragraphListNumberInvisible: paragraphListNumberInvisible
        };
        let contentOld = event.target.value.substring(0, event.target.selectionStart);
        let contentNew = event.target.value.substring(event.target.selectionStart);
        fragment(contentOld, contentNew, style, id);
    }

    render(){
        const { id } = this.props;
        const { fontSize } = this.state;
        const { quoteAInvisible } = this.state;
        const { quoteBInvisible } = this.state;
        const { quote } = this.state;
        const { separationLineAInvisible } = this.state;
        const { separationLineBInvisible } = this.state;
        const { separationLineCInvisible } = this.state;
        const { separationLineDInvisible } = this.state;
        const { inputInvisible } = this.state;
        const { paragraphList } = this.state;
        const { paragraphListNumber } = this.state;
        const { paragraphListDotInvisible } = this.state;
        const { paragraphListNumberInvisible } = this.state;
        const { articleContent } = this.state;

        return (
            <div className='postArticleList'>


                {/*<button onClick={this.xxx}>點我</button>*/}


                <div className={separationLineAInvisible + ' flex justify-content'}><img src={separationLineA} alt="separationLine01" className='postArticleList_separationLine' /></div>
                <div className={separationLineBInvisible + ' flex justify-content'}><img src={separationLineB} alt="separationLine02" className='postArticleList_separationLine' /></div>
                <div className={separationLineCInvisible + ' flex justify-content'}><img src={separationLineC} alt="separationLine03" className='postArticleList_separationLine' /></div>
                <div className={separationLineDInvisible + ' flex justify-content'}><img src={separationLineD} alt="separationLine04" className='postArticleList_separationLine' /></div>

                {/*<div className={inputInvisible + ' flex justify-content-flex-start'}>*/}
                    {/*/!*<span>{id}：</span>*!/*/}
                    {/*/!*quoteA*!/*/}
                    {/*<div className={'quoteADiv'+' '+quoteAInvisible}><img src={quoteA} alt="quoteA" className='postArticleList_quote postArticleList_quoteA' /></div>*/}
                    {/*/!*quoteB*!/*/}
                    {/*<div className={'quoteBDiv'+' '+quoteBInvisible}><img src={quoteB} alt="quoteB" className='postArticleList_quote postArticleList_quoteB' /></div>*/}

                    {/*/!*paragraphListDot*!/*/}
                    {/*<div className={'paragraphListDotDiv'+' '+paragraphListDotInvisible}>・</div>*/}
                    {/*/!*paragraphListNumber*!/*/}
                    {/*<div className={'paragraphListNumberDiv'+' '+paragraphListNumberInvisible}>{paragraphListNumber}. </div>*/}

                    {/*<div className = {'postArticleList_inputField postArticleList_inputField_bottom '+fontSize+' '+quote+' '+paragraphList}>{articleContent}</div>*/}
                {/*</div>*/}

                <div className={inputInvisible + ' flex justify-content-flex-start'}>
                    {/*<span>{id}：</span>*/}
                    {/*quoteA*/}
                    <div className={'quoteADiv'+' '+quoteAInvisible}><img src={quoteA} alt="quoteA" className='postArticleList_quote postArticleList_quoteA' /></div>
                    {/*quoteB*/}
                    <div className={'quoteBDiv'+' '+quoteBInvisible}><img src={quoteB} alt="quoteB" className='postArticleList_quote postArticleList_quoteB' /></div>

                    {/*paragraphListDot*/}
                    <div className={'paragraphListDotDiv'+' '+paragraphListDotInvisible}>・</div>
                    {/*paragraphListNumber*/}
                    <div className={'paragraphListNumberDiv'+' '+paragraphListNumberInvisible}>{paragraphListNumber}. </div>

                    <div className = {'postArticleList_inputField postArticleList_inputField_bottom '+fontSize+' '+quote+' '+paragraphList}>
                        {articleContent}
                    <textarea
                        // rows={1}
                        className = {'postArticleList_inputField postArticleList_inputField_top '+fontSize+' '+quote+' '+paragraphList}
                        value = {articleContent}
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
        );
    }
}

export default PostArticleList;

// javascript獲取以及設定游標位置
// https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/246032/