import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Education from '../components/AboutMe/Education'
import PersonalInfo from '../components/AboutMe/PersonalInfo'
import Skills from '../components/AboutMe/Skills'
import WorkExperience from '../components/AboutMe/WorkExperience'
import classes from './AboutMe.module.scss'

function AboutMePage() {
    return (
        // <div className={classes.container}>
        //     <div className={classes.personal_info}>
        //         <PersonalInfo />
        //     </div>
        //     <div className={classes.skills}>
        //         <Skills />
        //     </div>
        // </div>
        <Container className={classes.container}>
            <Row>
                <Col sm={12} md={6} className={classes.personal_info}>
                    <PersonalInfo />
                    <Skills />
                </Col>
                <Col sm={12} md={6} className={classes.skills}>
                    <Education />
                    <WorkExperience />
                </Col>
            </Row>
        </Container>
    )
}

export default AboutMePage