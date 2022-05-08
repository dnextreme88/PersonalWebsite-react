import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import classes from './index.module.scss'

function UserInfo() {
    const auth = useSelector((state) => state.auth.value)

    if (localStorage.getItem('token').length < 1) {
        console.log('LOG: Not logged in! Redirecting...')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('tokenValidity')
        return <Navigate to='/login' />
    }

    return (
        <div className={classes.userInfo}>
            {auth.bearerToken.length > 0 ?
                <>
                <p>User ID: {auth.userId}</p>
                <p>Username: {auth.username}</p>
                <p>Email: {auth.email}</p>
                </>
                : <p>Cannot display user information because the auth payload is empty or the browser was refreshed. Please re-login again.</p>
            }
        </div>
    )
}

export default UserInfo