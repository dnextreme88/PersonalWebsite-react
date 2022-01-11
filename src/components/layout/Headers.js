import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import classes from "./Headers.module.css";

function Headers() {
    const auth = useSelector((state) => state.auth.value);

    return (
        <header className={classes.header}>
            <div className={classes.logo}><Link to="/">My Personal Website</Link></div>
            <nav>
                <ul className={classes.list}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/archive">Archives</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    {auth.bearerToken.length > 0
                        ?
                        <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                        </>
                        :
                        <>
                        <li><Link to="/login">Login</Link></li>
                        {/* <li><Link to="/signup">Register</Link></li> */}
                        </>
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Headers;