import { React, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { SendGetRequest } from '../../../helpers/SendApiRequest'

function EditCategoryModal(props) {
    const auth = useSelector((state) => state.auth.value)
    const nameInputRef = useRef()

    const [show, setShow] = useState(false)
    const [category, setCategory] = useState('')

    useEffect(() => {
        (async function fetchData() {
            const response = await SendGetRequest(auth.bearerToken, `api/blog/categories/${props.categoryId}`)
            if (!response.error) {
                setCategory(response)
            }
        })()
    }, [auth.bearerToken, props.categoryId, props.onEditCategory])

    function handleClose() {
        setShow(false)
    }

    function handleShow() {
        setShow(true)
    }

    function handleEditCategory() {
        setShow(false)

        const formData = { id: props.categoryId, name: nameInputRef.current.value }

        props.onEditCategory(formData)
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>Edit</Button>
    
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit category id {props.categoryId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label htmlFor='name'>Name</label>&nbsp;&nbsp;
                        <input type='text' id='name' ref={nameInputRef} defaultValue={category.name} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleEditCategory}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditCategoryModal