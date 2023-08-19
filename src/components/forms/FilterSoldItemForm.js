import { React, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import {
    displayConditions,
    displaySizes,
    displayPaymentMethods,
    displaySellMethods,
} from '../../helpers/PopulateContent'
import classes from './FilterSoldItemForm.module.scss'

function FilterSoldItemForm(props) {
    const brandInputRef = useRef()
    const typeInputRef = useRef()
    const monthInputRef = useRef()
    const yearInputRef = useRef()
    const conditionInputRef = useRef()
    const sizeInputRef = useRef()
    const paymentMethodInputRef = useRef()
    const sellMethodInputRef = useRef()

    const [monthValue, setMonth] = useState('')
    const [yearValue, setYear] = useState('')
    const [conditionValue, setCondition] = useState('')
    const [sizeValue, setSize] = useState('')
    const [paymentMethodValue, setPaymentMethod] = useState('')
    const [sellMethodValue, setSellMethod] = useState('')

    function handleOnSubmit(event) {
        event.preventDefault() // Prevent the browser from sending another request
    }

    function handleFilterResults() {
        // Holds the actual current value
        const brand = brandInputRef.current.value
        const type = typeInputRef.current.value
        const month = monthInputRef.current.value
        const year = yearInputRef.current.value
        const condition = conditionInputRef.current.value
        const size = sizeInputRef.current.value
        const paymentMethod = paymentMethodInputRef.current.value
        const sellMethod = sellMethodInputRef.current.value

        props.onFilterSoldItem({ brand, type, month, year, condition, size, paymentMethod, sellMethod })
    }

    function handleOnChange(event, name) {
        if (name === 'month') setMonth(event.target.value)
        if (name === 'year') setYear(event.target.value)
        if (name === 'condition') setCondition(event.target.value)
        if (name === 'size') setSize(event.target.value)
        if (name === 'paymentMethod') setPaymentMethod(event.target.value)
        if (name === 'sellMethod') setSellMethod(event.target.value)
    }

    function handleShowAllResults() {
        setMonth('')
        setYear('')
        setCondition('')
        setSize('')
        setPaymentMethod('')
        setSellMethod('')
        // Reset value of dropdowns back
        brandInputRef.current.value = ''
        typeInputRef.current.value = ''
        monthInputRef.current.value = ''
        yearInputRef.current.value = ''
        conditionInputRef.current.value = ''
        sizeInputRef.current.value = ''
        paymentMethodInputRef.current.value = ''
        sellMethodInputRef.current.value = ''

        props.onFilterSoldItem({ brand: '', type: '', month: '', year: '', condition: '', size: '', paymentMethod: '', sellMethod: '' })
    }

    return (
        <div>
            <p>Filter sold items based on the following parameters:</p>
            <Form className={classes.form} onSubmit={handleOnSubmit}>
                <Row className='mb-3'>
                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='brand'>Brand</Form.Label>
                            <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='brand' ref={brandInputRef} />
                        </Row>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='type'>Type</Form.Label>
                            <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='type' ref={typeInputRef} />
                        </Row>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='month'>Month</Form.Label>
                            <Form.Select className='col-12 col-sm col-md col-lg' id='month' ref={monthInputRef} defaultValue={monthValue} onChange={handleOnChange('month')}>
                                <option value='01'>January</option>
                                <option value='02'>February</option>
                                <option value='03'>March</option>
                                <option value='04'>April</option>
                                <option value='05'>May</option>
                                <option value='06'>June</option>
                                <option value='07'>July</option>
                                <option value='08'>August</option>
                                <option value='09'>September</option>
                                <option value='10'>October</option>
                                <option value='11'>November</option>
                                <option value='12'>December</option>
                                <option value=''>SHOW ALL</option>
                            </Form.Select>
                        </Row>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='year'>Year</Form.Label>
                            <Form.Select className='col-12 col-sm col-md col-lg' id='year' ref={yearInputRef} defaultValue={yearValue} onChange={handleOnChange('year')}>
                                <option value='2014'>2014</option>
                                <option value='2015'>2015</option>
                                <option value='2016'>2016</option>
                                <option value='2017'>2017</option>
                                <option value='2018'>2018</option>
                                <option value='2019'>2019</option>
                                <option value='2020'>2020</option>
                                <option value='2021'>2021</option>
                                <option value='2022'>2022</option>
                                <option value='2023'>2023</option>
                                <option value=''>SHOW ALL</option>
                            </Form.Select>
                        </Row>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='condition'>Condition</Form.Label>
                            <Form.Select className='col-12 col-sm col-md col-lg' id='condition' ref={conditionInputRef} defaultValue={conditionValue} onChange={handleOnChange('condition')}>
                                {displayConditions()}
                                <option value=''>SHOW ALL</option>
                            </Form.Select>
                        </Row>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='size'>Size</Form.Label>
                            <Form.Select className='col-12 col-sm col-md col-lg' id='size' ref={sizeInputRef} defaultValue={sizeValue} onChange={handleOnChange('size')}>
                                {displaySizes()}
                                <option value=''>SHOW ALL</option>
                            </Form.Select>
                        </Row>
                    </Col>
                </Row>
                <Row className='mb-3'>
                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='paymentMethod'>Payment method</Form.Label>
                            <Form.Select className='col-12 col-sm col-md col-lg' id='paymentMethod' ref={paymentMethodInputRef} defaultValue={paymentMethodValue} onChange={handleOnChange('paymentMethod')}>
                                {displayPaymentMethods()}
                                <option value=''>SHOW ALL</option>
                            </Form.Select>
                        </Row>
                    </Col>

                    <Col xs={12} sm={6}>
                        <Row className='align-items-center'>
                            <Form.Label className='col-12 col-sm-7 col-md-6 col-lg-5 fw-bold' htmlFor='sellMethod'>Sell method</Form.Label>
                            <Form.Select className='col-12 col-sm col-md col-lg' id='sellMethod' ref={sellMethodInputRef} defaultValue={sellMethodValue} onChange={handleOnChange('sellMethod')}>
                                {displaySellMethods()}
                                <option value=''>SHOW ALL</option>
                            </Form.Select>
                        </Row>
                    </Col>
                </Row>
                <div className={`d-flex justify-content-center text-center ${classes.actions}`}>
                    <Button className={`fw-bold ${classes.filter}`} onClick={handleFilterResults}>Filter Results</Button>
                    <Button className={`fw-bold ${classes.showAll}`} onClick={handleShowAllResults}>Show ALL Results</Button>
                </div>
            </Form>
        </div>
    )
}

export default FilterSoldItemForm