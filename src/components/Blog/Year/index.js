import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Unauthorized from "../../ui/Alerts/Unauthorized";
import Loading from "../../Spinners/Loading";
import { SendGetRequest } from "../../../helpers/SendApiRequest";

function Year(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const params = useParams();
    const year = params.year ? params.year : props.year;

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/blog/posts/year/${year}`);
            if (!response.error) {
                setPosts(response);

                setIsAuth(true);
                setIsLoading(false);
            }
        })();
    }, [auth.bearerToken, year]);

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

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