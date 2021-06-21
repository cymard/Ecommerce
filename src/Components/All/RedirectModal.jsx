import React from 'react';
import {Modal} from 'react-bootstrap'
import PropTypes from 'prop-types';

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

RedirectModal.propTypes = {
    show : PropTypes.bool,
    onHide : PropTypes.func.isRequired,
    children : PropTypes.string.isRequired,
    firstButton : PropTypes.element,
    secondButton : PropTypes.element
}

export default RedirectModal;