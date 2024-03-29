import React from 'react'

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
        <option value='11 US or 12 US'>11 US or 12 US</option>
        <option value='12'>12</option>
        <option value='15.6'>15.6</option>
        <option value='33'>33</option>
        <option value='34'>34</option>
        <option value='36'>36</option>
        <option value='38'>38</option>
        <option value='8 US or 9 US'>8 US or 9 US</option>
        <option value='S'>Small</option>
        <option value='M'>Medium</option>
        <option value='L'>Large</option>
        <option value='XL'>XL</option>
        <option value='XXL'>XXL</option>
        <option value='L or XL'>L or XL</option>
        <option value='M or L'>M or L</option>
        <option value='XL or XXL'>XL or XXL</option>
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
        <option value="Buyer's dropping area">Buyer&apos;s Dropping Area</option>
        <option value='GP Arcade Stall 4'>GP Arcade Stall 4</option>
        <option value='GP Arcade Stall 6'>GP Arcade Stall 6</option>
        <option value='Mabini Shopping Center Room 212'>Mabini Shopping Center Room 212</option>
        <option value='Olympian Building Room 211'>Olympian Building Room 211</option>
        <option value='Olympian Building Room K-01'>Olympian Building Room K-01</option>
        </>
    )
}

export const displayRemittanceCenters = () => {
    return (
        <>
        <option value="Buyer's dropping area">Buyer&apos;s Dropping Area</option>
        <option value='Cebuana'>Cebuana</option>
        <option value='GCash'>GCash</option>
        <option value='LBC'>LBC</option>
        <option value='M Lhuillier'>M Lhuillier</option>
        <option value='Palawan Express'>Palawan Express</option>
        <option value='Smart Padala'>Smart Padala</option>
        </>
    )
}

export const displayShipmentCenters = () => {
    return (
        <>
        <option value='ABest Express'>ABest Express</option>
        <option value='J&T Express'>J&T Express</option>
        <option value='JRS'>JRS</option>
        <option value='LBC'>LBC</option>
        <option value='Partas Waybill'>Partas Waybill</option>
        </>
    )
}

export const displayTypes = () => {
    return (
        <>
        <option value='Boss FAQ'>Boss FAQ</option>
        <option value='Collectibles FAQ'>Collectibles FAQ</option>
        <option value='Game Script'>Game Script</option>
        <option value='General FAQ'>General FAQ</option>
        <option value='In-Depth FAQ'>In-Depth FAQ</option>
        <option value='Secret FAQ'>Secret FAQ</option>
        </>
    )
}

export const displayPlatforms = () => {
    return (
        <>
        <option value="Android">Android</option>
        <option value="Browser/Online">Browser / Online</option>
        <option value="GB">Game Boy</option>
        <option value="GBA">Game Boy Advance</option>
        <option value="GBC">Game Boy Color</option>
        <option value="GC">GameCube</option>
        <option value="IOS">iOS (iPhone/iPad)</option>
        <option value="Linux/Mac">Linux / Macintosh</option>
        <option value="NES">NES</option>
        <option value="Nintendo 3DS">Nintendo 3DS</option>
        <option value="Nintendo 64">Nintendo 64</option>
        <option value="Nintendo DS">Nintendo DS</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Wii">Nintendo Wii</option>
        <option value="Wii U">Nintendo Wii U</option>
        <option value="PC">PC</option>
        <option value="PS1">PlayStation 1</option>
        <option value="PS2">PlayStation 2</option>
        <option value="PS3">PlayStation 3</option>
        <option value="PS4">PlayStation 4</option>
        <option value="PS5">PlayStation 5</option>
        <option value="PSP">PlayStation Portable</option>
        <option value="PS Vita">PlayStation Vita</option>
        <option value="Xbox">Xbox</option>
        <option value="Xbox 360">Xbox 360</option>
        <option value="Xbox One">Xbox One</option>
        <option value="Xbox Series X">Xbox Series X</option>
        </>
    )
}

export const displayOps = () => {
    return (
        <>
        <option value='>'>Greater than (&gt;)</option>
        <option value='>='>Greater than or equal to (&ge;)</option>
        <option value='='>Equal to (=)</option>
        <option value='<'>Less than (&lt;)</option>
        <option value='<='>Less than or equal to (&le;)</option>
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
    displayShipmentCenters,
    displayTypes,
    displayPlatforms,
    displayOps,
}

export default populateContentHelpers