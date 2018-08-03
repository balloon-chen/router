import React, { Component } from 'react';
import SignUpLoginTemplate from "./SignUpLoginTemplate";

class TodoHeader extends React.Component{
    render(){
        const { title, username, todoCount } = this.props;

        return <div>
            <h1>{title}</h1>
            <span>哈囉，{username}：你有 {todoCount} 項未完成的待辦事項</span>
        </div>;
    }
}

// 1. 使用 propTypes 定義參數的型別
TodoHeader.propTypes = {
    // title: React.PropTypes.string,
    // username: React.PropTypes.string,
    // todoCount: React.PropTypes.number
};

// 2. 使用 defaultProps 定義參數的預設值
TodoHeader.defaultProps = {
    title: '我的待辦清單',
    username: 'Guest',
    todoCount: 0
};

export default TodoHeader;