import './App.css';
import React, { Component } from 'react';
import InputTodo from "./components/InputComponent";
import TodoListComponent from './components/TodoListComponent';
import { v4 as uuidv4 } from 'uuid';


export interface formOfItem {
    Id: string,
    title: string,
    isCompleted: string
}

interface myState {
  todos: formOfItem [],
  filterValue: string
}






class App extends Component<object, myState> {

  state: myState = {
    todos: [],
    filterValue: "all"
  }


  handleAddTodo = (value: string) => {


    if((value).trim() !== "") {
      let addTodos: formOfItem = {
        Id: uuidv4(),
        title: value,
        isCompleted: 'todo'
      };

      this.setState({
        todos: [...this.state.todos, addTodos]
      }, () => {
        localStorage.setItem("todos", JSON.stringify(this.state.todos));
      })
    };
  };


  toggleCompleted = (id: string) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if(todo.Id === id) {
          return {
            ...todo,
            isCompleted: todo.isCompleted === "todo" ? "done" : "todo"
          }
        }
        return todo;
      })
    }, () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    })
  };
  


  handleDeleteTodo = (todoId: string) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.Id !== todoId)
    }), () => {
      localStorage.setItem("todos", JSON.stringify(this.state.todos));
    });
  };


  filterList = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      filterValue: e.target.value
    })
  };


  componentDidMount() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      this.setState({ todos: JSON.parse(storedTodos) });
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="heading">Let's add what you have to do!</div>
        <p className="heading-text">
          Fill the input and click button or "Enter" to add a new task into the
          list. To mark as completed, just click directly to the task
        </p>
        <InputTodo
          handleAddTodo={this.handleAddTodo}
        />
        <TodoListComponent
          todos={this.state.todos}
          handleDeleteTodo={this.handleDeleteTodo} 
          toggleCompleted={this.toggleCompleted}
          filterValue={this.state.filterValue}
          filterList={this.filterList}
        />
      </div>
    );
  }
}


export default App;
