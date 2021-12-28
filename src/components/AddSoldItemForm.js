import { useRef } from 'react';
import classes from './AddSoldItemForm.module.css';

function AddSoldItemForm(props) {
    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const conditionInputRef = useRef();
    const sizeInputRef = useRef();
    const imageLocationInputRef = useRef();
    const dateSoldInputRef = useRef();

    function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request

        // Holds the actual current value
        const itemName = nameInputRef.current.value;
        const itemPrice = priceInputRef.current.value;
        const itemCondition = conditionInputRef.current.value;
        const itemSize = sizeInputRef.current.value;
        const itemImageLocation = imageLocationInputRef.current.value;
        const itemDateSold = dateSoldInputRef.current.value;

        const soldItemFormData = {
            name: itemName,
            price: itemPrice,
            condition: itemCondition,
            size: itemSize,
            imageLocation: itemImageLocation,
            dateSold: itemDateSold,
        };

        props.onAddSoldItem(soldItemFormData);
    }
    return (
        <form className={classes.form} onSubmit={handleOnSubmit}>
            <div className={classes.grid}>
                <label htmlFor='title'>Name</label>
                <input type='text' id='name' required ref={nameInputRef} />

                <label htmlFor='price'>Price</label>
                <input type='text' id='price' required ref={priceInputRef} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='condition'>Condition</label>
                <select id='condition' ref={conditionInputRef} defaultValue='new'>
                    <option value='healthy'>healthy</option>
                    <option value='new'>new</option>
                    <option value='used'>used</option>
                </select>

                <label htmlFor='size'>Size</label>
                <select id='size' ref={sizeInputRef} defaultValue='N/A'>
                    <option value='S'>Small</option>
                    <option value='M'>Medium</option>
                    <option value='L'>Large</option>
                    <option value='XL'>XL</option>
                    <option value='XXL'>XXL</option>
                    <option value='N/A'>Not applicable</option>
                </select>
            </div>
            <div className={classes.grid}>
                <label htmlFor='imageLocation'>Image Location</label>
                <input type='text' required id='imageLocation' ref={imageLocationInputRef} />

                <label htmlFor='dateSold'>Date Sold</label>
                <input type='date' required id='dateSold' ref={dateSoldInputRef} />
            </div>
            <div className={classes.actions}>
                <button>Add Sold Item</button>
            </div>
        </form>
    );
}

export default AddSoldItemForm;