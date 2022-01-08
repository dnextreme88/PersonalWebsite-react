import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import Posts from "../components/Blog/Posts";
import classes from "./PostsByUser.module.css";

function PostsByUserPage(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);

    const params = useParams();
    const userId = params.userId ? params.userId : props.userId;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`http://localhost:3001/api/blog/posts/users/${userId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setPosts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setIsLoading(false);
    }, [auth.bearerToken, userId]);

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            {posts.length > 0 ?
                <>
                <h1>Viewing all posts of: {user.username} ({user.email})</h1>
                <Posts posts={posts} />
                </>
                :
                <div className={classes.noPosts}><strong>{user.username}</strong> currently has no posts!</div>
            }
        </div>
    )
}

export default PostsByUserPage;
