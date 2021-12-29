import { useRef, useState } from 'react';
import classes from './AddSoldItemForm.module.css';

function AddSoldItemForm(props) {
    const today = new Date().toISOString().split('T')[0]; // eg. 2021-12-29
    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const conditionInputRef = useRef();
    const sizeInputRef = useRef();
    const imageLocationInputRef = useRef();
    const dateSoldInputRef = useRef();

    const paymentMethodInputRef = useRef();
    const paymentLocationInputRef = useRef();
    const sellMethodInputRef = useRef();
    const sellLocationInputRef = useRef();

    const [sellMethod, setSellMethod] = useState('dropping');
    const [paymentMethod, setPaymentMethod] = useState('cash on-hand');

    function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request

        // Holds the actual current value
        const itemName = nameInputRef.current.value;
        const itemPrice = priceInputRef.current.value;
        const itemCondition = conditionInputRef.current.value;
        const itemSize = sizeInputRef.current.value;
        const itemImageLocation = imageLocationInputRef.current.value;
        const itemDateSold = dateSoldInputRef.current.value;
        // Payment method
        const paymentMethodValue = paymentMethodInputRef.current.value;
        const paymentLocationValue = paymentLocationInputRef.current.value;
        // Sell method
        const sellMethodValue = sellMethodInputRef.current.value;
        const sellLocationValue = sellLocationInputRef.current.value;

        const soldItemFormData = {
            name: itemName,
            price: itemPrice,
            condition: itemCondition,
            size: itemSize,
            imageLocation: itemImageLocation,
            dateSold: itemDateSold,
            paymentMethod: paymentMethodValue,
            paymentLocation: paymentLocationValue,
            sellMethod: sellMethodValue,
            sellLocation: sellLocationValue,
        };

        props.onAddSoldItem(soldItemFormData);
    }

    function handleSellMethod(event) {
        setSellMethod(event.target.value);
    }

    function handlePaymentMethod(event) {
        setPaymentMethod(event.target.value);
    }

    let paymentLocationInput = '';
    if (paymentMethod === 'cash on-hand') {
        paymentLocationInput = <input type='text' id='location' ref={paymentLocationInputRef} />;
    } else if (paymentMethod === 'dropping area cashout') {
        paymentLocationInput = (
            <select id='paymentLocation' ref={paymentLocationInputRef} defaultValue='stall4'>
                <option value='stall4'>GP Arcade Stall 4</option>
                <option value='stall6'>GP Arcade Stall 6</option>
            </select>
        );
    } else if (paymentMethod === 'remittance') {
        paymentLocationInput = (
            <select id='paymentLocation' ref={paymentLocationInputRef} defaultValue='abest'>
                <option value='cebuana'>Cebuana</option>
                <option value='gcash'>GCash</option>
                <option value='lbc'>LBC</option>
                <option value='palawan'>Palawan Express</option>
                <option value='western'>Western Union</option>
            </select>
        );
    }

    let sellLocationInput = '';
    if (sellMethod === 'meetup') {
        sellLocationInput = <input type='text' id='location' ref={sellLocationInputRef} />;
    } else if (sellMethod === 'dropping') {
        sellLocationInput = (
            <select id='sellLocation' ref={sellLocationInputRef} defaultValue='stall4'>
                <option value='stall4'>GP Arcade Stall 4</option>
                <option value='stall6'>GP Arcade Stall 6</option>
            </select>
        );
    } else if (sellMethod === 'shipment') {
        sellLocationInput = (
            <select id='sellLocation' ref={sellLocationInputRef} defaultValue='abest'>
                <option value='abest'>ABest Express</option>
                <option value='jrs'>JRS</option>
                <option value='lbc'>LBC</option>
                <option value='partas'>Partas Waybill</option>
            </select>
        );
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
                <input type='text' id='imageLocation' ref={imageLocationInputRef} placeholder="https://" />

                <label htmlFor='dateSold'>Date Sold</label>
                <input type='date' required id='dateSold' ref={dateSoldInputRef} defaultValue={today} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='paymentMethod'>Payment method</label>
                <select id='paymentMethod' ref={paymentMethodInputRef} defaultValue='cash on-hand' onChange={handlePaymentMethod}>
                    <option value='cash on-hand'>Cash on-hand</option>
                    <option value='dropping area cashout'>Dropping area cashout</option>
                    <option value='remittance'>Remittance</option>
                </select>

                <label htmlFor='paymentLocation'>Payment location</label>
                {paymentLocationInput}
            </div>
            <div className={classes.grid}>
                <label htmlFor='sellMethod'>Sell method</label>
                <select id='sellMethod' ref={sellMethodInputRef} defaultValue='dropping' onChange={handleSellMethod}>
                    <option value='dropping'>Dropping</option>
                    <option value='meetup'>Meetup</option>
                    <option value='shipment'>Shipment</option>
                </select>

                <label htmlFor='sellLocation'>Sell Location</label>
                {sellLocationInput}
            </div>
            <div className={classes.actions}>
                <button>Add Sold Item</button>
            </div>
        </form>
    );
}

export default AddSoldItemForm;