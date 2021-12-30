import { React, useRef, useState } from 'react';
import classes from "./FilterSoldItemForm.module.css";

function FilterSoldItemForm(props) {    
    const monthInputRef = useRef();
    const yearInputRef = useRef();
    const brandInputRef = useRef();
    const typeInputRef = useRef();
    const conditionInputRef = useRef();
    const sizeInputRef = useRef();
    const paymentMethodInputRef = useRef();
    const sellMethodInputRef = useRef();

    const [monthValue, setMonth] = useState('');
    const [yearValue, setYear] = useState('');
    const [brandValue, setBrand] = useState('');
    const [typeValue, setType] = useState('');
    const [conditionValue, setCondition] = useState('');
    const [sizeValue, setSize] = useState('');
    const [paymentMethodValue, setPaymentMethod] = useState('');
    const [sellMethodValue, setSellMethod] = useState('');

    function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request
    }

    function handleFilterResults() {
        // Holds the actual current value
        const month = monthInputRef.current.value;
        const year = yearInputRef.current.value;
        const brand = brandInputRef.current.value;
        const type = typeInputRef.current.value;
        const condition = conditionInputRef.current.value;
        const size = sizeInputRef.current.value;
        const paymentMethod = paymentMethodInputRef.current.value;
        const sellMethod = sellMethodInputRef.current.value;

        props.onFilterSoldItem({ month, year, brand, type, condition, size, paymentMethod, sellMethod });
    }

    function handleOnChange(event, name) {
        if (name === 'month') setMonth(event.target.value);
        if (name === 'year') setYear(event.target.value);
        if (name === 'brand') setBrand(event.target.value);
        if (name === 'type') setType(event.target.value);
        if (name === 'condition') setCondition(event.target.value);
        if (name === 'size') setSize(event.target.value);
        if (name === 'paymentMethod') setPaymentMethod(event.target.value);
        if (name === 'sellMethod') setSellMethod(event.target.value);
    }

    function handleShowAllResults() {
        setMonth('');
        setYear('');
        setBrand('');
        setType('');
        setCondition('');
        setSize('');
        setPaymentMethod('');
        setSellMethod('');
        // Reset value of dropdowns back
        monthInputRef.current.value = '';
        brandInputRef.current.value = '';
        yearInputRef.current.value = '';
        typeInputRef.current.value = '';
        conditionInputRef.current.value = '';
        sizeInputRef.current.value = '';
        paymentMethodInputRef.current.value = '';
        sellMethodInputRef.current.value = '';

        props.onFilterSoldItem({ month: '', year: '', brand: '', type: '', condition: '', size: '', paymentMethod: '', sellMethod: '' });
    }

    return (
        <div>
            <p>Filter sold items based on the following parameters:</p>
            <form className={classes.form} onSubmit={handleOnSubmit}>
                <div className={classes.grid}>
                    <label htmlFor='month'>Month</label>
                    <select id='month' ref={monthInputRef} defaultValue={monthValue} onChange={handleOnChange('month')}>
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
                    </select>

                    <label htmlFor='year'>Year</label>
                    <select id='year' ref={yearInputRef} defaultValue={yearValue} onChange={handleOnChange('year')}>
                        <option value='2014'>2014</option>
                        <option value='2015'>2015</option>
                        <option value='2016'>2016</option>
                        <option value='2017'>2017</option>
                        <option value='2018'>2018</option>
                        <option value='2019'>2019</option>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value=''>SHOW ALL</option>
                    </select>
                </div>
                <div className={classes.grid}>
                    <label htmlFor='brand'>Brand</label>
                    <select id='brand' ref={brandInputRef} defaultValue={brandValue} onChange={handleOnChange('brand')}>
                        <option value='Ecko'>Ecko</option>
                        <option value='Mossimo'>Mossimo</option>
                        <option value='Quiksilver'>Quiksilver</option>
                        <option value=''>SHOW ALL</option>
                    </select>

                    <label htmlFor='type'>Type</label>
                    <select id='type' ref={typeInputRef} defaultValue={typeValue} onChange={handleOnChange('type')}>
                        <option value='Pants'>Pants</option>
                        <option value='Shirt'>Shirt</option>
                        <option value=''>SHOW ALL</option>
                    </select>
                </div>
                <div className={classes.grid}>
                    <label htmlFor='condition'>Condition</label>
                    <select id='condition' ref={conditionInputRef} defaultValue={conditionValue} onChange={handleOnChange('condition')}>
                        <option value='healthy'>healthy</option>
                        <option value='new'>new</option>
                        <option value='used'>used</option>
                        <option value=''>SHOW ALL</option>
                    </select>

                    <label htmlFor='size'>Size</label>
                    <select id='size' ref={sizeInputRef} defaultValue={sizeValue} onChange={handleOnChange('size')}>
                        <option value='S'>Small</option>
                        <option value='M'>Medium</option>
                        <option value='L'>Large</option>
                        <option value='XL'>XL</option>
                        <option value='XXL'>XXL</option>
                        <option value='N/A'>Not applicable</option>
                        <option value=''>SHOW ALL</option>
                    </select>
                </div>
                <div className={classes.grid}>
                    <label htmlFor='paymentMethod'>Payment method</label>
                    <select id='paymentMethod' ref={paymentMethodInputRef} defaultValue={paymentMethodValue} onChange={handleOnChange('paymentMethod')}>
                        <option value='cash on-hand'>Cash on-hand</option>
                        <option value='dropping area cashout'>Dropping area cashout</option>
                        <option value='remittance'>Remittance</option>
                        <option value=''>SHOW ALL</option>
                    </select>

                    <label htmlFor='sellMethod'>Sell method</label>
                    <select id='sellMethod' ref={sellMethodInputRef} defaultValue={sellMethodValue} onChange={handleOnChange('sellMethod')}>
                        <option value='dropping'>Dropping</option>
                        <option value='meetup'>Meetup</option>
                        <option value='shipment'>Shipment</option>
                        <option value=''>SHOW ALL</option>
                    </select>
                </div>
                <div className={classes.actions}>
                    <button className={classes.filter} onClick={handleFilterResults}>Filter Results</button>
                    <button className={classes.showAll} onClick={handleShowAllResults}>Show ALL Results</button>
                </div>
            </form>
        </div>
    );
}

export default FilterSoldItemForm;