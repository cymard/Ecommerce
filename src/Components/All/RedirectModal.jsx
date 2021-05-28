import React from 'react';
import {Modal} from 'react-bootstrap'

function RedirectModal({show, onHide, children,firstButton, secondButton}){
    return <Modal centered={true} show={show} onHide={onHide}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body className="d-flex justify-content-center">{children}</Modal.Body>
    <Modal.Footer className="d-flex justify-content-center">
        {firstButton}
        {secondButton}
    </Modal.Footer>
</Modal>


}

export default RedirectModal;