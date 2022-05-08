import React from 'react'
import classes from './Footers.module.scss'

function Footers() {
    function goToGitHubHandler() {
        window.open('https://github.com/dnextreme88?tab=repositories')
    }

    function goToYouTubeHandler() {
        window.open('https://www.youtube.com/channel/UCwUQOUOoEDZTWk4sN8VAxtg')
    }

    return (
        <footer className={classes.footer}>
            <div className={classes.social}>
                <ul>
                    <li><img src="https://icon-library.com/images/github-icon-for-resume/github-icon-for-resume-14.jpg" alt="GitHub repository" onClick={goToGitHubHandler} /></li>
                    <li><img src="https://cdn.iconscout.com/icon/free/png-256/youtube-3771459-3149879.png" alt="YouTube channel" onClick={goToYouTubeHandler} /></li>
                </ul>
            </div>
            <div className={classes.copyright}>
                <p>All rights reserved.</p>
                <p>Copyright &copy; 2021 by Kevin Decena</p>
                <p>Per DTI-NCR Permit No. 12232021, Series of 2021.</p>
            </div>
        </footer>
    )
}

export default Footers