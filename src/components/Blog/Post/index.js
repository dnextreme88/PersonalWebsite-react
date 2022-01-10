import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from "axios";
import moment from "moment";
import classes from "./index.module.css";
import { openModal, closeModal } from "../../../features/Modal";

function Post(props) {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth.value);
    const modal = useSelector((state) => state.modal.value);
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([]);
    const [togglePostInfo, setTogglePostInfo] = useState(classes.hidden);
    const [togglePostInfoMsg, setTogglePostInfoMsg] = useState('Show post information')

    const params = useParams();
    const postId = params.postId ? params.postId : props.id;
    
    useEffect(() => {
        axios.get(`http://localhost:3001/api/blog/posts/${postId}`, {
            headers: { Authorization: `Bearer ${auth.bearerToken}` }
        })
            .then((response) => {
                setIsLoading(false);
                setPost(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [auth.bearerToken, postId]);

    function handleOnClickEdit() {
        dispatch(openModal());
    }

    function handleOnClickDelete() {
        dispatch(closeModal());
    }

    function handleShowPostInfo(event) {
        if (togglePostInfo === classes.hidden) {
            setTogglePostInfo(classes.show);
            setTogglePostInfoMsg('Hide post information');
        } else {
            setTogglePostInfo(classes.hidden);
            setTogglePostInfoMsg('Show post information');
        }
    }

    if (isLoading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const username = post.user ? post.user.username : '';
    const email = post.user ? post.user.email : '';
    const category = post.category ? post.category.name : '';

    return (
        <div className={classes.card}>
            <p>Modal value: {modal.toString()}</p>
            <div className={classes.postDetails}>
                <p className={classes.postDate}>Date: {moment(post.date).format("MMMM D, YYYY")}</p>
                <h1 className={classes.title}>{post.title}</h1>
            </div>
            <div className={classes.body}>
                <div>{post.content}</div>
            </div>

            <span className={classes.toggle} onClick={handleShowPostInfo}>{togglePostInfoMsg}</span>
            <div className={togglePostInfo}>
                <h2>Post Information</h2>
                <p>Posted by: <strong>{username} ({email})</strong></p>
                <p>Category: <strong>{category}</strong></p>
                <p>Post ID: <strong>{post.id}</strong></p>
                <p>Slug: <strong>{post.slug}</strong></p>
            </div>
            <div className={classes.actions}>
                <div className={classes.left}>
                    <button className={classes.edit} onClick={handleOnClickEdit}>Edit</button>
                </div>
                <div className={classes.right}>
                    <button className={classes.delete} onClick={handleOnClickDelete}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Post;