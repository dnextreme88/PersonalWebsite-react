import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Loading from "../../Spinners/Loading";
import { SendGetRequest } from "../../../helpers/SendApiRequest";

function MonthYear(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const params = useParams();
    const year = params.year ? params.year : props.year;
    const month = params.month ? params.month : props.month;

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/blog/posts/year/${year}/month/${month}`);
            setPosts(response);

            setIsLoading(false);
        })();
    }, [auth.bearerToken, month, year]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div>
            <h1>Month: {month}; Year: {year}</h1>
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

export default MonthYear;