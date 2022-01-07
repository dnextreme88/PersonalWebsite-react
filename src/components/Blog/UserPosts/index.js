import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import classes from "./index.module.css";

function UserPosts(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const params = useParams();
    const userId = params.userId ? params.userId : props.userId;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/posts/users/${userId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setPosts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, userId]);

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div className={classes.main}>
            {posts.map((post) =>
                <div key={post.id} className={classes.post}>
                    <div className={classes.postHeader}>
                        <Link to={`/blog/posts/${post.id}/${post.slug}`}>
                            <span className={classes.left}>{post.title}</span>
                            <span className={classes.right}>{post.date}</span>
                        </Link>
                    </div>
                    <div className={classes.postContent}>
                        <p>{post.content}</p>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default UserPosts;
