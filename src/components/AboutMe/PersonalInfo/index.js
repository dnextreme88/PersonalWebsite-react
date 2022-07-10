import { useEffect, useState, React } from 'react'
import { CSSTransition } from 'react-transition-group'
import moment from 'moment'
import PersonalInfoImage from '../../../assets/about-me-personal-info.png'
import classes from './index.module.scss'

function PersonalInfo() {
    const [transitionState, setTransitionState] = useState(false)
    const [imageClasses, setImageClasses] = useState('d-none')
    const birthday = '1995-04-09'
    const imageClassesNames = `animate__animated ${imageClasses} fw-bold text-end`
    const details = [
        { key: 1, type: 'Name', value: 'Jeanne Kevin Arnmani Tibayan Decena' },
        { key: 2, type: 'Age', value: `${moment().diff(birthday, 'years')} years old` },
        { key: 3, type: 'Birthday', value: moment(birthday).format('MMMM D, YYYY') },
        { key: 4, type: 'Location', value: 'Baguio City, Philippines, 2600' },
    ]

    useEffect(() => {
        setTransitionState(!transitionState)
    }, [])

    function hideImage() {
        setImageClasses('d-none')
    }

    function showImage(element) {
        setImageClasses('d-block')
        element.style.opacity = 0
    }

    function removeOpacity(element) {
        element.style.opacity = 1
    }

    return (
        <div className={classes.container}>
            <div className={classes.personal_info_image}>
                <CSSTransition in={transitionState} timeout={900} classNames={{
                    enterActive: 'animate__fadeInUp',
                    exitActive: 'animate__fadeOutUp'
                    }}
                    onEnter={showImage}
                    onEntered={removeOpacity}
                    onExited={hideImage}
                    className={imageClassesNames}>
                    <img src={PersonalInfoImage} alt="Personal info image" title="Personal info image" />
                </CSSTransition>
            </div>
            <div className={classes.info}>
                {details.map((detail) =>
                    <div key={detail.key} className={classes.values}>
                        <span>{detail.type}:</span>
                        <CSSTransition in={transitionState} timeout={900} classNames={{
                            enterActive: 'animate__fadeInLeft',
                            exitActive: 'animate__fadeOutLeft'
                            }}
                            onEnter={showImage}
                            onEntered={removeOpacity}
                            onExited={hideImage}
                            className={`${imageClassesNames} ${detail.type == 'Name' ? 'text-uppercase' : ''}`}>
                            <span>{detail.value}</span>
                        </CSSTransition>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalInfo