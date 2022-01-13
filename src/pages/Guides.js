import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";
import FAQs from "../components/FAQs/FAQs";
import AddGuideForm from "../components/forms/AddGuideForm";
import classes from "./Guides.module.css";

function Guides(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [isFaqCreated, setIsFaqCreated] = useState(false);
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/guides', {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setFaqs(response.data.data);
                setIsFaqCreated(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, isFaqCreated]);

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

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <h1>List of FAQs</h1>
            <AddGuideForm onAddGuide={handleAddGuide} />
            <FAQs faqs={faqs} />
        </div>
    )
}

export default Guides;