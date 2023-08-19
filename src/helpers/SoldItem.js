import React from 'react'
import { Form } from 'react-bootstrap'
import {
    displayDroppingAreas,
    displayRemittanceCenters,
    displayShipmentCenters
} from './PopulateContent'

export const displayPaymentMethodLocation = (paymentMethod, paymentLocationInputRef) => {
    let paymentLocationInput = ''

    if (paymentMethod === 'cash on-hand') {
        paymentLocationInput = <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='location' ref={paymentLocationInputRef} />
    } else if (paymentMethod === 'dropping area cashout') {
        paymentLocationInput = (
            <Form.Select className='col-12 col-sm col-md col-lg' id='paymentLocation' ref={paymentLocationInputRef} defaultValue='GP Arcade Stall 4'>
                {displayDroppingAreas()}
            </Form.Select>
        )
    } else if (paymentMethod === 'remittance') {
        paymentLocationInput = (
            <Form.Select className='col-12 col-sm col-md col-lg' id='paymentLocation' ref={paymentLocationInputRef} defaultValue='Cebuana'>
                {displayRemittanceCenters()}
            </Form.Select>
        )
    }
    return paymentLocationInput
}

export const displaySellMethodLocation = (sellMethod, sellLocationInputRef) => {
    let sellLocationInput = ''
    if (sellMethod === 'meetup') {
        sellLocationInput = <Form.Control className='col-12 col-sm col-md col-lg' type='text' id='location' ref={sellLocationInputRef} />
    } else if (sellMethod === 'dropping') {
        sellLocationInput = (
            <Form.Select className='col-12 col-sm col-md col-lg' id='sellLocation' ref={sellLocationInputRef} defaultValue='GP Arcade Stall 4'>
                {displayDroppingAreas()}
            </Form.Select>
        )
    } else if (sellMethod === 'shipment') {
        sellLocationInput = (
            <Form.Select className='col-12 col-sm col-md col-lg' id='sellLocation' ref={sellLocationInputRef} defaultValue='ABest Express'>
                {displayShipmentCenters()}
            </Form.Select>
        )
    }

    return sellLocationInput
}

const soldItemHelpers = { displayPaymentMethodLocation, displaySellMethodLocation }

export default soldItemHelpers