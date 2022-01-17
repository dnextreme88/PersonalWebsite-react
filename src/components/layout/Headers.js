import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import classes from './Headers.module.css'

function Headers() {
    // Don't remove as for some reason, the condition on the navbar won't render properly if this was
    // commented or removed
    const auth = useSelector((state) => state.auth.value)
    console.log(Object.values(auth)[0].length > 0 ? `token validity: ${auth.tokenValidity}` : null)

    const hasToken = localStorage.getItem('token') ? localStorage.getItem('token').length > 0 : ''

    return (
        <header className={classes.header}>
            <div className={classes.logo}><Link to="/">My Personal Website</Link></div>
            <nav>
                <ul className={classes.list}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/archive">Archives</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li><Link to="/guides">FAQs</Link></li>
                    {hasToken
                        ?
                        <>
                        <li>Hi, <Link to="/profile">{localStorage.getItem('user')}</Link>!</li>
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

export default Headers