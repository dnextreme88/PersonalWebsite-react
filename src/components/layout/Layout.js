import MainNavigation from "./MainNavigation";
import Footers from "./Footers";
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div>
            <MainNavigation />
            <main className={classes.main}>{props.children}</main>
            <Footers />
        </div>
    );
}

export default Layout;