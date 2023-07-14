import { React, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Unauthorized from '../ui/Alerts/Unauthorized'
import Loading from '../ui/Spinners/Loading'
import { SendGetRequest, SendPostMultipartRequest } from '../../helpers/SendApiRequest'
import {
    displayConditions,
    displaySizes,
    displayPaymentMethods,
    displaySellMethods,
    displayDroppingAreas,
    displayRemittanceCenters,
    displayShipmentCenters,
} from '../../helpers/PopulateContent'
import classes from './EditSoldItemForm.module.scss'

function EditSoldItemForm(props) {
    const auth = useSelector((state) => state.auth.value)

    const nameInputRef = useRef()
    const priceInputRef = useRef()
    const conditionInputRef = useRef()
    const sizeInputRef = useRef()
    const dateSoldInputRef = useRef()

    const paymentMethodInputRef = useRef()
    const paymentLocationInputRef = useRef()
    const sellMethodInputRef = useRef()
    const sellLocationInputRef = useRef()

    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [soldItem, setSoldItem] = useState([])
    const [soldItemsUpdatedErrors, setSoldItemsUpdatedErrors] = useState({})
    const [paymentMethod, setPaymentMethod] = useState()
    const [paymentLocation, setPaymentLocation] = useState()
    const [sellMethod, setSellMethod] = useState()
    const [sellLocation, setSellLocation] = useState()
    const [imageFile, setImageFile] = useState() // Contains information on the currently picked file
    const [condition, setCondition] = useState()
    const [size, setSize] = useState()

    const navigate = useNavigate()

    const params = useParams()
    const soldItemId = params.soldItemId ? params.soldItemId : props.id

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/soldItems/${soldItemId}`)
            if (!response.error) {
                setSoldItem(response)

                // Set default values of dropdowns based on sold item data
                setCondition(response.condition)
                setSize(response.size)
                setPaymentMethod(response.PaymentMethod.method)
                setPaymentLocation(response.PaymentMethod.remittanceLocation)
                setSellMethod(response.SellMethod.method)
                setSellLocation(response.SellMethod.location)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken, soldItemId, soldItemsUpdatedErrors])

    async function handleOnSubmit(event) {
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

        const editFormData = {
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

        const formData = new FormData()
        for (const [key, value] of Object.entries(editFormData)) {
            if (key === 'imageLocation') {
                formData.append('imageFile', value)
            } else {
                formData.append(key, value)
            }
        }

        const response = await SendPostMultipartRequest(auth.bearerToken, `api/soldItems/${soldItemId}/update`, formData)
        if (response.error) {
            setSoldItemsUpdatedErrors(response.errorList.errors)
        } else {
            console.log('LOG: Sold item updated', response)
            setSoldItemsUpdatedErrors({})

            navigate('/archive')
        }
    }

    // REF: https://www.pluralsight.com/guides/uploading-files-with-reactjs
    function handleChangeFile(event) {
        console.log('LOG: File is chosen')
		setImageFile(event.target.files[0]) // An object that contains the details of files selected to be uploaded in a form
	}

    function handleOnChange(event, name) {
        if (name === 'condition') setCondition(event.target.value)
        if (name === 'size') setSize(event.target.value)
        if (name === 'paymentMethod') setPaymentMethod(event.target.value)
        if (name === 'paymentLocation') setPaymentLocation(event.target.value)
        if (name === 'sellMethod') setSellMethod(event.target.value)
        if (name === 'sellLocation') setSellLocation(event.target.value)
    }

    function displayPaymentMethodLocation (paymentMethod, paymentLocationInputRef, value = false) {
        let paymentLocationInput = ''

        if (paymentMethod === 'cash on-hand') {
            const defValue = value ? value : ''

            paymentLocationInput = <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='location' ref={paymentLocationInputRef} defaultValue={defValue} />
        } else if (paymentMethod === 'dropping area cashout') {
            const defValue = value ? value : 'GP Arcade Stall 4'

            paymentLocationInput = (
                <Form.Select className='col-12 col-sm col-md col-lg' id='paymentLocation' ref={paymentLocationInputRef} value={defValue} onChange={(e) => handleOnChange(e, 'paymentLocation')}>
                    {displayDroppingAreas()}
                </Form.Select>
            )
        } else if (paymentMethod === 'remittance') {
            const defValue = value ? value : 'Cebuana'

            paymentLocationInput = (
                <Form.Select className='col-12 col-sm col-md col-lg' id='paymentLocation' ref={paymentLocationInputRef} value={defValue} onChange={(e) => handleOnChange(e, 'paymentLocation')}>
                    {displayRemittanceCenters()}
                </Form.Select>
            )
        }
        return paymentLocationInput
    }

    function displaySellMethodLocation (sellMethod, sellLocationInputRef, value = false) {
        let sellLocationInput = ''

        if (sellMethod === 'meetup') {
            const defValue = value ? value : ''

            sellLocationInput = <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='location' ref={sellLocationInputRef} defaultValue={defValue} />
        } else if (sellMethod === 'dropping') {
            const defValue = value ? value : 'GP Arcade Stall 4'

            sellLocationInput = (
                <Form.Select className='col-12 col-sm col-md col-lg' id='sellLocation' ref={sellLocationInputRef} value={defValue} onChange={(e) => handleOnChange(e, 'sellLocation')}>
                    {displayDroppingAreas()}
                </Form.Select>
            )
        } else if (sellMethod === 'shipment') {
            const defValue = value ? value : 'ABest Express'

            sellLocationInput = (
                <Form.Select className='col-12 col-sm col-md col-lg' id='sellLocation' ref={sellLocationInputRef} value={defValue} onChange={(e) => handleOnChange(e, 'sellLocation')}>
                    {displayShipmentCenters()}
                </Form.Select>
            )
        }

        return sellLocationInput
    }

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <Form className={classes.form} onSubmit={handleOnSubmit} encType='multipart/form-data'>
            <p>You are editing: <strong>{soldItem.name}</strong></p>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='title'>Name</Form.Label>
                        <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='name' ref={nameInputRef} defaultValue={soldItem.name} />
                        {soldItemsUpdatedErrors.name ? <small className='text-danger'>{soldItemsUpdatedErrors.name}</small> : ''}
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='price'>Price</Form.Label>
                        <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='price' ref={priceInputRef} defaultValue={soldItem.price} />
                        {soldItemsUpdatedErrors.price ? <small className='text-danger'>{soldItemsUpdatedErrors.price}</small> : ''}
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='condition'>Condition</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='condition' ref={conditionInputRef} value={condition} onChange={(e) => handleOnChange(e, 'condition')}>
                            {displayConditions()}
                        </Form.Select>
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='size'>Size</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='size' ref={sizeInputRef} value={size} onChange={(e) => handleOnChange(e, 'size')}>
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
                        <Form.Control className='col-12 col-sm col-md col-lg' type='date' id='dateSold' ref={dateSoldInputRef} defaultValue={soldItem.dateSold} />
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='paymentMethod'>Payment method</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='paymentMethod' ref={paymentMethodInputRef} value={paymentMethod} onChange={(e) => handleOnChange(e, 'paymentMethod')}>
                            {displayPaymentMethods()}
                        </Form.Select>
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='paymentLocation'>Payment location</Form.Label>
                        {displayPaymentMethodLocation(paymentMethod, paymentLocationInputRef, paymentLocation)}
                    </Row>
                </Col>
            </Row>
            <Row className='mb-3'>
                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='sellMethod'>Sell method</Form.Label>
                        <Form.Select className='col-12 col-sm col-md col-lg' id='sellMethod' ref={sellMethodInputRef} value={sellMethod} onChange={(e) => handleOnChange(e, 'sellMethod')}>
                            {displaySellMethods()}
                        </Form.Select>
                    </Row>
                </Col>

                <Col xs={12} sm={6}>
                    <Row className='align-items-center'>
                        <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='sellLocation'>Sell Location</Form.Label>
                        {displaySellMethodLocation(sellMethod, sellLocationInputRef, sellLocation)}
                    </Row>
                </Col>
            </Row>
            <div className={`text-end ${classes.actions}`}>
                <Button className='fw-bold' type='submit'>Edit Sold Item</Button>
            </div>
        </Form>
    )
}

export default EditSoldItemForm