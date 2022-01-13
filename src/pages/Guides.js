import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import FAQs from "../components/FAQs/FAQs";
import AddGuideForm from "../components/forms/AddGuideForm";
import Loading from "../components/Spinners/Loading";
import classes from "./Guides.module.css";

function Guides(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [isFaqCreated, setIsFaqCreated] = useState(false);
    const [isFaqDeleted, setIsFaqDeleted] = useState(false);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/guides', {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setFaqs(response.data.data);
                // Reset default state so that the page re-renders when a sold item is created or deleted
                setIsFaqCreated(false);
                setIsFaqDeleted(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, isFaqCreated, isFaqDeleted]);

    function handleAddGuide(guideData) {
        axios.post('http://localhost:3001/api/guides', guideData, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                console.log('LOG: Guide created', response.data.data);
                faqs.push(response.data.data);
                setFaqs(faqs);
                setIsFaqCreated(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleDeleteGuide(guideId) {
        axios.post(`http://localhost:3001/api/guides/${guideId}/delete`, null, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                console.log('LOG: Guide deleted');
                setIsFaqDeleted(true);
            })
            .catch((error) => {
                console.log(error);
            });
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