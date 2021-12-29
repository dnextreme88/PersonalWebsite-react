import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import SoldItem from "./SoldItem";
import classes from "./SoldItemList.module.css";
import AddSoldItemForm from "./AddSoldItemForm";
import FilterSoldItemForm from "./FilterSoldItemForm";

function SoldItemList() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [soldItems, setSoldItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/soldItems', {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setSoldItems(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken])
    
    if (isLoading) {
        return (
            <div className={classes.list}>
                <p>Loading...</p>
            </div>
        )
    }

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

        axios.post('http://localhost:3001/api/soldItems', addFormData, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` },
        })
            .then((response) => {
                console.log(response.data.data);
                soldItems.push(response.data.data);
                setIsLoading(false);
                setSoldItems(soldItems);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    function handleFilterSoldItem(filterFormData) {
        axios.post('http://localhost:3001/api/soldItems/filter', filterFormData, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` },
        })
            .then((response) => {
                console.log(response.data.data);
                setIsLoading(false);
                setSoldItems(response.data.data);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    return (
        <div className={classes.list}>
            <p>A list of sold items will be shown here...</p>
            <p>Total items sold: <strong>{soldItems.length}</strong></p>
            <AddSoldItemForm onAddSoldItem={handleAddSoldItem} />
            <FilterSoldItemForm onFilterSoldItem={handleFilterSoldItem} />
            {soldItems.length > 0 ?
                soldItems.map((soldItem) => (
                    <SoldItem
                        key={soldItem.id}
                        id={soldItem.id}
                        name={soldItem.name}
                        price={soldItem.price}
                        condition={soldItem.condition}
                        size={soldItem.size}
                        imageLocation={soldItem.imageLocation}
                        dateSold={soldItem.dateSold}
                        createdAt={soldItem.createdAt}
                        updatedAt={soldItem.updatedAt}
                    />
                )) :
                <div className={classes.noSoldItems}>
                    You have no sold items at the moment!
                </div>
            }
        </div>
    )
}

export default SoldItemList;