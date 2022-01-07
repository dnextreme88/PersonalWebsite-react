import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import classes from "./index.module.css";
import MonthYear from "../MonthYear";
import Year from "../Year";

function Sidebar() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(false);
    const [monthsYears, setMonthsYears] = useState([]);
    const years = [];

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

    for (let i = 2011; i <= 2022; i++) {
        years.push(i.toString());
    }

    function handleOnClick(year, month) {
        if (year && month) {
            <MonthYear
                year={year}
                month={month}
            />
        } else if (year && !month) {
            <Year year={year} />
        }
    }

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
                            years.includes(monthYear.text) ?
                                <li key={index} className={classes.year} onClick={() => handleOnClick(monthYear.year)}><Link to={`/blog/posts/${monthYear.text}`}>{monthYear.text}</Link> ({monthYear.count})</li>
                                :
                                <li key={index} className={classes.item} onClick={() => handleOnClick(monthYear.year, monthYear.month)}><Link to={`/blog/posts/${monthYear.year}/${monthYear.month}`}>{monthYear.text}</Link> ({monthYear.count})</li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Sidebar;