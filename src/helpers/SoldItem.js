export const displayPaymentMethodLocation = (paymentMethod, paymentLocationInputRef) => {
    let paymentLocationInput = '';

    if (paymentMethod === 'cash on-hand') {
        paymentLocationInput = <input type='text' id='location' ref={paymentLocationInputRef} />;
    } else if (paymentMethod === 'dropping area cashout') {
        paymentLocationInput = (
            <select id='paymentLocation' ref={paymentLocationInputRef} defaultValue='stall4'>
                <option value='GP Arcade Stall 4'>GP Arcade Stall 4</option>
                <option value='GP Arcade Stall 6'>GP Arcade Stall 6</option>
            </select>
        );
    } else if (paymentMethod === 'remittance') {
        paymentLocationInput = (
            <select id='paymentLocation' ref={paymentLocationInputRef} defaultValue='abest'>
                <option value='Cebuana'>Cebuana</option>
                <option value='GCash'>GCash</option>
                <option value='LBC'>LBC</option>
                <option value='Palawan Express'>Palawan Express</option>
                <option value='Western Union'>Western Union</option>
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
            <select id='sellLocation' ref={sellLocationInputRef} defaultValue='stall4'>
                <option value='GP Arcade Stall 4'>GP Arcade Stall 4</option>
                <option value='GP Arcade Stall 6'>GP Arcade Stall 6</option>
            </select>
        );
    } else if (sellMethod === 'shipment') {
        sellLocationInput = (
            <select id='sellLocation' ref={sellLocationInputRef} defaultValue='abest'>
                <option value='ABest Express'>ABest Express</option>
                <option value='JRS'>JRS</option>
                <option value='LBC'>LBC</option>
                <option value='Partas Waybill'>Partas Waybill</option>
            </select>
        );
    }

    return sellLocationInput;
}

const soldItemHelpers = { displayPaymentMethodLocation, displaySellMethodLocation };

export default soldItemHelpers;