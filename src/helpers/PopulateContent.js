export const displayConditions = () => {
    return (
        <>
        <option value='healthy'>healthy</option>
        <option value='new'>new</option>
        <option value='used'>used</option>
        </>
    )
}

export const displaySizes = () => {
    return (
        <>
        <option value='S'>Small</option>
        <option value='M'>Medium</option>
        <option value='L'>Large</option>
        <option value='XL'>XL</option>
        <option value='XXL'>XXL</option>
        <option value='N/A'>Not applicable</option>
        </>
    )
}

export const displayPaymentMethods = () => {
    return (
        <>
        <option value='cash on-hand'>Cash on-hand</option>
        <option value='dropping area cashout'>Dropping area cashout</option>
        <option value='remittance'>Remittance</option>
        </>
    )
}

export const displaySellMethods = () => {
    return (
        <>
        <option value='dropping'>Dropping</option>
        <option value='meetup'>Meetup</option>
        <option value='shipment'>Shipment</option>
        </>
    )
}

export const displayDroppingAreas = () => {
    return (
        <>
        <option value='GP Arcade Stall 4'>GP Arcade Stall 4</option>
        <option value='GP Arcade Stall 6'>GP Arcade Stall 6</option>
        </>
    )
}

export const displayRemittanceCenters = () => {
    return (
        <>
        <option value='Cebuana'>Cebuana</option>
        <option value='GCash'>GCash</option>
        <option value='LBC'>LBC</option>
        <option value='Palawan Express'>Palawan Express</option>
        <option value='Western Union'>Western Union</option>
        </>
    )
}

export const displayShipmentCenters = () => {
    return (
        <>
        <option value='ABest Express'>ABest Express</option>
        <option value='JRS'>JRS</option>
        <option value='LBC'>LBC</option>
        <option value='Partas Waybill'>Partas Waybill</option>
        </>
    )
}

const populateContentHelpers = {
    displayConditions,
    displaySizes,
    displayPaymentMethods,
    displaySellMethods,
    displayDroppingAreas,
    displayRemittanceCenters,
    displayShipmentCenters
};

export default populateContentHelpers;