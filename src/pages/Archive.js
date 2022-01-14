import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Unauthorized from '../components/ui/Alerts/Unauthorized'
import Loading from '../components/ui/Spinners/Loading'
import AddSoldItemForm from '../components/forms/AddSoldItemForm'
import FilterSoldItemForm from '../components/forms/FilterSoldItemForm'
import SoldItems from '../components/Archive/SoldItems'
import { SendGetRequest, SendPostRequest, SendPostMultipartRequest } from '../helpers/SendApiRequest'
import classes from './Archive.module.css'

function Archive() {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSoldItemCreated, setIsSoldItemCreated] = useState(false)
    const [isSoldItemDeleted, setIsSoldItemDeleted] = useState(false)
    const [soldItems, setSoldItems] = useState([])
    const [soldItemsFiltered, setSoldItemsFiltered] = useState([])
    const [isFilter, setIsFilter] = useState(false)

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/soldItems')
            if (!response.error) {
                setSoldItems(response)

                // Reset default state so that the page re-renders when a sold item is created or deleted
                setIsSoldItemCreated(false)
                setIsSoldItemDeleted(false)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken, isSoldItemCreated, isSoldItemDeleted])

    async function handleAddSoldItem(addFormData) {
        const formData = new FormData()
        for (const [key, value] of Object.entries(addFormData)) {
            if (key === 'imageLocation') {
                formData.append('imageFile', value)
            } else {
                formData.append(key, value)
            }
        }

        const response = await SendPostMultipartRequest(auth.bearerToken, 'api/soldItems', formData)
        console.log('LOG: Sold item created', response)
        soldItems.push(response)
        setSoldItems(soldItems)

        setIsSoldItemCreated(true)

        // Explicitly remove filter data
        setSoldItemsFiltered([])
        setIsFilter(false)

        setIsLoading(false)
    }

    function handleDeleteSoldItem() {
        setIsSoldItemDeleted(true)

        // Explicitly remove filter data
        setSoldItemsFiltered([])
        setIsFilter(false)
    }

    async function handleFilterSoldItem(filterFormData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/soldItems/filter', filterFormData)
        console.log('LOG: Sold items filtered', response)

        setSoldItemsFiltered(response)
        setIsFilter(true)

        setIsLoading(false)
    }
        
    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div className={classes.list}>
            <p>A list of sold items will be shown here...</p>
            <p>Total items sold: <strong>{soldItems.length}</strong></p>

            <AddSoldItemForm onAddSoldItem={handleAddSoldItem} />

            {soldItems.length > 0 || isFilter ?
                <FilterSoldItemForm onFilterSoldItem={handleFilterSoldItem} />
                : ''
            }
            {soldItemsFiltered.length > 0 && isFilter ?
                <div className={classes.filteredSoldItems}>Your search criteria returned <strong>{soldItemsFiltered.length}</strong> results</div>
                : ''
            }

            {soldItems.length > 0 && soldItemsFiltered.length === 0 && !isFilter ?
                <SoldItems soldItems={soldItems} onHandleDeleteSoldItem={handleDeleteSoldItem} /> :
                <SoldItems soldItems={soldItemsFiltered} onHandleDeleteSoldItem={handleDeleteSoldItem} />
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

export default Archive