import React, { Component } from 'react';
import TodoItem from './TodoItem';
import SignUpLoginTemplate from "../member/SignUpLoginTemplate";

class TodoList extends React.Component{
    render(){
        const { todos } = this.props;
        const { onDeleteTodo } = this.props;
        const  { onToggleTodo } = this.props;
        // 教材上沒寫
        const  { onUpdateTodo } = this.props;
        const todoElements = todos.map((todo) =>
            (<li key={todo.id}>
                <TodoItem
                    title = {todo.title}
                    completed = {todo.completed}
                    onDelete={() => onDeleteTodo && onDeleteTodo(todo.id)}
                    onToggle={(completed) => onToggleTodo && onToggleTodo(todo.id, completed)}
                    // 教材上沒寫
                    onUpdate={(content) => onUpdateTodo && onUpdateTodo(todo.id, content)}
                />
            </li>)
        )

        return <ul>{todoElements}</ul>;
    }
}

export default TodoList;