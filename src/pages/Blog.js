import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Posts from "../components/Blog/Posts";
import Sidebar from "../components/Blog/Sidebar";
import classes from "./Blog.module.css";

function BlogPage() {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/blog/posts', {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setPosts(response.data.data);
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
            <div className={classes.right}>
                <Sidebar />
            </div>
            <div className={classes.left}><Posts posts={posts} /></div>
        </div>
    )
}

export default BlogPage;