import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import moment from "moment";
import classes from "./index.module.css";

function LatestLogins(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [latestLogins, setLatestLogins] = useState([]);

    // const userId = auth.userId ? auth.userId : props.userId;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/${auth.userId}/login/latest`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setLatestLogins(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, auth.userId]);

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={classes.latestLogins}>
            <h2>Login history:</h2>
            <ul>
                {latestLogins.map((login) =>
                    <li className={classes.logins} key={login.id}>{moment(login.createdAt).format("MMMM D, YYYY h:mm:ss A")}</li>
                )}
            </ul>
        </div>
    )
}

export default LatestLogins;