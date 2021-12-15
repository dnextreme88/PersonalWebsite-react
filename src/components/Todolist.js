import React, { useState } from "react";
import TodoItem from "./TodoItem";

const Todolist = () => {
    const [state, setState] = useState({
        todo: '',
        isUpdate: false,
        todolist: []
    })

    const [edit, setEdit] = useState({
        editTodo: '',
        editIndex: ''
    })

    const [isUpdate, setIsUpdate] = useState(false)

    const { todo, todolist } = state
    const { editTodo, editIndex } = edit

    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target

        setEdit({ ...edit, [name]: value })
    }

    const handleOnClickEdit = (index, value) => {
        setIsUpdate(true)
        setEdit({ editTodo: value, editIndex: index })
    }

    const handleOnClickEditCancel = () => {
        setIsUpdate(false)
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setState({ ...state, [name]: value })
    }

    /* CREATE */
    const createTodo = () => {
        const list = todolist
        list.push(todo)

        setState({ todo: '', todolist: list })
    }

    /* DELETE */
    const deleteTodo = (index) => {
        const list = todolist
        list.splice(index, 1)

        setState({ todo: '', todolist: list })
    }

    /* UPDATE */
    const updateTodo = (index) => {
        const list = todolist
        list[index] = editTodo

        setState({ ...state, todolist: list })
        setIsUpdate(false)
        setEdit({ editTodo: '', editIndex: '' })
    }


    return (
        <div className="todolist-main">
            <div className="form-wrapper">
                <input
                    type="text" 
                    name="todo"
                    placeholder="Create todolist"
                    value={todo}
                    onChange={handleOnChange}
                />
                <button onClick={createTodo}>Add</button>
            </div>
            <div className="table-main">
                <div className="header-wrapper">
                    <span>To Do</span>
                    <span>Action</span>
                </div>
                {todolist.length ?
                    todolist.map((value, index) => (
                        <TodoItem
                            key={index}
                            value={value}
                            index={index}
                            handleOnClickEdit={handleOnClickEdit}
                            deleteTodo={deleteTodo}
                        />
                    )) :
                    <span>No records found!</span>
                }
                {
                    isUpdate ?
                        <div className="form-wrapper">
                            <span>Index: {editIndex}</span>
                            <input
                                type="text" 
                                name="editTodo"
                                placeholder="Update todo"
                                value={editTodo}
                                onChange={handleOnChangeEdit}
                            />
                            <button onClick={() => updateTodo(editIndex)}>Update</button>
                            <button onClick={handleOnClickEditCancel}>Cancel</button>
                        </div> :
                    ''
                }
            </div>
        </div>
    )
}

export default Todolist
