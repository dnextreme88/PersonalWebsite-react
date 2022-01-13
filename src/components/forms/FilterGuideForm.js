import { React, useRef, useState } from 'react';
import { displayPlatforms, displayTypes } from "../../helpers/PopulateContent";
import classes from "./FilterGuideForm.module.css";

function FilterGuideForm(props) {
    const today = new Date().toISOString().split('T')[0]; // eg. 2022-01-13
    const nameInputRef = useRef();
    const gameInputRef = useRef();
    const platformsInputRef = useRef();
    const typeInputRef = useRef();
    const dateCreatedInputRef = useRef();
    const dateModifiedInputRef = useRef();

    const [platformsValue, setPlatforms] = useState('');
    const [typeValue, setType] = useState('');

    function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request
    }

    function handleFilterResults() {
        // Holds the actual current value
        const name = nameInputRef.current.value;
        const game = gameInputRef.current.value;
        const platforms = platformsInputRef.current.value;
        const type = typeInputRef.current.value;
        const dateCreated = dateCreatedInputRef.current.value;
        const dateModified = dateModifiedInputRef.current.value;

        props.onFilterGuide({ name, game, type, platforms, dateCreated, dateModified });
    }

    function handleShowAllResults() {
        setPlatforms('');
        setType('');

        // Reset value of dropdowns back
        nameInputRef.current.value = '';
        gameInputRef.current.value = '';
        platformsInputRef.current.value = '';
        typeInputRef.current.value = '';
        dateCreatedInputRef.current.value = today;
        dateModifiedInputRef.current.value = today;

        props.onFilterGuide({ name: '', game: '', platforms: '', type: '', dateCreated: '', dateModified: '' });
    }

    return (
        <div>
            <p>Filter guides based on the following parameters:</p>
            <form className={classes.form} onSubmit={handleOnSubmit}>
                <div className={classes.grid}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' ref={nameInputRef} />

                    <label htmlFor='game'>Game</label>
                    <input type='text' id='game' ref={gameInputRef} />
                </div>
                <div className={classes.grid}>
                    <label htmlFor='platforms'>Platforms</label>
                    <select id='platforms' ref={platformsInputRef} defaultValue={platformsValue}>
                        {displayPlatforms()}
                        <option value=''>SHOW ALL</option>
                    </select>

                    <label htmlFor='type'>Type</label>
                    <select id='type' ref={typeInputRef} defaultValue={typeValue}>
                        {displayTypes()}
                        <option value=''>SHOW ALL</option>
                    </select>
                </div>
                <div className={classes.grid}>
                    <label htmlFor='dateCreated'>Date Created</label>
                    <input type='date' id='dateCreated' ref={dateCreatedInputRef} defaultValue={today} />

                    <label htmlFor='dateModified'>Date Modified</label>
                    <input type='date' id='dateModified' ref={dateModifiedInputRef} defaultValue={today} />
                </div>
                <div className={classes.actions}>
                    <button className={classes.filter} onClick={handleFilterResults}>Filter Results</button>
                    <button className={classes.showAll} onClick={handleShowAllResults}>Show ALL Results</button>
                </div>
            </form>
        </div>
    );
}

export default FilterGuideForm;