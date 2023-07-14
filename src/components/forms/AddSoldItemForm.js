import { React, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
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
        <Form className={classes.form} onSubmit={handleOnSubmit} encType='multipart/form-data'>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='title'>Name</Form.Label>
                        <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='name' required ref={nameInputRef} />
                        {props.errorList.name ? <small className='text-danger'>{props.errorList.name}</small> : ''}
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='price'>Price</Form.Label>
                        <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='price' required ref={priceInputRef} />
                        {props.errorList.price ? <small className='text-danger'>{props.errorList.price}</small> : ''}
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='condition'>Condition</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='condition' ref={conditionInputRef} defaultValue='new'>
                            {displayConditions()}
                        </Form.Select>
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='size'>Size</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='size' ref={sizeInputRef} defaultValue='N/A'>
                            {displaySizes()}
                        </Form.Select>
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='imageLocation'>Image</Form.Label>
                        <Form.Control className='col-12 col-sm col-md col-lg' type='file' id='imageLocation' name="imageFile" onChange={handleChangeFile} />
                        </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='dateSold'>Date Sold</Form.Label>
                        <Form.Control className='col-12 col-sm col-md col-lg' type='date' required id='dateSold' ref={dateSoldInputRef} defaultValue={today} />
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='paymentMethod'>Payment method</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='paymentMethod' ref={paymentMethodInputRef} defaultValue='cash on-hand' onChange={handlePaymentMethod}>
                            {displayPaymentMethods()}
                        </Form.Select>
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='paymentLocation'>Payment location</Form.Label>
                        {displayPaymentMethodLocation(paymentMethod, paymentLocationInputRef)}
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='sellMethod'>Sell method</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='sellMethod' ref={sellMethodInputRef} defaultValue='dropping' onChange={handleSellMethod}>
                            {displaySellMethods()}
                        </Form.Select>
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='sellLocation'>Sell Location</Form.Label>
                        {displaySellMethodLocation(sellMethod, sellLocationInputRef)}
                    </Row>
                </Col>
            </Row>
            <div className={`text-end ${classes.actions}`}>
                <Button className='fw-bold' type='submit'>Add Sold Item</Button>
            </div>
        </Form>
    )
}

export default AddSoldItemForm