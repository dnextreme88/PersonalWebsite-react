import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import DeleteSoldItemModal from "../../Modals/DeleteSoldItemModal";
import classes from "./index.module.css";

function SoldItem(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [soldItem, setSoldItem] = useState([]);

    const params = useParams();
    const soldItemId = params.soldItemId ? params.soldItemId : props.id;
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/soldItems/${soldItemId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setSoldItem(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, soldItemId]);

    function handleDeleteSoldItem(id) {
        axios.post(`http://localhost:3001/api/soldItems/${id}/delete`, null, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                console.log('LOG: Sold item deleted');
            })
            .catch((error) => {
                console.log(error);
            });

        props.onHandleDeleteSoldItem(id);
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={classes.card}>
            <div className={classes.timestamps}>
                <span>Created: {moment(soldItem.createdAt).format("MMMM D, YYYY h:mm:ss A")}</span>
                <span className={classes.right}>Updated: {moment(soldItem.updatedAt).format("MMMM D, YYYY h:mm:ss A")}</span>
            </div>
            <div className={classes.titleImage}>
                <span className={classes.title}><Link to={`/archive/${soldItemId}`}>{soldItem.name}</Link></span>
                <img className={classes.image} src={soldItem.imageLocation} alt={soldItem.name} />
            </div>
            <div className={classes.soldItemDetails}>
                <div>
                    <p>Price: P{soldItem.price}</p>
                    <p>Condition: {soldItem.condition}</p>
                    <p>Payment by: {soldItem.PaymentMethod ? soldItem.PaymentMethod.method : ''}</p>
                </div>
                <div className={classes.right}>
                    <p>Size: {soldItem.size}</p>
                    <p>Date sold: {moment(soldItem.dateSold).format("MMMM D, YYYY")}</p>
                    <p>Sold by: {soldItem.SellMethod ? soldItem.SellMethod.method : ''}</p>
                </div>
            </div>
            <div className={classes.actions}>
                <div className={classes.left}>
                    <Link to={`/archive/${soldItemId}/update`}><button className={classes.edit}>Edit</button></Link>
                </div>
                <div className={classes.right}>
                    <DeleteSoldItemModal soldItemId={soldItemId} onDeleteSoldItem={handleDeleteSoldItem} />
                </div>
            </div>
        </div>
    )
}

export default SoldItem;