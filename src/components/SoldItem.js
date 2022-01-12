import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import classes from "./SoldItem.module.css";
import { closeModal } from "../features/Modal";

function SoldItem(props) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.value);
    const modal = useSelector((state) => state.modal.value);
    const [isLoading, setIsLoading] = useState(true);
    const [soldItem, setSoldItem] = useState([]);

    const navigate = useNavigate();

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
    }, [auth.bearerToken, soldItemId])

    function handleOnClick() {
        navigate(`/archive/${soldItemId}`);
    }

    function handleOnClickDelete() {
        dispatch(closeModal());
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
            <p>Modal value: {modal.toString()}</p>
            <div className={classes.timestamps}>
                <span>Created: {moment(soldItem.createdAt).format("MMMM D, YYYY h:mm:ss A")}</span>
                <span className={classes.right}>Updated: {moment(soldItem.updatedAt).format("MMMM D, YYYY h:mm:ss A")}</span>
            </div>
            <div className={classes.titleImage}>
                <span className={classes.title} onClick={handleOnClick}>{soldItem.name}</span>
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
                    <button className={classes.delete} onClick={handleOnClickDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default SoldItem;