import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import SoldItem from "./SoldItem";
import classes from "./SoldItemList.module.css";

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

    return (
        <div className={classes.list}>
            <p>A list of sold items will be shown here...</p>
            <p>Total items sold: <strong>{soldItems.length}</strong></p>
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