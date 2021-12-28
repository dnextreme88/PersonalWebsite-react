import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import classes from "./Profile.module.css";

function Profile() {
    const auth = useSelector((state) => state.auth.value);

    if (auth.bearerToken.length < 1) {
        console.log(`LOG: Not logged in! Redirecting...`);
        return <Navigate to='/login' />
    }

    return (
        <div className={classes.main}>
            <h1>Profile Page</h1>
            <hr></hr>
            <p>User ID: {auth.userId}</p>
            <p>Username: {auth.username}</p>
            <p>Email: {auth.email}</p>
        </div>
    );
}

export default Profile;