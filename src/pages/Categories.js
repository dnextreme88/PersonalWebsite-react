import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Success from '../components/ui/Alerts/Success'
import ValidationErrors from '../components/ui/Alerts/ValidationErrors'
import Categories from '../components/Blog/Categories'
import AddCategoryForm from '../components/forms/AddCategoryForm'
import { SendGetRequest, SendPostRequest } from '../helpers/SendApiRequest'

function CategoriesPage() {
    const auth = useSelector((state) => state.auth.value)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorList, setErrorList] = useState([])
    const [isCategoryCreated, setIsCategoryCreated] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/blog/categories')
            if (!response.error) {
                setCategories(response)

                // Reset default state so that the page re-renders when a category is created
                setIsCategoryCreated(false)
            }
        })()
    }, [auth.bearerToken, isCategoryCreated])

    async function handleAddCategory(categoryData) {
        const response = await SendPostRequest(auth.bearerToken, 'api/blog/categories', categoryData)

        if (response.error) {
            const errors = []
            for (const [key, value] of Object.entries(response.errorList.errors)) {
                errors.push(`${key} - ${value}`)
            }
            setErrorList(errors)

            setIsSuccess(false)
            setIsError(true)
        } else {
            console.log('LOG: Category created', response)
            categories.push(response)
            setCategories(categories)
    
            setIsCategoryCreated(true)
    
            setIsSuccess(true)
            setIsError(false)
        }
    }

    return (
        <div>
            {isError ?
                <ValidationErrors errors={errorList} />
                : ''
            }
            {isSuccess ?
                <Success heading='Success!' message='Category created successfully.' />
                : ''
            }

            <AddCategoryForm onAddCategory={handleAddCategory} />
            <Categories categories={categories} />
        </div>
    )
}

export default CategoriesPage