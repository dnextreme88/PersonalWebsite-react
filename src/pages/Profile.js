import { React } from "react";
import Profile from "../components/Profile/Profile";
import classes from "./Profile.module.css";
import PostsByUserLatest from "../components/Blog/PostsByUserLatest";
import LatestLogins from "../components/Profile/LatestLogins";

function ProfilePage() {
    return (
        <div>
            <h1 className={classes.title}>Profile Page</h1>
            <hr></hr>
            <Profile />
            <LatestLogins />
            <PostsByUserLatest />
        </div>
    )
}

export default ProfilePage;