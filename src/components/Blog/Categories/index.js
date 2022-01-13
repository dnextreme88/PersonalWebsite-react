import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
import Loading from "../../Spinners/Loading";
import classes from "./index.module.css";

function Categories() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/blog/categories', {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
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