import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { stripHtmlTag } from "../../../helpers/Format";
import classes from "./index.module.css";

function Posts(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setIsLoading(false);
        setPosts(props.posts);
    }, [props.posts]);

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
                            <span className={classes.right}>{moment(post.date).format("MMMM D, YYYY")}</span>
                        </Link>
                    </div>
                    <div className={classes.postContent}>
                        <p>
                        {
                            stripHtmlTag(post.content).length >= 100 ?
                            <>
                            <span dangerouslySetInnerHTML={{ __html: post.content.substring(0, 100) }} />... <Link to={`/blog/posts/${post.id}/${post.slug}`}>Read More</Link>
                            </>
                            :
                            <span dangerouslySetInnerHTML={{ __html: post.content }} />
                        }
                        </p>
                    </div>
                </div>
                )
            }
        </div>
    )
}

export default Posts;
