import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import Loading from "../components/Spinners/Loading";
import AddSoldItemForm from "../components/forms/AddSoldItemForm";
import FilterSoldItemForm from "../components/forms/FilterSoldItemForm";
import SoldItems from "../components/Archive/SoldItems";
import classes from "./Archive.module.css";

function Archive() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [isSoldItemCreated, setIsSoldItemCreated] = useState(false);
    const [isSoldItemDeleted, setIsSoldItemDeleted] = useState(false);
    const [soldItems, setSoldItems] = useState([]);
    const [soldItemsFiltered, setSoldItemsFiltered] = useState([]);
    const [isFilter, setIsFilter] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/api/soldItems', {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setSoldItems(response.data.data);
                // Reset default state so that the page re-renders when a sold item is created or deleted
                setIsSoldItemCreated(false);
                setIsSoldItemDeleted(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, isSoldItemCreated, isSoldItemDeleted]);

    function handleAddSoldItem(addFormData) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(addFormData)) {
            if (key === 'imageLocation') {
                formData.append("imageFile", value);
            } else {
                formData.append(key, value);
            }
        }

        axios.post('http://localhost:3001/api/soldItems', formData, {
            headers: { Authorization: `Bearer ${auth.bearerToken}`, 'Content-Type': 'multipart/form-data' },
        })
            .then((response) => {
                console.log(response.data.data);
                soldItems.push(response.data.data);
                setIsLoading(false);
                setSoldItems(soldItems);
                setIsSoldItemCreated(true);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    function handleDeleteSoldItem(soldItemId) {
        setIsSoldItemDeleted(true);

        // Explicitly remove filter data
        setSoldItemsFiltered([]);
        setIsFilter(false);
    }

    function handleFilterSoldItem(filterFormData) {
        setIsFilter(true);
        axios.post('http://localhost:3001/api/soldItems/filter', filterFormData, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` },
        })
            .then((response) => {
                console.log(response.data.data);
                setIsLoading(false);
                setSoldItemsFiltered(response.data.data);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }
        
    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={classes.list}>
            <p>A list of sold items will be shown here...</p>
            <p>Total items sold: <strong>{soldItems.length}</strong></p>

            <AddSoldItemForm onAddSoldItem={handleAddSoldItem} />

            {soldItems.length > 0 || isFilter ?
                <FilterSoldItemForm onFilterSoldItem={handleFilterSoldItem} />
                : ''
            }
            {soldItemsFiltered.length > 0 && isFilter ?
                <div className={classes.filteredSoldItems}>Your search criteria returned <strong>{soldItemsFiltered.length}</strong> results</div>
                : ''
            }

            {soldItems.length > 0 && soldItemsFiltered.length === 0 && !isFilter ?
                <SoldItems soldItems={soldItems} onHandleDeleteSoldItem={handleDeleteSoldItem} /> :
                <SoldItems soldItems={soldItemsFiltered} onHandleDeleteSoldItem={handleDeleteSoldItem} />
            }

            {/* DISPLAY ERROR MESSAGES */}
            {soldItems.length < 1 && !isFilter ?
                <div className={classes.noSoldItems}>You have no sold items at the moment!</div>
                : ''
            }
            {soldItemsFiltered.length < 1 && isFilter ?
                <div className={classes.noSoldItems}>Your search criteria returned nothing!</div>
                : ''
            }
        </div>
    )
}

export default Archive;