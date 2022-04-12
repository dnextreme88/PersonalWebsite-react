import { React, useEffect, useState } from 'react'
import SoldItem from '../SoldItem'
import Loading from '../../ui/Spinners/Loading'
import classes from './index.module.scss'

function SoldItems(props) {
    const [isLoading, setIsLoading] = useState(true)
    const [soldItems, setSoldItems] = useState([])

    useEffect(() => {
        setIsLoading(false)
        setSoldItems(props.soldItems)
    }, [props.soldItems])

    function handleDeleteSoldItem(soldItemId) {
        props.onHandleDeleteSoldItem(soldItemId)
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={classes.soldItemsList}>
            {soldItems.map((soldItem) =>
                    <SoldItem
                        key={soldItem.id}
                        id={soldItem.id}
                        onHandleDeleteSoldItem={handleDeleteSoldItem}
                    />
                )
            }
        </div>
    )
}

export default SoldItems