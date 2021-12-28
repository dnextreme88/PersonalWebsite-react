import { React, useRef, useState } from 'react';
import classes from "./FilterSoldItemForm.module.css";

function FilterSoldItemForm(props) {    
    const monthInputRef = useRef();
    const yearInputRef = useRef();
    const brandInputRef = useRef();
    const typeInputRef = useRef();

    const [monthValue, setMonth] = useState('');
    const [yearValue, setYear] = useState('');
    const [brandValue, setBrand] = useState('');
    const [typeValue, setType] = useState('');

    function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request
    }

    function handleFilterResults() {
        // Holds the actual current value
        const month = monthInputRef.current.value;
        const year = yearInputRef.current.value;
        const brand = brandInputRef.current.value;
        const type = typeInputRef.current.value;

        props.onFilterSoldItem({ month, year, brand, type });
    }

    function handleOnChange(event, name) {
        if (name === 'month') setMonth(event.target.value);
        if (name === 'year') setYear(event.target.value);
        if (name === 'brand') setBrand(event.target.value);
        if (name === 'type') setType(event.target.value);
    }

    function handleShowAllResults() {
        setMonth('');
        setYear('');
        setBrand('');
        setType('');
        // Reset value of dropdowns back
        monthInputRef.current.value = '';
        brandInputRef.current.value = '';
        yearInputRef.current.value = '';
        typeInputRef.current.value = '';

        props.onFilterSoldItem({ month: '', year: '', brand: '', type: '' });
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
                <div className={classes.actions}>
                    <button className={classes.filter} onClick={handleFilterResults}>Filter Results</button>
                    <button className={classes.showAll} onClick={handleShowAllResults}>Show ALL Results</button>
                </div>
            </form>
        </div>
    );
}

export default FilterSoldItemForm;