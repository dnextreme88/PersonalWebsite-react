import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from "../Spinners/Loading";
import { SendGetRequest, SendPostRequest } from '../../helpers/SendApiRequest';
import { displayTypes, displayPlatforms } from "../../helpers/PopulateContent";
import classes from './EditGuideForm.module.css';

function EditGuideForm(props) {
    const auth = useSelector((state) => state.auth.value);

    const nameInputRef = useRef();
    const gameInputRef = useRef();
    const typeInputRef = useRef();
    const dateCreatedInputRef = useRef();
    const dateModifiedInputRef = useRef();
    const urlInputRef = useRef();

    const [isLoading, setIsLoading] = useState(true);
    const [guide, setGuide] = useState([]);
    const [type, setType] = useState();
    const [selectedPlatforms, setSelectedPlatforms] = useState(['Android']);

    const navigate = useNavigate();

    const params = useParams();
    const guideId = params.guideId ? params.guideId : props.id;

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/guides/${guideId}`);
            setGuide(response);

            // Set default values of dropdowns based on sold item data
            setType(response.type);
            setSelectedPlatforms(response.platforms.split(', ')); // Transforms string into an array
            
            setIsLoading(false);
        })();
    }, [auth.bearerToken, guideId]);

    async function handleOnSubmit(event) {
        event.preventDefault(); // Prevent the browser from sending another request

        // Holds the actual current value
        const faqName = nameInputRef.current.value;
        const faqGame = gameInputRef.current.value;
        const faqType = typeInputRef.current.value;
        const faqDateCreated = dateCreatedInputRef.current.value;
        const faqDateModified = dateModifiedInputRef.current.value;
        const faqUrl = urlInputRef.current.value;

        const guideData = {
            name: faqName,
            game: faqGame,
            platforms: selectedPlatforms.join(", "), // Transforms array to string
            type: faqType,
            dateCreated: faqDateCreated,
            dateModified: faqDateModified,
            url: faqUrl,
        };

        const response = await SendPostRequest(auth.bearerToken, `api/guides/${guideId}/update`, guideData);
        console.log('LOG: Guide updated', response);

        navigate('/guides');
    }

    function handleOnChange(event, name) {
        if (name === 'type') setType(event.target.value);
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

    if (isLoading) {
        return <Loading />
    }

    return (
        <form className={classes.form} onSubmit={handleOnSubmit}>
            <p>You are editing: <strong>{guide.name}</strong></p>
            <div className={classes.grid}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' ref={nameInputRef} defaultValue={guide.name} />

                <label htmlFor='game'>Game</label>
                <input type='text' id='game' ref={gameInputRef} defaultValue={guide.game} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='url'>URL</label>
                <input type='text' id='url' ref={urlInputRef} defaultValue={guide.url} />

                <label htmlFor='type'>Type</label>
                <select id='type' ref={typeInputRef} value={type} onChange={(e) => handleOnChange(e, 'type')}>
                    {displayTypes()}
                </select>
            </div>
            <div className={classes.grid}>
                <label htmlFor='dateCreated'>Date Created</label>
                <input type='date' id='dateCreated' ref={dateCreatedInputRef} defaultValue={guide.dateCreated} />

                <label htmlFor='dateModified'>Date Modified</label>
                <input type='date' id='dateModified' ref={dateModifiedInputRef} defaultValue={guide.dateModified} />
            </div>
            <div className={classes.grid}>
                <label htmlFor='platforms'>Platforms</label>
                <select className={classes.multiplePlatforms} id='platforms' value={selectedPlatforms} onChange={handleChangePlatforms} multiple>
                    {displayPlatforms()}
                </select>
            </div>
            <div className={classes.actions}>
                <button>Edit Guide</button>
            </div>
        </form>
    );
}

export default EditGuideForm;