import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import SoldItem from "../SoldItem";
import AddSoldItemForm from "../../forms/AddSoldItemForm";
import FilterSoldItemForm from "../../forms/FilterSoldItemForm";
import classes from "./index.module.css";

function SoldItems() {
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
        // body key must be an object in JSON format so use JSON.stringify()
        // fetch('http://localhost:3001/api/soldItems', {
        //         method: 'POST',
        //         body: JSON.stringify(soldItemFormData),
        //         headers: { 'Content-Type': 'application/json' }
        // })
        //     .then((response) => {
        //         console.log('response from api:', response);
        //         return response.json();
        //     })
        //     .then((data) => {
        //         soldItems.push(data.data);
        //         setIsLoading(false);
        //         setSoldItems(soldItems);
        //     })
        // .catch((err) => {
        //     console.log('err', err);
        // });
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
        // Explicitly remove filter data
        setSoldItemsFiltered([]);
        setIsFilter(false);

        setIsSoldItemDeleted(true);
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
        return (
            <div className={classes.list}>
                <p>Loading...</p>
            </div>
        )
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
            {soldItems.length > 0 && soldItemsFiltered.length === 0 && !isFilter ?
                soldItems.map((soldItem) => (
                    <SoldItem
                        key={soldItem.id}
                        id={soldItem.id}
                        onHandleDeleteSoldItem={handleDeleteSoldItem}
                    />
                )) :
                soldItemsFiltered.map((soldItem) => (
                    <SoldItem
                        key={soldItem.id}
                        id={soldItem.id}
                        onHandleDeleteSoldItem={handleDeleteSoldItem}
                    />
                ))
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

export default SoldItems;