import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import classes from "./index.module.css";
import { Link } from "react-router-dom";

function UserPostsLatest(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const userId = auth.userId ? auth.userId : props.userId;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/posts/users/${userId}/latest`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setPosts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, userId])

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={classes.posts}>
            <h2 className={classes.recentPosts}>Recent blog posts:</h2>
            {posts.map((post) =>
                <div key={post.id} className={classes.post}>{post.title}</div>
                )
            }
            <p className={classes.userPosts}><Link to={`../blog/posts/users/${userId}`}>View all posts by this user</Link></p>
        </div>
    )
}

export default UserPostsLatest;