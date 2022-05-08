import { React, useRef, useState } from 'react'
import {
    displayConditions,
    displaySizes,
    displayPaymentMethods,
    displaySellMethods,
} from '../../helpers/PopulateContent'
import { displayPaymentMethodLocation, displaySellMethodLocation } from '../../helpers/SoldItem'
import classes from './AddSoldItemForm.module.scss'

function AddSoldItemForm(props) {
    const today = new Date().toISOString().split('T')[0] // eg. 2021-12-29
    const nameInputRef = useRef()
    const priceInputRef = useRef()
    const conditionInputRef = useRef()
    const sizeInputRef = useRef()
    const dateSoldInputRef = useRef()

    const paymentMethodInputRef = useRef()
    const paymentLocationInputRef = useRef()
    const sellMethodInputRef = useRef()
    const sellLocationInputRef = useRef()

    const [sellMethod, setSellMethod] = useState('dropping')
    const [paymentMethod, setPaymentMethod] = useState('cash on-hand')
    const [imageFile, setImageFile] = useState() // Contains information on the currently picked file.

    function handleOnSubmit(event) {
        event.preventDefault() // Prevent the browser from sending another request

        // Holds the actual current value
        const itemName = nameInputRef.current.value
        const itemPrice = priceInputRef.current.value
        const itemCondition = conditionInputRef.current.value
        const itemSize = sizeInputRef.current.value
        const itemImage = imageFile
        const itemDateSold = dateSoldInputRef.current.value
        // Payment method
        const paymentMethodValue = paymentMethodInputRef.current.value
        const paymentLocationValue = paymentLocationInputRef.current.value
        // Sell method
        const sellMethodValue = sellMethodInputRef.current.value
        const sellLocationValue = sellLocationInputRef.current.value

        const soldItemFormData = {
            name: itemName,
            price: itemPrice,
            condition: itemCondition,
            size: itemSize,
            imageLocation: itemImage, // imageLocation
            dateSold: itemDateSold,
            paymentMethod: paymentMethodValue,
            paymentLocation: paymentLocationValue,
            sellMethod: sellMethodValue,
            sellLocation: sellLocationValue,
        }

        props.onAddSoldItem(soldItemFormData)
    }

    // REF: https://www.pluralsight.com/guides/uploading-files-with-reactjs
    function handleChangeFile(event) {
        console.log('LOG: File is chosen')
		setImageFile(event.target.files[0]) // An object that contains the details of files selected to be uploaded in a form
	}

    function handleSellMethod(event) {
        setSellMethod(event.target.value)
    }

    function handlePaymentMethod(event) {
        setPaymentMethod(event.target.value)
    }

    return (
        <form className={classes.form} onSubmit={handleOnSubmit} encType='multipart/form-data'>
            <div className={classes.grid}>
                <label htmlFor='title'>Name</label>
                <input type='text' id='name' required ref={nameInputRef} />

                <label htmlFor='price'>Price</label>
                <input type='text' id='price' required ref={priceInputRef} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='condition'>Condition</label>
                <select id='condition' ref={conditionInputRef} defaultValue='new'>
                    {displayConditions()}
                </select>

                <label htmlFor='size'>Size</label>
                <select id='size' ref={sizeInputRef} defaultValue='N/A'>
                    {displaySizes()}
                </select>
            </div>
            <div className={classes.grid}>
                <label htmlFor='imageLocation'>Image</label>
                <input type='file' id='imageLocation' name="imageFile" onChange={handleChangeFile} />

                <label htmlFor='dateSold'>Date Sold</label>
                <input type='date' required id='dateSold' ref={dateSoldInputRef} defaultValue={today} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='paymentMethod'>Payment method</label>
                <select id='paymentMethod' ref={paymentMethodInputRef} defaultValue='cash on-hand' onChange={handlePaymentMethod}>
                    {displayPaymentMethods()}
                </select>

                <label htmlFor='paymentLocation'>Payment location</label>
                {displayPaymentMethodLocation(paymentMethod, paymentLocationInputRef)}
            </div>
            <div className={classes.grid}>
                <label htmlFor='sellMethod'>Sell method</label>
                <select id='sellMethod' ref={sellMethodInputRef} defaultValue='dropping' onChange={handleSellMethod}>
                    {displaySellMethods()}
                </select>

                <label htmlFor='sellLocation'>Sell Location</label>
                {displaySellMethodLocation(sellMethod, sellLocationInputRef)}
            </div>
            <div className={classes.actions}>
                <button>Add Sold Item</button>
            </div>
        </form>
    )
}

export default AddSoldItemForm