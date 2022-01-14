import React from 'react'
import { Alert } from 'react-bootstrap'

function NoResults(props) {
    return (
        <Alert variant='danger'>
            {props.heading ?
                <Alert.Heading>{props.heading}</Alert.Heading>
                : ''
            }
            {props.message}
        </Alert>
    )
}

export default NoResults