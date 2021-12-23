import { React, useEffect, useState } from "react";
import axios from "axios";
import SoldItem from "./SoldItem";
import classes from "./SoldItemList.module.css";
import AddSoldItemForm from "./AddSoldItemForm";

function SoldItemList() {
    const [isLoading, setIsLoading] = useState(true);
    const [soldItems, setSoldItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/soldItems')
            .then((response) => {
                setIsLoading(false);
                setSoldItems(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])
    
    if (isLoading) {
        return (
            <div className={classes.list}>
                <p>Loading...</p>
            </div>
        )
    }

    function handleAddSoldItem(soldItemFormData) {
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

        axios.post('http://localhost:3001/api/soldItems', soldItemFormData)
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

    return (
        <div className={classes.list}>
            <p>A list of sold items will be shown here...</p>
            <p>Total items sold: <strong>{soldItems.length}</strong></p>
            <AddSoldItemForm onAddSoldItem={handleAddSoldItem} />
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