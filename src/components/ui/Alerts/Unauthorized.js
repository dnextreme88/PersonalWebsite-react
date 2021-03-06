import React from 'react'
import { Alert } from 'react-bootstrap'

function Unauthorized() {
    return (
        <Alert variant='danger'>
            <Alert.Heading>Error: Token not found in Authorization headers</Alert.Heading>
            You must be logged in to see this page!
        </Alert>
    )
}

export default Unauthorized