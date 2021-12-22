import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation() {
    return (
        <header className={classes.header}>
            <div className={classes.logo}><Link to="/">My Personal Website</Link></div>
            <nav>
                <ul className={classes.list}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/archive">Archives</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default MainNavigation;