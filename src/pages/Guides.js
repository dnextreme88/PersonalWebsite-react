import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FAQs from "../components/FAQs/FAQs";
import AddGuideForm from "../components/forms/AddGuideForm";
import Loading from "../components/Spinners/Loading";
import { SendGetRequest, SendPostRequest } from "../helpers/SendApiRequest";
import classes from "./Guides.module.css";

function Guides(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [isFaqCreated, setIsFaqCreated] = useState(false);
    const [isFaqDeleted, setIsFaqDeleted] = useState(false);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/guides');
            setFaqs(response);

            // Reset default state so that the page re-renders when a sold item is created or deleted
            setIsFaqCreated(false);
            setIsFaqDeleted(false);
            
            setIsLoading(false);
        })();
    }, [auth.bearerToken, isFaqCreated, isFaqDeleted]);

    async function handleAddGuide(guideData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/guides', guideData);
        console.log('LOG: Guide created', response);

        faqs.push(response);
        setFaqs(faqs);
        setIsFaqCreated(true);
    }

    async function handleDeleteGuide(guideId) {
        await SendPostRequest(auth.bearerToken, `api/guides/${guideId}/delete`);
        console.log('LOG: Guide deleted');

        setIsFaqDeleted(true);
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>List of FAQs</h1>
            <AddGuideForm onAddGuide={handleAddGuide} />
            <FAQs faqs={faqs} onDeleteGuide={handleDeleteGuide} />
        </div>
    )
}

export default Guides;