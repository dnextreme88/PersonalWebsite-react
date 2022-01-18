import { React, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

function DeleteCategoryModal(props) {
    const [show, setShow] = useState(false)

    function handleClose() {
        setShow(false)
    }

    function handleShow() {
        setShow(true)
    }

    function handleDeleteCategory() {
        setShow(false)

        props.onDeleteCategory(props.categoryId)
    }

    return (
        <>
            <Button variant="danger" onClick={handleShow}>Delete</Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete category id {props.categoryId}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this category?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteCategory}>Confirm Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteCategoryModal