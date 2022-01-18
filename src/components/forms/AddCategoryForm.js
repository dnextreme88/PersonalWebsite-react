import { React, useRef } from 'react'
import classes from './AddCategoryForm.module.css'

function AddCategoryForm(props) {
    const nameInputRef = useRef()

    function handleOnSubmit(event) {
        event.preventDefault() // Prevent the browser from sending another request

        // Holds the actual current value
        const categoryName = nameInputRef.current.value

        props.onAddCategory({ name: categoryName })
    }

    return (
        <form className={classes.form} onSubmit={handleOnSubmit}>
            <p>Add a new category:</p>
            <div className={classes.grid}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} />

                <div className={classes.actions}>
                    <button>Add Category</button>
                </div>
            </div>
        </form>
    )
}

export default AddCategoryForm