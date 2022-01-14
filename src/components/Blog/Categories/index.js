import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Unauthorized from '../../ui/Alerts/Unauthorized'
import Loading from '../../Spinners/Loading'
import { SendGetRequest } from '../../../helpers/SendApiRequest'

function Categories() {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/blog/categories')
            if (!response.error) {
                setCategories(response)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken])
    
    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div>
            {categories.map((category) =>
                    <p key={category.id}>{category.name}</p>
                )
            }
        </div>
    )
}

export default Categories