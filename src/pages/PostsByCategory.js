import { React, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import axios from "axios";
import Posts from "../components/Blog/Posts";
import classes from "./PostsByCategory.module.css";

function PostsByCategoryPage(props) {
    const auth = useSelector((state) => state.auth.value);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [posts, setPosts] = useState([]);

    const params = useParams();
    const categoryId = params.categoryId ? params.categoryId : props.categoryId;

    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/categories/${categoryId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setCategory(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios.get(`http://localhost:3001/api/blog/posts/categories/${categoryId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setPosts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        setIsLoading(false);
    }, [auth.bearerToken, categoryId]);

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
                <h1>Viewing all posts for category: {category.name}</h1>
                <Posts posts={posts} />
                </>
                :
                <div className={classes.noPosts}>There are no posts for category: <strong>{category.name}</strong></div>
            }
        </div>
    )
}

export default PostsByCategoryPage;
