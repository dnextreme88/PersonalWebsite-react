import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactPaginate from 'react-paginate'
import Unauthorized from '../components/ui/Alerts/Unauthorized'
import Loading from '../components/ui/Spinners/Loading'
import AddSoldItemForm from '../components/forms/AddSoldItemForm'
import FilterSoldItemForm from '../components/forms/FilterSoldItemForm'
import SoldItems from '../components/Archive/SoldItems'
import { SendGetRequest, SendPostRequest, SendPostMultipartRequest } from '../helpers/SendApiRequest'
import classes from './Archive.module.scss'

function Archive() {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSoldItemCreated, setIsSoldItemCreated] = useState(false)
    const [soldItemsCreatedErrors, setSoldItemsCreatedErrors] = useState({})
    const [isSoldItemDeleted, setIsSoldItemDeleted] = useState(false)
    const [soldItems, setSoldItems] = useState([])
    const [soldItemsFiltered, setSoldItemsFiltered] = useState([])
    const [isFilter, setIsFilter] = useState(false)

    // Pagination
    const [itemOffset, setItemOffset] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [paginatedSoldItems, setPaginatedSoldItems] = useState([])
    const [paginatedSoldItemsFiltered, setPaginatedSoldItemsFiltered] = useState([])

    const itemsPerPage = 3

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/soldItems')
            if (!response.error) {
                setSoldItems(response)

                const endOffset = itemOffset + itemsPerPage
                const paginatedItems = response.slice(itemOffset, endOffset)
                const getPageCount = Math.ceil(response.length / itemsPerPage)
                setPaginatedSoldItems(paginatedItems)
                setPageCount(getPageCount)

                // Reset default state so that the page re-renders when a sold item is created or deleted
                setIsSoldItemCreated(false)
                setIsSoldItemDeleted(false)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken, isSoldItemCreated, isSoldItemDeleted])

    useEffect(() => {
        (async function paginateData() {
            const endOffset = itemOffset + itemsPerPage
            let paginatedItems = ''
            let getPageCount = 0

            if (!isFilter) {
                paginatedItems = soldItems.slice(itemOffset, endOffset)
                setPaginatedSoldItems(paginatedItems)

                getPageCount = Math.ceil(soldItems.length / itemsPerPage)
            } else {
                paginatedItems = soldItemsFiltered.slice(itemOffset, endOffset)
                setPaginatedSoldItemsFiltered(paginatedItems)

                getPageCount = Math.ceil(soldItemsFiltered.length / itemsPerPage)
            }

            setPageCount(getPageCount)

            console.log(`LOG: Loading items from offset ${itemOffset} to ${endOffset}`)
        })()
    }, [itemOffset])

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
        if (response.error) {
            setSoldItemsCreatedErrors(response.errorList.errors)
        } else {
            console.log('LOG: Sold items created', response)
            soldItems.push(response)
            setSoldItems(soldItems)

            setSoldItemsCreatedErrors({})
            setIsSoldItemCreated(true)

            // Explicitly remove filter data
            setSoldItemsFiltered([])
            setIsFilter(false)

            setIsLoading(false)
        }
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

        const endOffset = itemOffset + itemsPerPage
        const paginatedItems = response.slice(itemOffset, endOffset)
        const getPageCount = Math.ceil(response.length / itemsPerPage)
        setPaginatedSoldItemsFiltered(paginatedItems)
        setPageCount(getPageCount)
        setCurrentPage(0)
        setItemOffset(0)

        setIsLoading(false)
    }

    async function handlePageClick(event) {
        const newOffset = (event.selected * itemsPerPage) % soldItems.length
        const newEndOffset = newOffset + itemsPerPage
        setCurrentPage(event.selected)
        setItemOffset(newOffset)

        console.log(`LOG: Current page: ${event.selected + 1}, starting offset (0-based): ${newOffset} - ${newEndOffset}`)
    }

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div className={classes.list}>
            <p>A list of sold items will be shown here...</p>
            <p>Total items sold: <strong>{soldItems.length}</strong></p>

            <AddSoldItemForm onAddSoldItem={handleAddSoldItem} errorList={soldItemsCreatedErrors} />

            {soldItems.length > 0 || isFilter ?
                <FilterSoldItemForm onFilterSoldItem={handleFilterSoldItem} />
                : ''
            }
            {soldItemsFiltered.length > 0 && isFilter ?
                <div className={classes.filteredSoldItems}>Your search criteria returned <strong>{soldItemsFiltered.length}</strong> results</div>
                : ''
            }

            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                breakLabel="..."
                nextLabel=">>"
                previousLabel="<<"
                pageRangeDisplayed={2}
                renderOnZeroPageCount={null}
                containerClassName={'d-flex align-items-center justify-content-center list-unstyled mx-auto'}
                previousLinkClassName={`text-decoration-none me-2 ${classes.page}`}
                breakClassName={classes.break}
                nextLinkClassName={`text-decoration-none ms-2 ${classes.page}`}
                pageClassName={classes.page}
                pageLinkClassName={'py-2 px-3 text-decoration-none'}
                disabledClassName={classes.disabled}
                activeClassName={'border border-2 border-dark fw-bold'}
            />

            {soldItems.length > 0 && soldItemsFiltered.length === 0 && !isFilter ?
                <SoldItems soldItems={paginatedSoldItems} onHandleDeleteSoldItem={handleDeleteSoldItem} /> :
                <SoldItems soldItems={paginatedSoldItemsFiltered} onHandleDeleteSoldItem={handleDeleteSoldItem} />
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