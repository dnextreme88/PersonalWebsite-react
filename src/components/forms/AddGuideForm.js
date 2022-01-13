import { React, useRef, useState } from 'react';
import { displayTypes, displayPlatforms } from "../../helpers/PopulateContent";
import classes from './AddGuideForm.module.css';

function AddGuideForm(props) {
    const today = new Date().toISOString().split('T')[0]; // eg. 2021-12-29
    const nameInputRef = useRef();
    const gameInputRef = useRef();
    const typeInputRef = useRef();
    const dateCreatedInputRef = useRef();
    const dateModifiedInputRef = useRef();
    const urlInputRef = useRef();

    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request

        // Holds the actual current value
        const faqName = nameInputRef.current.value;
        const faqGame = gameInputRef.current.value;
        const faqType = typeInputRef.current.value;
        const faqDateCreated = dateCreatedInputRef.current.value;
        const faqDateModified = dateModifiedInputRef.current.value;
        const faqUrl = urlInputRef.current.value;

        const addGuideFormData = {
            name: faqName,
            game: faqGame,
            platforms: selectedPlatforms.join(", "), // transforms array to string
            type: faqType,
            dateCreated: faqDateCreated,
            dateModified: faqDateModified,
            url: faqUrl,
        };

        props.onAddGuide(addGuideFormData);
    }

    // REF: https://stackoverflow.com/a/28625477/2106309
    function handleChangePlatforms(event) {
        const selectedValues = [];
        const options = event.target.options;
        for (var i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }

        setSelectedPlatforms(selectedValues);
    }

    return (
        <form className={classes.form} onSubmit={handleOnSubmit}>
            <div className={classes.grid}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' required ref={nameInputRef} />

                <label htmlFor='game'>Game</label>
                <input type='text' id='game' required ref={gameInputRef} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='url'>URL</label>
                <input type='text' id='url' required ref={urlInputRef} />

                <label htmlFor='type'>Type</label>
                <select id='type' ref={typeInputRef} defaultValue='N/A'>
                    {displayTypes()}
                </select>
            </div>
            <div className={classes.grid}>
                <label htmlFor='dateCreated'>Date Created</label>
                <input type='date' required id='dateCreated' ref={dateCreatedInputRef} defaultValue={today} />

                <label htmlFor='dateModified'>Date Modified</label>
                <input type='date' required id='dateModified' ref={dateModifiedInputRef} defaultValue={today} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='platforms'>Platforms</label>
                <select className={classes.multiplePlatforms} id='platforms' defaultValue='Android' onChange={handleChangePlatforms} multiple>
                    {displayPlatforms()}
                </select>
            </div>
            <div className={classes.actions}>
                <button>Add Guide</button>
            </div>
        </form>
    );
}

export default AddGuideForm;