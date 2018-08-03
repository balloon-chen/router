import React, { Component } from 'react';
import InputField from './InputField';
import SignUpLoginTemplate from "./SignUpLoginTemplate";

class TodoItem extends React.Component{
    // 這邊不懂
    constructor(props, context){
        super(props, context);

        // 9-1. 使用 class constructor (類別建構子) 初始元件狀態
        this.state = { editable: false };

        // 9-7. 在 ES6 component class 中，你必須手動綁定 this
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    toggleEditMode(){
        // 9-6. 更新元件狀態來切換模式
        this.setState({ editable: !this.state.editable });
    }

    renderViewMode(){
        const { title, completed, onToggle, onDelete } = this.props;

        return <div>
            <input type="checkbox" checked={completed}
                   onChange={() => onToggle && onToggle(!completed)} />
            <span onDoubleClick={this.toggleEditMode}>{title}</span>
            <button onClick={() => onDelete && onDelete()}>x</button>
        </div>;
    }

    renderEditMode(){
        const { title, onUpdate } = this.props;

        // 9-4. 「編輯模式」使用 InputField 元件
        return (
            // 不懂。為什麼不直接用 input
            <InputField
            // <input
                autoFocus                    // 9-5. autoFocus 讓使用者切換到編輯模式後，可以立即編打
                placeholder="編輯待辦事項"
                value={title}
                onBlur={this.toggleEditMode} // 9-8. 當使用者點擊其他地方，則切換為「瀏覽模式」
                onKeyDown={(e) => {          // 9-9. 當使用者按下 ESC，則切換為「瀏覽模式」
                    if (e.keyCode === 27) {
                        e.preventDefault();
                        this.toggleEditMode();
                    }
                }}
                // 10-6. 加入 onSubmitEditing callback
                onSubmitEditing={(content) => {
                    onUpdate && onUpdate(content);
                    this.toggleEditMode();
                }}
            />
        );
    }

    render(){
        // 9-2. 判斷目前模式為何，渲染不同的畫面
        return this.state.editable ? this.renderEditMode() : this.renderViewMode();
    }

}

// 1. 使用 propTypes 定義參數的型別
TodoItem.propTypes = {
    // title: React.PropTypes.string,
    // 吃 bool 不認 boolean
    // completed: React.PropTypes.bool
};

// 2. 使用 defaultProps 定義參數的預設值
TodoItem.defaultProps = {
    title: "Item 0",
    completed: false
};

export default TodoItem;