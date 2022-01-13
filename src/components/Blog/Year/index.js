import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loading from "../../Spinners/Loading";

function Year(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const params = useParams();
    const year = params.year ? params.year : props.year;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/posts/year/${year}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setPosts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, year]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>Year: {year}</h1>
            {posts.map((post) =>
                    <div key={post.id}>
                        <h1>Title: {post.title}</h1>
                        <h2>Slug: {post.slug}</h2>
                    </div>
                )
            }
        </div>
    )
}

export default Year;