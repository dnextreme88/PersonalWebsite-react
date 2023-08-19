import { React, useEffect, useState } from 'react'
import SoldItem from '../SoldItem'
import Loading from '../../ui/Spinners/Loading'

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
        <div className={'d-grid'}>
            {soldItems.map((soldItem) =>
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
                    PaymentMethod={soldItem.PaymentMethod}
                    SellMethod={soldItem.SellMethod}
                    onHandleDeleteSoldItem={handleDeleteSoldItem}
                />
            )}
        </div>
    )
}

export default SoldItems