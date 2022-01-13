import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Posts from "../components/Blog/Posts";
import Sidebar from "../components/Blog/Sidebar";
import Loading from "../components/Spinners/Loading";
import { SendGetRequest } from "../helpers/SendApiRequest";
import classes from "./Blog.module.css";

function BlogPage() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, 'api/blog/posts');
            setPosts(response);
            
            setIsLoading(false);
        })();
    }, [auth.bearerToken]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <div className={classes.main}>
            <div className={classes.right}><Sidebar /></div>
            <div className={classes.left}><Posts posts={posts} /></div>
        </div>
    )
}

export default BlogPage;