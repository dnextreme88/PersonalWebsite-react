import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./index.module.css";

function Sidebar() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(false);
    const [monthsYears, setMonthsYears] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/posts/monthsAndYears`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setMonthsYears(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken]);

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={classes.main}>
            <h2>Browse...</h2>
            <nav>
                <ul>
                    {monthsYears.map((monthYear, index) => 
                            <li key={index}>{monthYear.text}</li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;