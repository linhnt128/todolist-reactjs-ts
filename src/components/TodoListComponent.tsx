import React, { Component, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { formOfItem } from '../App';


interface IProps {
    todos: formOfItem [];
    filterValue: string;
    filterList: (e: React.ChangeEvent<HTMLSelectElement>) => void
    toggleCompleted: (id: string) => void
    handleDeleteTodo: (id: string) => void
}



class TodoListComponent extends Component<IProps> {
    


    render() {
        const todosArray: formOfItem[] = this.props.todos;
        const filterValue: string = this.props.filterValue;

        const filterTodos = todosArray.filter((todo) => {
            if(filterValue === "all") {
                return true;
            }
            else if(filterValue === "todo") {
                return todo.isCompleted === "todo";
            }
            else{
                return todo.isCompleted === "done";
            }
        })

        return (
            <div className="list-wrapper">
                <div className="list-heading">
                    <div className="list-heading-text">List:</div>
                    <select 
                        className="list-heading-select"
                        value={filterValue} 
                        onChange={this.props.filterList}
                    >
                        <option value="all">All</option>
                        <option value="todo">To do</option>
                        <option value="done">Done</option>
                    </select>
                </div>
                <div className="list-content">
                    <ol>
                        {
                            filterTodos.length > 0 && filterTodos.map((todo) => {
                                const todoClass = todo.isCompleted === "done" ? "todo-title-done" : "todo-title"
                                return (
                                    <li key={todo.Id}>
                                        <a className={todoClass} onClick={() => this.props.toggleCompleted(todo.Id)}>
                                            {todo.title}
                                        </a>
                                        <a onClick={() => this.props.handleDeleteTodo(todo.Id)}>
                                            <FontAwesomeIcon icon={faTrashCan} size="xs" className="trash-can"/>
                                        </a>
                                    </li>
                                )
                            })
                        }
                    </ol>
                </div>
            </div>
        )
    } 
}




export default memo(TodoListComponent);