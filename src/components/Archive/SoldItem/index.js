import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import DeleteSoldItemModal from '../../ui/Modals/DeleteSoldItemModal'
import Unauthorized from '../../ui/Alerts/Unauthorized'
import Loading from '../../Spinners/Loading'
import { SendGetRequest, SendPostRequest } from '../../../helpers/SendApiRequest'
import classes from './index.module.css'

function SoldItem(props) {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [soldItem, setSoldItem] = useState([])

    const params = useParams()
    const soldItemId = params.soldItemId ? params.soldItemId : props.id
    
    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/soldItems/${soldItemId}`)
            if (!response.error) {
                setSoldItem(response)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken, soldItemId])

    async function handleDeleteSoldItem(soldItemid) {
        await SendPostRequest(auth.bearerToken, `api/soldItems/${soldItemid}/delete`)
        console.log('LOG: Sold item deleted')

        props.onHandleDeleteSoldItem(soldItemid)
    }

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div className={classes.card}>
            <div className={classes.timestamps}>
                <span>Created: {moment(soldItem.createdAt).format('MMMM D, YYYY h:mm:ss A')}</span>
                <span className={classes.right}>Updated: {moment(soldItem.updatedAt).format('MMMM D, YYYY h:mm:ss A')}</span>
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
                    <p>Date sold: {moment(soldItem.dateSold).format('MMMM D, YYYY')}</p>
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

export default SoldItem