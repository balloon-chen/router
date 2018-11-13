import React, { Component } from 'react';

import InputField from './InputField';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import SignUpLoginTemplate from "../member/SignUpLoginTemplate";

// 10-2. 將新增邏輯抽成一個 function
const _createTodo = (todos, title) => {
    todos.push({
        id: todos[todos.length-1].id + 1,
        title,
        completed: false
    });
    return todos;
};

// 10-2. 將編輯邏輯抽成一個 function
const _updateTodo = (todos, id, title) => {
    const target = todos.find((todo) => todo.id === id);
    if (target) target.title = title;
    return todos;
};

// 10-6. 將切換邏輯抽成一個 function
const _toggleTodo = (todos, id, completed) => {
    const target = todos.find((todo) => todo.id === id);
    if (target) target.completed = completed;
    return todos;
};

// 9-7. 將刪除邏輯抽成一個 function
const _deleteTodo = (todos, id) => {
    const idx = todos.findIndex((todo) => todo.id === id);
    // 不懂。為什麼 !== -1
    if (idx !== -1) todos.splice(idx, 1);
    return todos;
};

class TodoApp extends React.Component{
    constructor(props, context){
        super(props, context);

        // 9-4. 將 todos 搬到 state 中：
        //    放在 state 的好處是當使用 this.setState() 更新 todos 後，
        //    React 會幫你重新 render，讓使用者看到最新的畫面。
        //
        //    PS. React 的資料模型分兩種：props、state，
        //    你應該盡可能讓底層元件存取資料的方式是使用 props，
        //    所以我們將 todos 儲存在上層元件 (TodoApp) 的 state 中。
        this.state = {
            test: "測試",
            todos: [
                {
                    id: 0,
                    userID: "2255443117816031",
                    title: 'Item 1',
                    completed: false
                },
                {
                    id: 1,
                    userID: "2255443117816031",
                    title: 'Item 2',
                    completed: true
                },
                {
                    id: 2,
                    userID: "225544311781603x",
                    title: 'Item 3',
                    completed: false
                },
                {
                    id: 3,
                    userID: "2255443117816031",
                    title: 'Item 4',
                    completed: false
                },
                {
                    id: 4,
                    userID: "2255443117816031",
                    title: 'Item 5',
                    completed: true
                },
                {
                    id: 5,
                    userID: "225544311781603xx",
                    title: 'Item 6',
                    completed: false
                }
            ]
        };
    }

    onPress(parameter){
        this.setState({
            test: parameter
        });
    }

    updateTodosBy(updateFn){
        return (...args) => {
            this.setState({
                todos: updateFn(this.state.todos, ...args)
            });
        };
    }
    render(){
        // const { todos } = this.state;
        let { todos } = this.state;

        const { userID } = this.props;

        todos = todos.filter((todo) => todo.userID == userID);

        return <div>
            <p style={ooo}>I am red p</p>
            <p className='styles.xxx aaa'>I am red p</p>
            <p style={styles.xxx}>I am red p</p>
            <TodoHeader
                title = "我的待辦清單"
                username = "React"
                todoCount={todos.filter((todo) => !todo.completed).length}
            />
            <InputField
                placeholder = "新增待辦事項"
                onSubmitEditing={this.updateTodosBy(_createTodo)}
            />
            <p>{this.state.test}</p>
            <TodoList
                todos = {todos}
                onUpdateTodo={this.updateTodosBy(_updateTodo)}
                onToggleTodo={this.updateTodosBy(_toggleTodo)}
                onDeleteTodo={this.updateTodosBy(_deleteTodo)}
                // // 9-6. 呼叫 _deleteTodo，更新 todos 狀態
                // onDeleteTodo={
                //     (id) => this.setState({
                //         todos: _deleteTodo(todos, id)
                //     })
                // }
                // // 10-5. 呼叫 _toggleTodo，更新 todos 狀態
                // onToggleTodo={
                //     (id, completed) => this.setState({
                //         todos: _toggleTodo(todos, id, completed)
                //     })
                // }
                // // 10-1. 呼叫 _updateTodo，更新 todos 狀態
                // onUpdateTodo={
                //     (id, title) => this.setState({
                //         todos: _updateTodo(todos, id, title)
                //     })
                // }
            />
        </div>;
    }
}

export default TodoApp;


// css style

const ooo = {
    'color': 'red',
    'backgroundColor': 'yellow'
};

const xxx = {
    'fontSize': '50px'
};

const styles = {
    xxx: {
        'fontSize': '50px'
    }
};