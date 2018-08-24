import React, { Component } from 'react';
import SignUpLoginTemplate from "../member/SignUpLoginTemplate";

class InputField extends React.Component{
    constructor(props, context){
        super(props, context);
        // 10-1. 讓上層元件傳遞的 value，初始元件狀態
        this.state = { value: props.value || "" };
        // this.state = { value: props.value || '' };
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // 10-3. handleChange 用來傾聽 input onChange 事件，將使用者輸入的資料更新到元件狀態中
    handleChange(e){
        this.setState({ value: e.target.value });
    }

    // 10-1. 傾聽使用者 keydown 事件：
    //    當使用者按下 enter (keyCode = 13) 後，
    //    呼叫上層傳遞的 onSubmitEditing callback，
    //    將資料傳遞給上層元件。
    handleKeyDown(e){
        const {
            onKeyDown,
            onSubmitEditing
        } = this.props;
        // const { value } = e.target;
        const { value } = this.state;
        switch (e.keyCode){
            case 13:
                // 10-2. 如果使用者沒有鍵入任何值（包括都是空白），則不會呼叫 callback
                if (value.trim())
                    onSubmitEditing && onSubmitEditing(value);
                // 10-3. 將輸入框資料清空
                // e.target.value = "";
                this.setState({ value: "" });
                break;
        }
        // 10-4. 如果上層元件傳遞 onKeyDown callback，我們必須觸發它
        onKeyDown && onKeyDown(e);
    }

    render(){
        // const { placeholder } = this.props;

        return <input
                      {...this.props}
                      type="text" // placeholder={placeholder}
                      value={this.state.value}
                      onChange={this.handleChange}
                      // 10-5. 傾聽 input 的 onKeyDown 事件
                      onKeyDown={this.handleKeyDown} />;
    }
}

// 1. 使用 propTypes 定義參數的型別
InputField.propTypes = {
    // placeholder: React.PropTypes.string,
    // 10-6. 完成 onSubmitEditing 的 propTypes
    // onSubmitEditing: React.PropTypes.func
};

// 2. 使用 defaultProps 定義參數的預設值
InputField.defaultProps = {
    placeholder: '新增待辦事項'
};

export default InputField;