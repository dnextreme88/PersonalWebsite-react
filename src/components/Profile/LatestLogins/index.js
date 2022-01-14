import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Unauthorized from '../../ui/Alerts/Unauthorized'
import Loading from '../../ui/Spinners/Loading'
import { SendGetRequest } from '../../../helpers/SendApiRequest'
import classes from './index.module.css'

function LatestLogins() {
    const auth = useSelector((state) => state.auth.value)
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [latestLogins, setLatestLogins] = useState([])

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/users/${auth.userId}/login/latest`)
            if (!response.error) {
                setLatestLogins(response)

                setIsAuth(true)
                setIsLoading(false)
            }
        })()
    }, [auth.bearerToken, auth.userId])

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div className={classes.latestLogins}>
            <h2>Login history:</h2>
            <ul>
                {latestLogins.map((login) =>
                    <li className={classes.logins} key={login.id}>{moment(login.createdAt).format('MMMM D, YYYY h:mm:ss A')}</li>
                )}
            </ul>
        </div>
    )
}

export default LatestLogins