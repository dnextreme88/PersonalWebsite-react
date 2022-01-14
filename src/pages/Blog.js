import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Posts from "../components/Blog/Posts";
import Sidebar from "../components/Blog/Sidebar";
import Unauthorized from "../components/ui/Alerts/Unauthorized";
import Loading from "../components/Spinners/Loading";
import { SendGetRequest } from "../helpers/SendApiRequest";
import classes from "./Blog.module.css";

function BlogPage() {
    const auth = useSelector((state) => state.auth.value);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/blog/posts');
            if (!response.error) {
                setPosts(response);

                setIsAuth(true);
                setIsLoading(false);
            }
        })();
    }, [auth.bearerToken]);

    if (isLoading && isAuth) return <Loading />
    else if (!isAuth) return <Unauthorized />

    return (
        <div className={classes.main}>
            <div className={classes.right}><Sidebar /></div>
            <div className={classes.left}><Posts posts={posts} /></div>
        </div>
    )
}

export default BlogPage;