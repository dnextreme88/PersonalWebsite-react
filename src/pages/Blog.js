import Posts from "../components/Blog/Posts";
import Sidebar from "../components/Blog/Sidebar";
import classes from "./Blog.module.css";

function BlogPage() {
    return (
        <div className={classes.main}>
            <div className={classes.right}>
                <Sidebar />
            </div>
            <div className={classes.left}><Posts /></div>
        </div>
    )
}

export default BlogPage;