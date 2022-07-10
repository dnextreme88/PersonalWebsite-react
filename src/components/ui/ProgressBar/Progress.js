import React from 'react'
import { ProgressBar } from 'react-bootstrap'

function Progress(props) {
    return (
        <ProgressBar now={props.length} label={props.label} variant='success' striped animated />
    )
}

export default Progress