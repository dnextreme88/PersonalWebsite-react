import { React, useRef, useState } from 'react'
import { displayPlatforms, displayTypes, displayOps } from '../../helpers/PopulateContent'
import classes from './FilterGuideForm.module.css'

function FilterGuideForm(props) {
    const nameInputRef = useRef()
    const gameInputRef = useRef()
    const platformsInputRef = useRef()
    const typeInputRef = useRef()
    const dateCreatedInputRef = useRef()
    const dateCreatedOpInputRef = useRef()
    const dateModifiedInputRef = useRef()
    const dateModifiedOpInputRef = useRef()

    const [platformsValue, setPlatforms] = useState('')
    const [typeValue, setType] = useState('')
    const [dateCreatedValue, setDateCreated] = useState('')
    const [toggleDateCreatedOp, setToggleDateCreatedOp] = useState(classes.hidden)
    const [dateCreatedOpValue, setDateCreatedOp] = useState('=')
    const [dateModifiedValue, setDateModified] = useState('')
    const [toggleDateModifiedOp, setToggleDateModifiedOp] = useState(classes.hidden)
    const [dateModifiedOpValue, setDateModifiedOp] = useState('=')

    function handleOnSubmit(event) {
        event.preventDefault() // Prevent the browser from sending another request
    }

    function handleFilterResults() {
        // Holds the actual current value
        const name = nameInputRef.current.value
        const game = gameInputRef.current.value
        const platforms = platformsInputRef.current.value
        const type = typeInputRef.current.value
        const dateCreated = dateCreatedInputRef.current.value
        const dateCreatedOp = dateCreatedOpInputRef.current.value
        const dateModified = dateModifiedInputRef.current.value
        const dateModifiedOp = dateModifiedOpInputRef.current.value

        props.onFilterGuide({ name, game, type, platforms, dateCreated, dateCreatedOp, dateModified, dateModifiedOp })
    }

    function handleShowAllResults() {
        setPlatforms('')
        setType('')
        setDateCreated('')
        setToggleDateCreatedOp(classes.hidden)
        setDateCreatedOp('')
        setDateModified('')
        setToggleDateModifiedOp(classes.hidden)
        setDateModifiedOp('')

        // Reset value of dropdowns and date inputs back
        nameInputRef.current.value = ''
        gameInputRef.current.value = ''
        platformsInputRef.current.value = ''
        typeInputRef.current.value = ''
        dateCreatedInputRef.current.value = ''
        dateCreatedOpInputRef.current.value = '='
        dateModifiedInputRef.current.value = ''
        dateModifiedOpInputRef.current.value = '='

        props.onFilterGuide({ name: '', game: '', platforms: '', type: '', dateCreated: '', dateCreatedOp: '', dateModified: '', dateModifiedOp: '' })
    }

    function handleOnChangeDate(event, name) {
        if (name === 'dateCreated') {
            if (event.target.value.length > 0) {
                setToggleDateCreatedOp(classes.show)
            }
        }
        if (name === 'dateModified') {
            if (event.target.value.length > 0) {
                setToggleDateModifiedOp(classes.show)
            }
        }
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
                    <input type='date' id='dateCreated' ref={dateCreatedInputRef} defaultValue={dateCreatedValue} onChange={(e) => handleOnChangeDate(e, 'dateCreated')} />

                    <label htmlFor='dateModified' className={toggleDateCreatedOp}>Date Created (operation)</label>
                    <select id='type' className={toggleDateCreatedOp} ref={dateCreatedOpInputRef} defaultValue={dateCreatedOpValue}>
                        {displayOps()}
                    </select>
                </div>
                <div className={classes.grid}>
                    <label htmlFor='dateModified'>Date Modified</label>
                    <input type='date' id='dateModified' ref={dateModifiedInputRef} defaultValue={dateModifiedValue} onChange={(e) => handleOnChangeDate(e, 'dateModified')} />

                    <label htmlFor='dateModified' className={toggleDateModifiedOp}>Date Modified (operation)</label>
                    <select id='type' className={toggleDateModifiedOp} ref={dateModifiedOpInputRef} defaultValue={dateModifiedOpValue}>
                        {displayOps()}
                    </select>
                </div>
                <div className={classes.actions}>
                    <button className={classes.filter} onClick={handleFilterResults}>Filter Results</button>
                    <button className={classes.showAll} onClick={handleShowAllResults}>Show ALL Results</button>
                </div>
            </form>
        </div>
    )
}

export default FilterGuideForm