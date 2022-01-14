import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Unauthorized from '../components/ui/Alerts/Unauthorized'
import Loading from '../components/ui/Spinners/Loading'
import NoResults from '../components/ui/Alerts/NoResults'
import Success from '../components/ui/Alerts/Success'
import ValidationErrors from '../components/ui/Alerts/ValidationErrors'
import FAQs from '../components/FAQs/FAQs'
import AddGuideForm from '../components/forms/AddGuideForm'
import FilterGuideForm from '../components/forms/FilterGuideForm'
import { SendGetRequest, SendPostRequest } from '../helpers/SendApiRequest'

function Guides() {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorList, setErrorList] = useState([])
    const [isGuideCreated, setIsGuideCreated] = useState(false)
    const [isGuideDeleted, setIsGuideDeleted] = useState(false)
    const [guides, setGuides] = useState([])
    const [guidesFiltered, setGuidesFiltered] = useState([])
    const [isFilter, setIsFilter] = useState(false)

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/guides')
            if (!response.error) {
                setGuides(response)

                // Reset default state so that the page re-renders when a guide is created or deleted
                setIsGuideCreated(false)
                setIsGuideDeleted(false)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken, isGuideCreated, isGuideDeleted])

    async function handleAddGuide(guideData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/guides', guideData)

        if (response.error) {
            const errors = []
            for (const [key, value] of Object.entries(response.errorList.errors)) {
                errors.push(`${key} - ${value}`)
            }
            setErrorList(errors)

            setIsSuccess(false)
            setIsError(true)
        } else {
            console.log('LOG: Guide created', response)
            guides.push(response)
            setGuides(guides)
    
            setIsGuideCreated(true)
    
            // Explicitly remove filter data
            setGuidesFiltered([])
            setIsFilter(false)
    
            setIsSuccess(true)
            setIsError(false)

            setIsLoading(false)
        }
    }

    async function handleDeleteGuide(guideId) {
        await SendPostRequest(auth.bearerToken, `api/guides/${guideId}/delete`)
        console.log('LOG: Guide deleted')

        setIsGuideDeleted(true)

        // Explicitly remove filter data
        setGuidesFiltered([])
        setIsFilter(false)

        setIsSuccess(false)
        setIsError(false)
    }

    async function handleFilterGuide(filterFormData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/guides/filter', filterFormData)
        console.log('LOG: Guides filtered', response)

        setGuidesFiltered(response)
        setIsFilter(true)

        setIsSuccess(false)
        setIsError(false)

        setIsLoading(false)
    }

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div>
            <h1>List of FAQs</h1>
            <p>Total guides written: <strong>{guides.length}</strong></p>

            {isError ?
                <ValidationErrors errors={errorList} />
                : ''
            }
            {isSuccess ?
                <Success heading='Success!' message='Guide created successfully.' />
                : ''
            }
            <AddGuideForm onAddGuide={handleAddGuide} />

            {guides.length > 0 || isFilter ?
                <FilterGuideForm onFilterGuide={handleFilterGuide} />
                : ''
            }
            {guidesFiltered.length > 0 && isFilter ?
                <Success heading='Search success!' message={`Your search criteria returned ${guidesFiltered.length === 1 ? `${guidesFiltered.length} result` : `${guidesFiltered.length} results`}.`} />
                : ''
            }

            {guides.length > 0 && guidesFiltered.length === 0 && !isFilter ?
                <FAQs faqs={guides} onDeleteGuide={handleDeleteGuide} /> :
                <FAQs faqs={guidesFiltered} onDeleteGuide={handleDeleteGuide} />
            }

            {/* DISPLAY ERROR MESSAGES */}
            {guides.length < 1 && !isFilter ?
                <NoResults message='You have no guides at the moment!' />
                : ''
            }
            {guidesFiltered.length < 1 && isFilter ?
                <NoResults heading='Search error!' message='Your search criteria returned nothing!' />
                : ''
            }
        </div>
    )
}

export default Guides