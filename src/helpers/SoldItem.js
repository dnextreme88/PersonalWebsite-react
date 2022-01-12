import { displayDroppingAreas, displayRemittanceCenters, displayShipmentCenters } from "./PopulateContent";

export const displayPaymentMethodLocation = (paymentMethod, paymentLocationInputRef) => {
    let paymentLocationInput = '';

    if (paymentMethod === 'cash on-hand') {
        paymentLocationInput = <input type='text' id='location' ref={paymentLocationInputRef} />;
    } else if (paymentMethod === 'dropping area cashout') {
        paymentLocationInput = (
            <select id='paymentLocation' ref={paymentLocationInputRef} defaultValue='GP Arcade Stall 4'>
                {displayDroppingAreas()}
            </select>
        );
    } else if (paymentMethod === 'remittance') {
        paymentLocationInput = (
            <select id='paymentLocation' ref={paymentLocationInputRef} defaultValue='Cebuana'>
                {displayRemittanceCenters()}
            </select>
        );
    }
    return paymentLocationInput;
}

export const displaySellMethodLocation = (sellMethod, sellLocationInputRef) => {
    let sellLocationInput = '';
    if (sellMethod === 'meetup') {
        sellLocationInput = <input type='text' id='location' ref={sellLocationInputRef} />;
    } else if (sellMethod === 'dropping') {
        sellLocationInput = (
            <select id='sellLocation' ref={sellLocationInputRef} defaultValue='GP Arcade Stall 4'>
                {displayDroppingAreas()}
            </select>
        );
    } else if (sellMethod === 'shipment') {
        sellLocationInput = (
            <select id='sellLocation' ref={sellLocationInputRef} defaultValue='ABest Express'>
                {displayShipmentCenters()}
            </select>
        );
    }

    return sellLocationInput;
}

const soldItemHelpers = { displayPaymentMethodLocation, displaySellMethodLocation };

export default soldItemHelpers;