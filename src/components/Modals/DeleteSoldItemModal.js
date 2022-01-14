import { React, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteSoldItemModal(props) {
    const [show, setShow] = useState(false)

    function handleClose() {
        setShow(false)
    }

    function handleShow() {
        setShow(true)
    }

    function handleDeleteSoldItem() {
        setShow(false)

        props.onDeleteSoldItem(props.soldItemId)
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete sold item id {props.soldItemId}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this sold item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteSoldItem}>Confirm Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteSoldItemModal