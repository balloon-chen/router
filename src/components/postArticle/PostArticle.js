import React from 'react';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import '../../stylesheets/postArticle.css';
import iconSocial from '../../images/iconSocial.png';
import PostArticleCategory from '../postArticle/PostArticleCategory';

import update from 'immutability-helper';
import '../../stylesheets/postArticle.css';
import '../../stylesheets/postEditor.css';
import PostArticleInput from './PostArticleInput';
import PostArticleList from './PostArticleList';

import fontSize_gray from '../../images/editor/fontSize_gray.svg';
import fontSize_black from '../../images/editor/fontSize_black.svg';
import quote_gray from '../../images/editor/quote_gray.svg';
import quote_half from '../../images/editor/quote_half.svg';
import quote_black from '../../images/editor/quote_black.svg';
import separationLine_gray from '../../images/editor/separationLine_gray.svg';
import separationLine_black from '../../images/editor/separationLine_black.svg';
import list_gray from '../../images/editor/list_gray.svg';
import list_dot from '../../images/editor/list_dot.svg';
import list_number from '../../images/editor/list_number.svg';
import tag_gray from '../../images/editor/tag_gray.svg';
import tag_black from '../../images/editor/tag_black.svg';
import otherOptions_gray from '../../images/editor/otherOptions_gray.svg';
import otherOptions_black from '../../images/editor/otherOptions_black.svg';
import otherOptions01 from '../../images/editor/otherOptions01.svg';
import otherOptions02 from '../../images/editor/otherOptions02.svg';
import otherOptions03 from '../../images/editor/otherOptions03.svg';
import otherOptions04 from '../../images/editor/otherOptions04.svg';
import otherOptions05 from '../../images/editor/otherOptions05.svg';
import otherOptions06 from '../../images/editor/otherOptions06.svg';
import separationLine01 from '../../images/editor/separationLine01.svg';
import separationLine02 from '../../images/editor/separationLine02.svg';
import separationLine03 from '../../images/editor/separationLine03.svg';
import separationLine04 from '../../images/editor/separationLine04.svg';

class PostArticle extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            articleTitle: localStorage.getItem("articleTitle") || "",
            articleContent: "",
            articleCategory: localStorage.getItem("articleCategory") || "",
            redirectToIndex: false,
            // apiURL: 'http://140.119.163.194:3000/',
            apiURL: 'http://140.119.163.194:3004/',
            currentUser: localStorage.getItem("currentUser"),
            currentToken: localStorage.getItem("currentToken"),
            currentUserID: localStorage.getItem("currentUserID"),
            nextStepColor: '#BFBFBF',
            nextStepPointerEvents: 'none',
            postArticle_step2_invisible: 'invisible',
            nextStepDisplay: '',
            shareDisplay: 'none',
            setCategoryDisplay: 'invisible',
            postArticleDisplay: '',
            fontSizeDisplay: 'none',
            separationLineDisplay: 'none',
            otherOptionsDisplay: 'none',

            fontSize: '',
            currentID: '',
            articleContents: JSON.parse(localStorage.getItem("articleContents")) || [
                {
                    id: 0,
                    articleContent: '',
                    fontSize: '',
                    quoteAInvisible: '',
                    quoteBInvisible: '',
                    quote: '',
                    paragraphList: ''
                },
                // {
                //     id: 1,
                //     articleContent: '1號物件喔喔喔',
                //     fontSize: '',
                //     quoteAInvisible: '',
                //     quoteBInvisible: '',
                //     quote: '',
                //     paragraphList: ''
                // },
                // {
                //     id: 2,
                //     articleContent: '2號物件喔喔喔',
                //     fontSize: '',
                //     quoteAInvisible: '',
                //     quoteBInvisible: '',
                //     quote: '',
                //     paragraphList: ''
                // },
                // {
                //     id: 3,
                //     articleContent: '3號物件喔喔喔',
                //     fontSize: '',
                //     quoteAInvisible: '',
                //     quoteBInvisible: '',
                //     quote: '',
                //     paragraphList: ''
                // },
                // {
                //     id: 4,
                //     articleContent: '4號物件喔喔喔',
                //     fontSize: '',
                //     quoteAInvisible: '',
                //     quoteBInvisible: '',
                //     quote: '',
                //     paragraphList: ''
                // },
            ],
            placeholder_display: '你想分享甚麼…',

            // 引用
            quoteAInvisible: 'quoteAInvisible',
            quoteBInvisible: 'quoteBInvisible',
            quote: '',

            // 清單
            paragraphListDotInvisible: 'paragraphListDotInvisible',
            paragraphListNumberInvisible: 'paragraphListNumberInvisible',
            paragraphList: '',

            // 按鈕顯示/隱藏切換
            fontSize_gray_invisible: '',
            fontSize_black_invisible: 'fontSize_black_invisible',
            quote_gray_invisible: '',
            quote_half_invisible: 'quote_half_invisible',
            quote_black_invisible: 'quote_black_invisible',
            separationLine_gray_invisible: '',
            separationLine_black_invisible: 'separationLine_black_invisible',
            list_gray_invisible: '',
            list_dot_invisible: 'list_dot_invisible',
            list_number_invisible: 'list_number_invisible',
            otherOptions_gray_invisible: '',
            otherOptions_black_invisible: 'otherOptions_black_invisible',

            articleID: localStorage.getItem('articleID') || false,

            // 臨時亂做的圖便上傳
            myImg: localStorage.getItem('myImg') || {},
            nonImg: '',
            hasImg: 'invisible',
            imgName: '',

            redirectToSignUpLoginTemplate: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetch = this.fetch.bind(this);
        this.redirectToIndex = this.redirectToIndex.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setCategoryDisplay = this.setCategoryDisplay.bind(this);
        this.postArticleDisplay = this.postArticleDisplay.bind(this);
        this.toggleFontSizeDisplay = this.toggleFontSizeDisplay.bind(this);
        this.toggleSeparationLineDisplay = this.toggleSeparationLineDisplay.bind(this);
        this.toggleOtherOptionsDisplay = this.toggleOtherOptionsDisplay.bind(this);

        // 設定游標位置
        this.setMouseLocation = this.setMouseLocation.bind(this);
        // 取得當前物件位置
        this.focus = this.focus.bind(this);
        // 建立一則文字物件
        this.onSubmit = this.onSubmit.bind(this);
        // 更新一則文字物件
        this.onUpdate = this.onUpdate.bind(this);
        // 清空預設文字
        this.placeholder_display = this.placeholder_display.bind(this);
        // 合併一則文字物件
        this.merge = this.merge.bind(this);
        // 分割一則文字物件
        this.fragment = this.fragment.bind(this);
        // 刪除一則文字物件
        this.onDelete = this.onDelete.bind(this);

        // 編輯器：大小
        this.fontSizeH1 = this.fontSizeH1.bind(this);
        this.fontSizeH2 = this.fontSizeH2.bind(this);
        this.fontSizeContent = this.fontSizeContent.bind(this);
        this.fontSizeAnnotation = this.fontSizeAnnotation.bind(this);

        // 編輯器：引用
        this.quote = this.quote.bind(this);

        // 編輯器：清單
        this.paragraphList = this.paragraphList.bind(this);

        // 編輯器：建立分隔線
        this.separationLineA = this.separationLineA.bind(this);
        this.separationLineB = this.separationLineB.bind(this);
        this.separationLineC = this.separationLineC.bind(this);
        this.separationLineD = this.separationLineD.bind(this);

        // 編輯器：總更新
        this.fontEditorUpdate = this.fontEditorUpdate.bind(this);




        this.PostArticleList = React.createRef();
        this.fetchConsole = this.fetchConsole.bind(this);
        this.fetchUpdate = this.fetchUpdate.bind(this);
    }

    toggleFontSizeDisplay(){
        if (this.state.fontSizeDisplay === 'none') {
            this.setState({fontSizeDisplay: ''});
            this.setState({separationLineDisplay: 'none'});
            this.setState({otherOptionsDisplay: 'none'});

            this.setState({fontSize_gray_invisible: 'fontSize_gray_invisible'});
            this.setState({fontSize_black_invisible: ''});
            this.setState({separationLine_gray_invisible: ''});
            this.setState({separationLine_black_invisible: 'separationLine_black_invisible'});
            this.setState({otherOptions_gray_invisible: ''});
            this.setState({otherOptions_black_invisible: 'otherOptions_black_invisible'});
        }
        else {
            this.setState({fontSizeDisplay: 'none'});

            this.setState({fontSize_gray_invisible: ''});
            this.setState({fontSize_black_invisible: 'fontSize_black_invisible'});
        }
    }
    toggleSeparationLineDisplay(){
        if (this.state.separationLineDisplay === 'none'){
            this.setState({separationLineDisplay: ''});
            this.setState({fontSizeDisplay: 'none'});
            this.setState({otherOptionsDisplay: 'none'});

            this.setState({fontSize_gray_invisible: ''});
            this.setState({fontSize_black_invisible: 'fontSize_black_invisible'});
            this.setState({separationLine_gray_invisible: 'separationLine_gray_invisible'});
            this.setState({separationLine_black_invisible: ''});
            this.setState({otherOptions_gray_invisible: ''});
            this.setState({otherOptions_black_invisible: 'otherOptions_black_invisible'});
        }
        else {
            this.setState({separationLineDisplay: 'none'});

            this.setState({separationLine_gray_invisible: ''});
            this.setState({separationLine_black_invisible: 'separationLine_black_invisible'});
        }
    }
    toggleOtherOptionsDisplay(){
        if (this.state.otherOptionsDisplay === 'none'){
            this.setState({otherOptionsDisplay: ''});
            this.setState({separationLineDisplay: 'none'});
            this.setState({fontSizeDisplay: 'none'});

            this.setState({fontSize_gray_invisible: ''});
            this.setState({fontSize_black_invisible: 'fontSize_black_invisible'});
            this.setState({separationLine_gray_invisible: ''});
            this.setState({separationLine_black_invisible: 'separationLine_black_invisible'});
            this.setState({otherOptions_gray_invisible: 'otherOptions_gray_invisible'});
            this.setState({otherOptions_black_invisible: ''});
        }
        else {
            this.setState({otherOptionsDisplay: 'none'});

            this.setState({otherOptions_gray_invisible: ''});
            this.setState({otherOptions_black_invisible: 'otherOptions_black_invisible'});
        }
    }

    // 設定游標位置
    setMouseLocation(id){
        const { articleContents } = this.state;
        const target = articleContents.find( (articleContent) => articleContent.id === id );
        alert(id)
        this.PostArticleList.current.setMouseLocation(3)
    }
    // 取得當前物件位置
    focus(id){
        console.log(id);
        this.setState({currentID: id});

        const { articleContents } = this.state;
        const target = articleContents.find( (articleContent) => articleContent.id === id );
        if (target){
            if (target.quote === '') {
                this.setState({quote_gray_invisible: ''});
                this.setState({quote_half_invisible: 'quote_half_invisible'});
                this.setState({quote_black_invisible: 'quote_black_invisible'});
            }
            else if (target.quote === 'quoteA') {
                this.setState({quote_gray_invisible: 'quote_gray_invisible'});
                this.setState({quote_half_invisible: ''});
                this.setState({quote_black_invisible: 'quote_black_invisible'});
            }
            else {
                this.setState({quote_gray_invisible: 'quote_gray_invisible'});
                this.setState({quote_half_invisible: 'quote_half_invisible'});
                this.setState({quote_black_invisible: ''});
            }
            if (target.paragraphList === '') {
                this.setState({list_gray_invisible: ''});
                this.setState({list_dot_invisible: 'list_dot_invisible'});
                this.setState({list_number_invisible: 'list_number_invisible'});
            }
            else if (target.paragraphList === 'dot') {
                this.setState({list_gray_invisible: 'list_gray_invisible'});
                this.setState({list_dot_invisible: ''});
                this.setState({list_number_invisible: 'list_number_invisible'});
            }
            else {
                this.setState({list_gray_invisible: 'list_gray_invisible'});
                this.setState({list_dot_invisible: 'list_dot_invisible'});
                this.setState({list_number_invisible: ''});
            }
        }
    }
    // 建立一則文字物件
    onSubmit(content) {
        const { articleContents } = this.state;
        const { fontSize } = this.state;
        const { quoteAInvisible } = this.state;
        const { quoteBInvisible } = this.state;
        const { quote } = this.state;
        const { paragraphList } = this.state;
        // 🦄️ 在 if..else.. 裡面令的變數，外面吃不到
        if (articleContents.length === 0) {
            const id = 0;
            this.setState({
                articleContents: [...articleContents, {
                    id: id,
                    articleContent: content,
                    fontSize: fontSize,
                    quoteAInvisible: quoteAInvisible,
                    quoteBInvisible: quoteBInvisible,
                    quote: quote,
                    paragraphList: paragraphList
                }]
            })
        }
        else {
            const id = articleContents[articleContents.length-1].id + 1;
            this.setState({
                articleContents: [...articleContents, {
                    id: id,
                    articleContent: content,
                    fontSize: fontSize,
                    quoteAInvisible: quoteAInvisible,
                    quoteBInvisible: quoteBInvisible,
                    quote: quote,
                    paragraphList: paragraphList
                }]
            })
        }
        setTimeout(this.placeholder_display, 1);
    }
    // 更新一則文字物件
    onUpdate(id, content) {
        const { articleContents } = this.state;
        const target = articleContents.find( (articleContent) => articleContent.id === id );
        if (target)
            target.articleContent = content;
    }
    // 清空預設文字
    placeholder_display(){
        if (this.state.articleContents.length === 0)
            this.setState({placeholder_display: '你想分享甚麼…'});
        else
            this.setState({placeholder_display: ''});
    }
    // 合併一則文字物件
    merge(content, id){
        const { articleContents } = this.state;
        // if (id === 'current'){
        //     let index = articleContents.length-1;
        //     if (index >= 0){
        //         articleContents[index].articleContent = articleContents[index].articleContent + content;
        //         articleContentsUpdate = articleContents;
        //         setTimeout(this.fontEditorUpdate, 1);
        //     }
        // }
        // else {
            let index = articleContents.map(function (articleContent) {
                return articleContent.id;
            }).indexOf(id)-1;
            if (index >= 0){
                if (articleContents[index].inputInvisible === 'inputInvisible'){
                    articleContents.splice(index, 1);
                    articleContentsUpdate = articleContents;
                    setTimeout(this.fontEditorUpdate, 1);
                    // 清單
                    if (articleContents[index - 1] && articleContents[index - 1].paragraphList === 'number') {
                        let i = 1;
                        let tempNum = articleContents[index - 1].paragraphListNumber;
                        while (articleContents[index - 1 + i] && articleContents[index - 1 + i].paragraphList === 'number'){
                            articleContents[index - 1 + i].paragraphListNumber += tempNum;
                            i ++;
                        }
                    }
                    setTimeout(this.fontEditorUpdate, 1);
                }
                else {
                    articleContents[index].articleContent = articleContents[index].articleContent + content;
                    articleContentsUpdate = articleContents;
                    setTimeout(this.fontEditorUpdate, 1);
                    // 清單
                    if (articleContents[index + 2] && articleContents[index + 2].paragraphList === 'number') {
                        if (articleContents[index] && articleContents[index].paragraphList === 'number'){
                            let tempNum = articleContents[index].paragraphListNumber;
                            let i = 1;
                            while (articleContents[index + 1 + i] && articleContents[index + 1 + i].paragraphList === 'number') {
                                articleContents[index + 1 + i].paragraphListNumber = tempNum + i;
                                i++;
                            }
                        }
                        else {
                            let i = 1;
                            while (articleContents[index + 1 + i] && articleContents[index + 1 + i].paragraphList === 'number') {
                                articleContents[index + 1 + i].paragraphListNumber = i;
                                i++;
                            }
                        }
                    }
                    setTimeout(this.fontEditorUpdate, 1);
                    this.onDelete(id);
                }
            }
        // }
    }
    // 分割一則文字物件
    fragment(contentOld, contentNew, style, id){
        const { articleContents } = this.state;
        let index = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(id);
        articleContents[index].articleContent = contentOld;
        let newObject = {
            id: objectId,
            articleContent: contentNew,
            fontSize: style.fontSize,
            quoteAInvisible: style.quoteAInvisible,
            quoteBInvisible: style.quoteBInvisible,
            quote: style.quote,
            paragraphList: style.paragraphList,
            paragraphListDotInvisible: style.paragraphListDotInvisible,
            paragraphListNumberInvisible: style.paragraphListNumberInvisible
        };
        objectId ++;
        articleContents.splice(index+1, 0, newObject);
        articleContentsUpdate = articleContents;
        setTimeout(this.fontEditorUpdate, 1);
        // 清單
        if (articleContents[index] && articleContents[index].paragraphList === 'number'){
            let tempNum = articleContents[index].paragraphListNumber;
            let articleContentsComment = update( articleContents[index+1], { paragraphList: {$set: 'number'}, paragraphListNumber: {$set: tempNum+1} } );
            articleContentsUpdate = update(articleContents, {
                $splice: [[index+1, 1, articleContentsComment]]
            });
            if (articleContents[index+2] && articleContents[index+2].paragraphList === 'number'){
                let i = 1;
                let tempPlus = tempNum - articleContents[index+1+i].paragraphListNumber + 2;
                while (articleContents[index + 1 + i] && articleContents[index+1+i].paragraphList === 'number'){
                    articleContents[index+1+i].paragraphListNumber += tempPlus;
                    i ++;
                }
            }
        }
        setTimeout(this.fontEditorUpdate, 1);
    }
    // 刪除一則文字物件
    onDelete(id){
        const { articleContents } = this.state;
        let index = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(id);
        articleContents.splice(index, 1);
        this.setState({articleContents: articleContents});
    }


    // 編輯器：大小

    fontSizeH1(){
        const { articleContents } = this.state;
        const articleContentsIndex = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(this.state.currentID);
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: 'h1'}} );
            articleContentsUpdate = update(articleContents, {
                $splice: [[articleContentsIndex, 1, articleContentsComment]]
            });
            setTimeout(this.fontEditorUpdate, 1);
        }
        else {
            this.setState({fontSize: 'h1'});
        }
    }
    fontSizeH2(){
        const { articleContents } = this.state;
        const articleContentsIndex = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(this.state.currentID);
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: 'h2'}} );
            articleContentsUpdate = update(articleContents, {
                $splice: [[articleContentsIndex, 1, articleContentsComment]]
            });
            setTimeout(this.fontEditorUpdate, 1);
        }
        else {
            this.setState({fontSize: 'h2'});
        }
    }
    fontSizeContent(){
        const { articleContents } = this.state;
        const articleContentsIndex = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(this.state.currentID);
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: ''}} );
            articleContentsUpdate = update(articleContents, {
                $splice: [[articleContentsIndex, 1, articleContentsComment]]
            });
            setTimeout(this.fontEditorUpdate, 1);
        }
        else {
            this.setState({fontSize: ''});
        }
    }
    fontSizeAnnotation(){
        const { articleContents } = this.state;
        const articleContentsIndex = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(this.state.currentID);
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            let articleContentsComment = update( articleContents[articleContentsIndex], {fontSize: {$set: 'annotation'}} );
            articleContentsUpdate = update(articleContents, {
                $splice: [[articleContentsIndex, 1, articleContentsComment]]
            });
            setTimeout(this.fontEditorUpdate, 1);
        }
        else {
            this.setState({fontSize: 'annotation'});
        }
    }


    // 編輯器：引用
    quote(){
        const { articleContents } = this.state;
        const articleContentsIndex = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(this.state.currentID);
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            if (target.quote === '') {
                let articleContentsComment = update( articleContents[articleContentsIndex], { quoteAInvisible: {$set: ' '}, quote: {$set: 'quoteA'} } );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            else if (target.quote === 'quoteA') {
                let articleContentsComment = update( articleContents[articleContentsIndex], { quoteAInvisible: {$set: 'quoteAInvisible'}, quoteBInvisible: {$set: ' '}, quote: {$set: 'quoteB'} } );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            else {
                let articleContentsComment = update( articleContents[articleContentsIndex], { quoteAInvisible: {$set: 'quoteAInvisible'}, quoteBInvisible: {$set: 'quoteBInvisible'}, quote: {$set: ''} } );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            setTimeout(this.fontEditorUpdate, 1);
        }
        else {
            const { quote } = this.state;
            if (quote === '') {
                this.setState({quoteAInvisible: ' '});
                this.setState({quote: 'quoteA'});
            }
            else if (quote === 'quoteA') {
                this.setState({quoteAInvisible: 'quoteAInvisible'});
                this.setState({quoteBInvisible: ' '});
                this.setState({quote: 'quoteB'});
            }
            else {
                this.setState({quoteAInvisible: 'quoteAInvisible'});
                this.setState({quoteBInvisible: 'quoteBInvisible'});
                this.setState({quote: ''});
            }
        }
    }


    // 建立分隔線
    separationLineA() {
        const { articleContents } = this.state;
        const { currentID } = this.state;
        let index = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(currentID);
        let ifThisIsTheLastObj = index === articleContents.length-1;
        let newObject = {
            id: objectId,
            separationLineAInvisible: ' ',
            inputInvisible: 'inputInvisible'
        };
        objectId ++;
        articleContents.splice(index+1, 0, newObject);
        if (ifThisIsTheLastObj){
            let newEmptyObject = {
                id: objectId,
                articleContent: '',
                fontSize: '',
                quoteAInvisible: '',
                quoteBInvisible: '',
                quote: '',
                paragraphList: ''
            };
            objectId ++;
            articleContents.splice(index+2, 0, newEmptyObject);
        }
        articleContentsUpdate = articleContents;
        setTimeout(this.fontEditorUpdate, 1);
        if (articleContents[index + 2] && articleContents[index + 2].paragraphList === 'number') {
            let i = 1;
            let tempMinus = articleContents[index + 2].paragraphListNumber - 1;
            while (articleContents[index + 1 + i] && articleContents[index + 1 + i].paragraphList === 'number') {
                articleContents[index + 1 + i].paragraphListNumber -= tempMinus;
                i++;
            }
        }
        setTimeout(this.fontEditorUpdate, 1);
    }
    separationLineB() {
        const { articleContents } = this.state;
        const { currentID } = this.state;
        let index = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(currentID);
        let ifThisIsTheLastObj = index === articleContents.length-1;
        let newObject = {
            id: objectId,
            separationLineBInvisible: ' ',
            inputInvisible: 'inputInvisible'
        };
        objectId ++;
        articleContents.splice(index+1, 0, newObject);
        if (ifThisIsTheLastObj){
            let newEmptyObject = {
                id: objectId,
                articleContent: '',
                fontSize: '',
                quoteAInvisible: '',
                quoteBInvisible: '',
                quote: '',
                paragraphList: ''
            };
            objectId ++;
            articleContents.splice(index+2, 0, newEmptyObject);
        }
        articleContentsUpdate = articleContents;
        setTimeout(this.fontEditorUpdate, 1);
        if (articleContents[index + 2] && articleContents[index + 2].paragraphList === 'number') {
            let i = 1;
            let tempMinus = articleContents[index + 2].paragraphListNumber - 1;
            while (articleContents[index + 1 + i] && articleContents[index + 1 + i].paragraphList === 'number') {
                articleContents[index + 1 + i].paragraphListNumber -= tempMinus;
                i++;
            }
        }
        setTimeout(this.fontEditorUpdate, 1);
    }
    separationLineC() {
        const { articleContents } = this.state;
        const { currentID } = this.state;
        let index = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(currentID);
        let ifThisIsTheLastObj = index === articleContents.length-1;
        let newObject = {
            id: objectId,
            separationLineCInvisible: ' ',
            inputInvisible: 'inputInvisible'
        };
        objectId ++;
        articleContents.splice(index+1, 0, newObject);
        if (ifThisIsTheLastObj){
            let newEmptyObject = {
                id: objectId,
                articleContent: '',
                fontSize: '',
                quoteAInvisible: '',
                quoteBInvisible: '',
                quote: '',
                paragraphList: ''
            };
            objectId ++;
            articleContents.splice(index+2, 0, newEmptyObject);
        }
        articleContentsUpdate = articleContents;
        setTimeout(this.fontEditorUpdate, 1);
        if (articleContents[index + 2] && articleContents[index + 2].paragraphList === 'number') {
            let i = 1;
            let tempMinus = articleContents[index + 2].paragraphListNumber - 1;
            while (articleContents[index + 1 + i] && articleContents[index + 1 + i].paragraphList === 'number') {
                articleContents[index + 1 + i].paragraphListNumber -= tempMinus;
                i++;
            }
        }
        setTimeout(this.fontEditorUpdate, 1);
    }
    separationLineD() {
        const { articleContents } = this.state;
        const { currentID } = this.state;
        let index = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(currentID);
        let ifThisIsTheLastObj = index === articleContents.length-1;
        let newObject = {
            id: objectId,
            separationLineDInvisible: ' ',
            inputInvisible: 'inputInvisible'
        };
        objectId ++;
        articleContents.splice(index+1, 0, newObject);
        if (ifThisIsTheLastObj){
            let newEmptyObject = {
                id: objectId,
                articleContent: '',
                fontSize: '',
                quoteAInvisible: '',
                quoteBInvisible: '',
                quote: '',
                paragraphList: ''
            };
            objectId ++;
            articleContents.splice(index+2, 0, newEmptyObject);
        }
        articleContentsUpdate = articleContents;
        setTimeout(this.fontEditorUpdate, 1);
        if (articleContents[index + 2] && articleContents[index + 2].paragraphList === 'number') {
            let i = 1;
            let tempMinus = articleContents[index + 2].paragraphListNumber - 1;
            while (articleContents[index + 1 + i] && articleContents[index + 1 + i].paragraphList === 'number') {
                articleContents[index + 1 + i].paragraphListNumber -= tempMinus;
                i++;
            }
        }
        setTimeout(this.fontEditorUpdate, 1);
    }


    // 編輯器：清單
    paragraphList(){
        const { articleContents } = this.state;
        const articleContentsIndex = articleContents.map(function (articleContent) {
            return articleContent.id;
        }).indexOf(this.state.currentID);
        const target = articleContents.find( (articleContent) => articleContent.id === this.state.currentID );
        if (target){
            if (target.paragraphList === '') {
                let articleContentsComment = update( articleContents[articleContentsIndex], {paragraphList: {$set: 'dot'}, paragraphListDotInvisible: {$set: ' '}, paragraphListNumberInvisible: {$set: 'paragraphListNumberInvisible'} } );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
            }
            else if (target.paragraphList === 'dot') {
                if (articleContents[articleContentsIndex-1] && articleContents[articleContentsIndex-1].paragraphList === 'number'){
                    let tempNum = articleContents[articleContentsIndex-1].paragraphListNumber;
                    let articleContentsComment = update( articleContents[articleContentsIndex], { paragraphList: {$set: 'number'}, paragraphListNumber: {$set: tempNum+1}, paragraphListDotInvisible: {$set: 'paragraphListDotInvisible'}, paragraphListNumberInvisible: {$set: ' '} } );
                    articleContentsUpdate = update(articleContents, {
                        $splice: [[articleContentsIndex, 1, articleContentsComment]]
                    });
                    if (articleContents[articleContentsIndex+1] && articleContents[articleContentsIndex+1].paragraphList === 'number'){
                        let i = 1;
                        let tempPlus = tempNum +1;
                        while (articleContents[articleContentsIndex + i] && articleContents[articleContentsIndex+i].paragraphList === 'number'){
                            articleContents[articleContentsIndex+i].paragraphListNumber += tempPlus;
                            i ++;
                        }
                    }
                }
                else {
                    let articleContentsComment = update( articleContents[articleContentsIndex], { paragraphList: {$set: 'number'}, paragraphListNumber: {$set: 1}, paragraphListDotInvisible: {$set: 'paragraphListDotInvisible'}, paragraphListNumberInvisible: {$set: ' '} } );
                    articleContentsUpdate = update(articleContents, {
                        $splice: [[articleContentsIndex, 1, articleContentsComment]]
                    });
                    if (articleContents[articleContentsIndex+1] && articleContents[articleContentsIndex+1].paragraphList === 'number'){
                        let i = 1;
                        let tempPlus = 1;
                        while (articleContents[articleContentsIndex + i] && articleContents[articleContentsIndex+i].paragraphList === 'number'){
                            articleContents[articleContentsIndex+i].paragraphListNumber += tempPlus;
                            i ++;
                        }
                    }
                }
            }
            else {
                let articleContentsComment = update( articleContents[articleContentsIndex], {paragraphList: {$set: ''}, paragraphListNumber: {$set: 0}, paragraphListDotInvisible: {$set: 'paragraphListDotInvisible'}, paragraphListNumberInvisible: {$set: 'paragraphListNumberInvisible'} } );
                articleContentsUpdate = update(articleContents, {
                    $splice: [[articleContentsIndex, 1, articleContentsComment]]
                });
                if (articleContents[articleContentsIndex+1] && articleContents[articleContentsIndex + 1].paragraphList === 'number') {
                    let i = 1;
                    let tempMinus = articleContents[articleContentsIndex + 1].paragraphListNumber - 1;
                    while (articleContents[articleContentsIndex + i] && articleContents[articleContentsIndex + i].paragraphList === 'number') {
                        articleContents[articleContentsIndex + i].paragraphListNumber -= tempMinus;
                        i++;
                    }
                }
            }
            setTimeout(this.fontEditorUpdate, 1);
        }
        // else {
        //     const { paragraphList } = this.state;
        //     if (paragraphList === '')
        //         this.setState({paragraphList: 'dot'});
        //     else if (paragraphList === 'dot')
        //         this.setState({paragraphList: 'number'});
        //     else
        //         this.setState({paragraphList: ''});
        // }
    }


    // 編輯器：總更新
    fontEditorUpdate(){
        this.setState({articleContents: []});
        this.setState({articleContents: articleContentsUpdate});
    }


    // 取得輸入值
    handleChange(event) {
        this.setState({nextStepColor: 'black'});
        this.setState({nextStepPointerEvents: 'auto'});
        switch (event.target.name){
            case '標題':{
                this.setState({articleTitle: event.target.value});
                break;
            }
            case '內文':{
                this.setState({articleContent: event.target.value});
                break;
            }
            case '文章類別':{
                this.setState({articleCategory: event.target.value});
                break;
            }
            // 臨時亂做的圖便上傳
            case 'uploadAvatar':{
                this.setState({myImg: event.target.files[0]});
                this.setState({imgName :event.target.files[0].name});
                this.setState({nonImg: 'invisible'});
                this.setState({hasImg: ''});
                break;
            }
            default: {
                break;
            }
        }
    }
    // 提交表單後重新導向至 index 頁
    redirectToIndex() {
        this.setState({redirectToIndex: true});
    }
    // 提交表單
    handleSubmit(event) {
        const { articleID } = this.state;
        // alert('::'+articleID)
        if (articleID){
            // const { articleID } = this.state;
            // alert('::'+articleID)
            this.fetchUpdate(articleID);
        }
        else
            this.fetch();
        // setTimeout(this.redirectToIndex, 7000);
        event.preventDefault();
    }
    fetchConsole(){
        console.log(this.state.articleContents);
    }
    // 連接 API 並填入文章內容
    fetch() {
        let formData = new FormData();
        let articleContentsStringify = JSON.stringify(this.state.articleContents);

        formData.append('authorID', this.state.currentUserID);
        formData.append('author', this.state.currentUser);
        formData.append('category', this.state.articleCategory);
        formData.append('content', articleContentsStringify);
        formData.append('title', this.state.articleTitle);
        formData.append('privacy', 'public');
        // 臨時亂做的圖便上傳
        formData.append('image', this.state.myImg);
        formData.append('photoType', 'jpg');

        // fetch('http://140.119.163.194:3000/add_article', {
        fetch(this.state.apiURL+'add_article', {
            method: 'post',
            // 舊的 fetch 作法
            // headers: {
            //     'Accept': 'application/json, text/plain, */*',
            //     'Content-Type': 'application/json'
            // },
            // body: JSON.stringify({authorID: this.state.currentToken,
            //                       title: this.state.articleTitle,
            //                       name: this.state.currentUser,
            //                       category: this.state.articleCategory,
            //                       content: this.state.articleContent})
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                this.redirectToIndex();
            });
    }
    // 連接 API 並填入文章內容（更新文章用）
    fetchUpdate(articleID) {
        let formData = new FormData();
        let articleContentsStringify = JSON.stringify(this.state.articleContents);
        // alert(this.state.articleTitle)
        // alert(articleID)
        // alert(this.state.articleCategory)
        // alert(articleContentsStringify)

        formData.append('title', this.state.articleTitle);
        formData.append('articleID', articleID);
        formData.append('category', this.state.articleCategory);
        formData.append('content', articleContentsStringify);
        formData.append('privacy', 'public');
        // 臨時亂做的圖便上傳
        formData.append('image', this.state.myImg);
        formData.append('photoType', 'jpg');

        fetch(this.state.apiURL+'update_article', {
            method: 'put',
            body: formData
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                this.redirectToIndex();
            });
    }

    // 取得個人大頭照
    fetchData() {
        fetch(this.state.apiURL+'search_profileByUserID', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: this.state.currentUserID})
        }).then(res=>res.json())
            .then(res => {
                console.log(res);
                this.setState({currentUserAvatarLink: res.avatarLink[res.avatarLink.length-1]});
                if (this.state.articleID) {
                    this.setState({nextStepColor: 'black'});
                    this.setState({nextStepPointerEvents: 'auto'});
                }
            });
    }

    nextStep(){
        this.setState({postArticle_step2_invisible: ' '});
        this.setState({nextStepDisplay: 'none'});
        this.setState({shareDisplay: ''});
    }

    componentDidMount() {
        this.setState({redirectToSignUpLoginTemplate: (localStorage.getItem("currentUser") === null || localStorage.getItem("currentUser") === undefined)});
        this.fetchData();
    }


    // 類別
    setCategory(category){
        this.setState({articleCategory: category});
        this.setState({setCategoryDisplay: 'invisible'});
        this.setState({postArticleDisplay: ''})
    }
    setCategoryDisplay(){
        this.setState({setCategoryDisplay: ''});
        this.setState({postArticleDisplay: 'invisible'})
    }
    postArticleDisplay(){
        this.setState({setCategoryDisplay: 'invisible'});
        this.setState({postArticleDisplay: ''})
    }

    render(){
        const { redirectToSignUpLoginTemplate } = this.state;
        if (redirectToSignUpLoginTemplate)
            return <Redirect push to="/" />;

        const { redirectToIndex } = this.state;
        if (redirectToIndex) {
            return <Redirect push to="/index" />;
        }
        const { currentUserAvatarLink } = this.state;
        const { currentUser } = this.state;
        const { postArticle_step2_invisible } = this.state;
        const { articleCategory } = this.state;
        const { setCategoryDisplay } = this.state;
        const { postArticleDisplay } = this.state;

        const { fontSize } = this.state;
        const { quoteAInvisible } = this.state;
        const { quoteBInvisible } = this.state;
        const { quote } = this.state;
        const { paragraphList } = this.state;
        const { placeholder_display } = this.state;
        const { fontSizeDisplay } = this.state;
        const { separationLineDisplay } = this.state;
        const { otherOptionsDisplay } = this.state;
        const { articleContents } = this.state;

        const { fontSize_gray_invisible } = this.state;
        const { fontSize_black_invisible } = this.state;
        const { quote_gray_invisible } = this.state;
        const { quote_half_invisible } = this.state;
        const { quote_black_invisible } = this.state;
        const { separationLine_gray_invisible } = this.state;
        const { separationLine_black_invisible } = this.state;
        const { list_gray_invisible } = this.state;
        const { list_dot_invisible } = this.state;
        const { list_number_invisible } = this.state;
        const { otherOptions_gray_invisible } = this.state;
        const { otherOptions_black_invisible } = this.state;

        const articleContentsElements = articleContents.map((articleContent) =>
            (<div key={articleContent.id}>
                <PostArticleList
                    id = {articleContent.id}
                    fontSize = {articleContent.fontSize}
                    quoteAInvisible = {articleContent.quoteAInvisible}
                    quoteBInvisible = {articleContent.quoteBInvisible}
                    quote = {articleContent.quote}
                    separationLineAInvisible = {articleContent.separationLineAInvisible}
                    separationLineBInvisible = {articleContent.separationLineBInvisible}
                    separationLineCInvisible = {articleContent.separationLineCInvisible}
                    separationLineDInvisible = {articleContent.separationLineDInvisible}
                    inputInvisible = {articleContent.inputInvisible}
                    paragraphList = {articleContent.paragraphList}
                    paragraphListNumber = {articleContent.paragraphListNumber}
                    paragraphListDotInvisible = {articleContent.paragraphListDotInvisible}
                    paragraphListNumberInvisible = {articleContent.paragraphListNumberInvisible}
                    articleContent = {articleContent.articleContent}


                    ref = {this.PostArticleList}


                    onUpdate = {this.onUpdate}
                    focus = {this.focus}
                    merge = {this.merge}
                    fragment = {this.fragment}
                    setMouseLocation = {this.setMouseLocation}
                />
            </div>)
        );

        return (
            <div style={{'height':'100vh'}}>
                {/*<Navigation />*/}
                <div className={setCategoryDisplay}>
                    <PostArticleCategory
                        setCategory = {this.setCategory}
                        postArticleDisplay = {this.postArticleDisplay}
                    />
                </div>
                <div style={{'height':'100vh'}} className={postArticleDisplay}>
                    <div className="flex justify-content-space-between PostArticle_Nav">
                        <span onClick={this.redirectToIndex}>取消</span>
                        <span>新增貼文</span>
                        <span style={{'color':this.state.nextStepColor,'pointerEvents':this.state.nextStepPointerEvents,'display':this.state.nextStepDisplay}} onClick={this.nextStep}>下一步</span>
                        <span style={{'display':this.state.shareDisplay}} onClick={this.handleSubmit}>分享</span>
                    </div>
                    <div className="flex postArticle_userPhoto">
                        <div className="userPhoto" style={{'backgroundImage': 'url('+currentUserAvatarLink+')'}}> </div>
                        <div className="postArticle_userName">{currentUser}</div>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="inputField_title_placeholder">
                            {/*臨時亂做的圖便上傳*/}
                            <label>
                                <input style={{display:'none'}} name="uploadAvatar" type="file" accept="image/gif, image/jpeg, image/png" onChange={this.handleChange} />
                                <span className={'imageText '+this.state.nonImg}>上傳照片</span>
                                <span className={'imageText '+this.state.hasImg}>更換照片</span>
                                <div style={{marginLeft: '8%'}}>{this.state.imgName}</div>
                            </label>
                            <input className="inputField_title" type="text" name="標題" placeholder="標題，" onChange={this.handleChange} value={this.state.articleTitle} />
                        </div>
                        {/*<div className="inputField_content_placeholder">*/}
                            {/*<textarea className="inputField_content" name="內文" placeholder="你想分享甚麼…" onChange={this.handleChange}></textarea>*/}
                        {/*</div>*/}
                        {/*<select className="selectCategory" name="文章類別" onChange={this.handleChange}>*/}
                            {/*<option value="未分類">分類</option>*/}
                            {/*<option value="創作">創作</option>*/}
                            {/*<option value="旅遊">旅遊</option>*/}
                            {/*<option value="生活">生活</option>*/}
                            {/*<option value="運動">運動</option>*/}
                            {/*<option value="娛樂">娛樂</option>*/}
                        {/*</select>*/}
                        {/*<input className="submit" type="submit" value="完成" />*/}
                    </form>

                    {articleContentsElements}
                    <div style={{'height':'100px','width':'100%'}}> </div>
                    
                    {/*<PostArticleInput*/}
                        {/*fontSize = {fontSize}*/}
                        {/*quoteAInvisible = {quoteAInvisible}*/}
                        {/*quoteBInvisible = {quoteBInvisible}*/}
                        {/*quote = {quote}*/}
                        {/*paragraphList = {paragraphList}*/}
                        {/*placeholder_display = {placeholder_display}*/}
                        {/*onSubmit = {this.onSubmit}*/}
                        {/*focus = {this.focus}*/}
                        {/*merge = {this.merge}*/}
                    {/*/>*/}
                    {/*<button onClick={this.fetchConsole} style={temp}>送出</button>*/}

                    {/*編輯器*/}
                    <div className='editor'>
                        {/*大小*/}
                        <div style={{'display':fontSizeDisplay}} className={'flex justify-content-space-between editor_fontSize editor_sub'}>
                            <span onClick={this.fontSizeH1}>大標</span>
                            <span onClick={this.fontSizeH2}>中標</span>
                            <span onClick={this.fontSizeContent}>內文</span>
                            <span onClick={this.fontSizeAnnotation}>註解</span>
                        </div>
                        {/*分隔*/}
                        <div style={{'display':separationLineDisplay}} className={'flex justify-content-space-between editor_separationLine editor_sub'}>
                            <span onClick={this.separationLineA}><img src={separationLine01} alt="separationLine01" className='button_editor_four'/></span>
                            <span onClick={this.separationLineB}><img src={separationLine02} alt="separationLine02" className='button_editor_four'/></span>
                            <span onClick={this.separationLineC}><img src={separationLine03} alt="separationLine03" className='button_editor_four'/></span>
                            <span onClick={this.separationLineD}><img src={separationLine04} alt="separationLine04" className='button_editor_four'/></span>
                        </div>
                        {/*加號*/}
                        <div style={{'display':otherOptionsDisplay}} className={'flex justify-content-space-between'}>
                            <span><img src={otherOptions01} alt="otherOptions01" className='button_editor_four'/></span>
                            <span><img src={otherOptions02} alt="otherOptions02" className='button_editor_four'/></span>
                            <span><img src={otherOptions03} alt="otherOptions03" className='button_editor_four'/></span>
                            <span><img src={otherOptions04} alt="otherOptions04" className='button_editor_four'/></span>
                            <span><img src={otherOptions05} alt="otherOptions05" className='button_editor_four'/></span>
                            <span><img src={otherOptions06} alt="otherOptions06" className='button_editor_four'/></span>
                        </div>
                        <div className={'flex justify-content-space-between editor_main'}>
                            {/*fontSize*/}
                            <span onClick={this.toggleFontSizeDisplay} className={fontSize_gray_invisible}><img src={fontSize_gray} alt="fontSize_gray" className={'button_editor_six '}/></span>
                            <span onClick={this.toggleFontSizeDisplay} className={fontSize_black_invisible}><img src={fontSize_black} alt="fontSize_black" className={'button_editor_six '}/></span>
                            {/*quote*/}
                            <span onClick={this.quote} className={quote_gray_invisible}><img src={quote_gray} alt="quote_gray" className={'button_editor_six '}/></span>
                            <span onClick={this.quote} className={quote_half_invisible}><img src={quote_half} alt="quote_half" className={'button_editor_six '}/></span>
                            <span onClick={this.quote} className={quote_black_invisible}><img src={quote_black} alt="quote_black" className={'button_editor_six '}/></span>
                            {/*separationLine*/}
                            <span onClick={this.toggleSeparationLineDisplay} className={separationLine_gray_invisible}><img src={separationLine_gray} alt="separationLine_gray" className={'button_editor_six '}/></span>
                            <span onClick={this.toggleSeparationLineDisplay} className={separationLine_black_invisible}><img src={separationLine_black} alt="separationLine_black" className={'button_editor_six '}/></span>
                            {/*paragraphList*/}
                            <span onClick={this.paragraphList} className={list_gray_invisible}><img src={list_gray} alt="list_gray" className={'button_editor_six '}/></span>
                            <span onClick={this.paragraphList} className={list_dot_invisible}><img src={list_dot} alt="list_dot" className={'button_editor_six '}/></span>
                            <span onClick={this.paragraphList} className={list_number_invisible}><img src={list_number} alt="list_number" className={'button_editor_six '}/></span>
                            {/*tag*/}
                            <span><img src={tag_gray} alt="tag_gray" className='button_editor_six nonfunctionalOpacity'/></span>
                            {/*otherOptions*/}
                            <span onClick={this.toggleOtherOptionsDisplay} className={otherOptions_gray_invisible}><img src={otherOptions_gray} alt="otherOptions_gray" className={'button_editor_six nonfunctionalOpacity '}/></span>
                            <span onClick={this.toggleOtherOptionsDisplay} className={otherOptions_black_invisible}><img src={otherOptions_black} alt="otherOptions_black" className={'button_editor_six nonfunctionalOpacity '}/></span>
                        </div>
                    </div>

                    <div className={"postArticle_step2 "+postArticle_step2_invisible}>
                        <hr/>
                        <div onClick={this.setCategoryDisplay}>
                            <span>貼文類別</span>
                            <span className="open">{articleCategory}</span>
                            <span className="arrow">></span>
                        </div>
                        <hr/>
                        <div className='nonfunctionalOpacity'>
                            <span>分享對象</span>
                            <span className="open">公開</span>
                            <span className="arrow">></span>
                        </div>
                        <hr/>
                        <div style={{'display':'flex','alignItems':'center'}} className='nonfunctionalOpacity'>
                            <span>分享</span>
                            <div className="iconSocial">
                                <img src={iconSocial} alt="iconSocial"/>
                                <img src={iconSocial} alt="iconSocial"/>
                            </div>
                        </div>
                        <div className='nonfunctionalOpacity'>
                            <div className="advancedOptionsDiv">
                                <span className="advancedOptions">進階設定</span>
                                <span>v</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PostArticle;

const temp = {
    'position': 'absolute',
    'top': '80%',
    'left': '80%',
    'border': '1px solid grey',
    'borderRadius': '20px'
};

let articleContentsUpdate = [];
let objectId = 1;