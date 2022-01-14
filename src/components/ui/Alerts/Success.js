import { Alert } from "react-bootstrap";

function Success(props) {
    return (
        <Alert variant='success'>
            {props.heading ?
                <Alert.Heading>{props.heading}</Alert.Heading>
                : ''
            }
            {props.message}
        </Alert>
    )
}

export default Success;