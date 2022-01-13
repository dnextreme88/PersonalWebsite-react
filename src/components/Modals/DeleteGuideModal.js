import { React, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function DeleteGuideModal(props) {
    const [show, setShow] = useState(false);

    function handleClose() {
        setShow(false);
    }

    function handleShow() {
        setShow(true);
    }

    function handleDeleteGuide() {
        setShow(false);

        props.onDeleteGuide(props.guideId);
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete guide id {props.guideId}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this guide?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteGuide}>Confirm Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteGuideModal;