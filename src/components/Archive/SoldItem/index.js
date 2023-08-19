import { React } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
import DeleteSoldItemModal from '../../ui/Modals/DeleteSoldItemModal'
import { SendPostRequest } from '../../../helpers/SendApiRequest'
import classes from './index.module.scss'

function SoldItem(props) {
    const auth = useSelector((state) => state.auth.value)

    const params = useParams()
    const soldItemId = params.soldItemId ? params.soldItemId : props.id

    async function handleDeleteSoldItem(soldItemid) {
        await SendPostRequest(auth.bearerToken, `api/soldItems/${soldItemid}/delete`)
        console.log('LOG: Sold item deleted')

        props.onHandleDeleteSoldItem(soldItemid)
    }

    return (
        <div className={classes.card}>
            <div className={classes.timestamps}>
                <span>Created: {moment(props.createdAt).format('MMMM D, YYYY h:mm:ss A')}</span>
                <span className={classes.right}>Updated: {moment(props.updatedAt).format('MMMM D, YYYY h:mm:ss A')}</span>
            </div>
            <div className={`text-center ${classes['title-image']}`}>
                <span className={classes.title}>{props.name}</span>
                <img className={classes.image} src={props.imageLocation} alt={props.name} />
            </div>
            <div className={classes['sold-item-details']}>
                <div>
                    <p>Price: P{props.price}</p>
                    <p>Condition: {props.condition}</p>
                    <p>Payment by: {props.PaymentMethod ? props.PaymentMethod.method : ''}</p>
                </div>
                <div className={classes.right}>
                    <p>Size: {props.size}</p>
                    <p>Date sold: {moment(props.dateSold).format('MMMM D, YYYY')}</p>
                    <p>Sold by: {props.SellMethod ? props.SellMethod.method : ''}</p>
                </div>
            </div>
            <div className={classes.actions}>
                <div className={classes.left}>
                    <Link to={`/archive/${props.id}/update`}><button className={classes.edit}>Edit</button></Link>
                </div>
                <div className={classes.right}>
                    <DeleteSoldItemModal soldItemId={soldItemId} onDeleteSoldItem={handleDeleteSoldItem} />
                </div>
            </div>
        </div>
    )
}

export default SoldItem