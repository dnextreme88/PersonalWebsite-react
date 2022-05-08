import React from 'react'
import UserInfo from '../components/Profile/UserInfo'
import PostsByUserLatest from '../components/Blog/PostsByUserLatest'
import LatestLogins from '../components/Profile/LatestLogins'
import classes from './Profile.module.scss'

function ProfilePage() {
    return (
        <div>
            <h1 className={classes.title}>Profile Page</h1>
            <hr></hr>
            <UserInfo />
            <LatestLogins />
            <PostsByUserLatest />
        </div>
    )
}

export default ProfilePage