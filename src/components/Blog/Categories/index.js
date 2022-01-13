import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Loading from "../../Spinners/Loading";
import { SendGetRequest } from "../../../helpers/SendApiRequest";
import classes from "./index.module.css";

function Categories() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/blog/categories');

            setIsLoading(false);
            setCategories(response);
        })();
    }, [auth.bearerToken]);
    
    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            {categories.map((category) =>
                    <p key={category.id}>{category.name}</p>
                )
            }
        </div>
    )
}

export default Categories;