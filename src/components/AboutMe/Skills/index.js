import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import Progress from '../../ui/ProgressBar/Progress'
import CSharpLogo from '../../../assets/logo-c-sharp.png'
import CodeIgniterLogo from '../../../assets/logo-codeigniter.png'
import DjangoLogo from '../../../assets/logo-django.png'
import JavaLogo from '../../../assets/logo-java.png'
import LaravelLogo from '../../../assets/logo-laravel.png'
import NetCoreLogo from '../../../assets/logo-net-core.png'
import NodeJsLogo from '../../../assets/logo-nodejs.png'
import PhpLogo from '../../../assets/logo-php.png'
import PythonLogo from '../../../assets/logo-python.png'
import ReactLogo from '../../../assets/logo-react.png'
import classes from './index.module.scss'

function Skills() {
    return (
        <Container fluid className={'p-0'}>
            <Row className={'mb-4'}>
                <Col sm={12} className={`${classes.title} text-center text-uppercase`}>
                    Technologies familiar with
                </Col>
                <Col sm={6}>
                    <Image src={CSharpLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={20} label={'20%'} />
                </Col>
                <Col sm={6}>
                    <Image src={CodeIgniterLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={60} label={'60%'} />
                </Col>
                <Col sm={6}>
                    <Image src={DjangoLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={40} label={'40%'} />
                </Col>

                <Col sm={6}>
                    <Image src={JavaLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={10} label={'10%'} />
                </Col>
                <Col sm={6}>
                    <Image src={LaravelLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={50} label={'50%'} />
                </Col>
                <Col sm={6}>
                    <Image src={NetCoreLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={20} label={'20%'} />
                </Col>

                <Col sm={6}>
                    <Image src={NodeJsLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={70} label={'70%'} />
                </Col>
                <Col sm={6}>
                    <Image src={PhpLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={60} label={'60%'} />
                </Col>
                <Col sm={6}>
                    <Image src={PythonLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={40} label={'40%'} />
                </Col>

                <Col sm={6}>
                    <Image src={ReactLogo} roundedCircle fluid thumbnail className={classes.logo} />
                    <Progress length={30} label={'30%'} />
                </Col>
            </Row>
        </Container>
    )
}

export default Skills