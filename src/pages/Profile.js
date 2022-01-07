import { React } from "react";
import Profile from "../components/Profile/Profile";
import classes from "./Profile.module.css";
import UserPostsLatest from "../components/Blog/UserPostsLatest";

function ProfilePage() {
    return (
        <div>
            <h1 className={classes.title}>Profile Page</h1>
            <hr></hr>
            <Profile />
            <UserPostsLatest />
        </div>
    )
}

export default ProfilePage;