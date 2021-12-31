import Headers from "./Headers";
import Footers from "./Footers";
import classes from './Layout.module.css';

function Layout(props) {
    return (
        <div>
            <Headers />
            <main className={classes.main}>{props.children}</main>
            <Footers />
        </div>
    );
}

export default Layout;