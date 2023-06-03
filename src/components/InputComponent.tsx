import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';

interface IProps {
    handleAddTodo: (value: string) => void;
}

interface MyState {
    content: string
}

class InputTodo extends Component<IProps, MyState> {
    state: MyState = {
        content: ""
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            content: e.target.value
        })
    }

    render() {

        return(
            <div className="input-wrapper">
                <form onSubmit={() => this.props.handleAddTodo(this.state.content)}>
                    <input type="text" value = {this.state.content} className="input" onChange={this.handleInputChange} />
                </form>
                <button type="submit" className="add-button">
                    <FontAwesomeIcon icon={faPlus} size="xl" onClick={(e) => this.props.handleAddTodo(this.state.content)} />
                </button>
            </div>
        );
    }
}


export default InputTodo;