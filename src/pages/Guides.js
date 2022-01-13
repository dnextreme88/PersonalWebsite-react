import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FAQs from "../components/FAQs/FAQs";
import AddGuideForm from "../components/forms/AddGuideForm";
import FilterGuideForm from '../components/forms/FilterGuideForm';
import Loading from "../components/Spinners/Loading";
import { SendGetRequest, SendPostRequest } from "../helpers/SendApiRequest";
import classes from "./Guides.module.css";

function Guides(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [isGuideCreated, setIsGuideCreated] = useState(false);
    const [isGuideDeleted, setIsGuideDeleted] = useState(false);
    const [guides, setGuides] = useState([]);
    const [guidesFiltered, setGuidesFiltered] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/guides');
            setGuides(response);

            // Reset default state so that the page re-renders when a guide is created or deleted
            setIsGuideCreated(false);
            setIsGuideDeleted(false);
            
            setIsLoading(false);
        })();
    }, [auth.bearerToken, isGuideCreated, isGuideDeleted]);

    async function handleAddGuide(guideData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/guides', guideData);
        console.log('LOG: Guide created', response);
        guides.push(response);
        setGuides(guides);

        setIsGuideCreated(true);

        // Explicitly remove filter data
        setGuidesFiltered([]);
        setIsFilter(false);

        setIsLoading(false);
    }

    async function handleDeleteGuide(guideId) {
        await SendPostRequest(auth.bearerToken, `api/guides/${guideId}/delete`);
        console.log('LOG: Guide deleted');

        setIsGuideDeleted(true);

        // Explicitly remove filter data
        setGuidesFiltered([]);
        setIsFilter(false);
    }

    async function handleFilterGuide(filterFormData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/guides/filter', filterFormData);
        console.log('LOG: Guides filtered', response);

        setGuidesFiltered(response);
        setIsFilter(true);

        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>List of FAQs</h1>
            {/* <AddGuideForm onAddGuide={handleAddGuide} />
            <FilterGuideForm onFilterGuide={handleFilterGuide} />
            <FAQs guides={guides} onDeleteGuide={handleDeleteGuide} /> */}

            {/* TO EDIT */}
            <p>Total guides written: <strong>{guides.length}</strong></p>

            <AddGuideForm onAddGuide={handleAddGuide} />

            {guides.length > 0 || isFilter ?
                <FilterGuideForm onFilterGuide={handleFilterGuide} />
                : ''
            }
            {guidesFiltered.length > 0 && isFilter ?
                <div className={classes.filteredGuides}>Your search criteria returned <strong>{guidesFiltered.length}</strong> results</div>
                : ''
            }

            {guides.length > 0 && guidesFiltered.length === 0 && !isFilter ?
                <FAQs faqs={guides} onDeleteGuide={handleDeleteGuide} /> :
                <FAQs faqs={guidesFiltered} onDeleteGuide={handleDeleteGuide} />
            }

            {/* DISPLAY ERROR MESSAGES */}
            {guides.length < 1 && !isFilter ?
                <div className={classes.noGuides}>You have no guides at the moment!</div>
                : ''
            }
            {guidesFiltered.length < 1 && isFilter ?
                <div className={classes.noGuides}>Your search criteria returned nothing!</div>
                : ''
            }
        </div>
    )
}

export default Guides;