import React from 'react'
import { Alert } from 'react-bootstrap'

function ValidationErrors(props) {
    return (
        <Alert variant='danger'>
            <Alert.Heading>Error list:</Alert.Heading>
            <ul>
                {props.errors.map((error, index) =>
                    <li key={index}>{error}</li>
                )}
            </ul>
        </Alert>
    )
}

export default ValidationErrors