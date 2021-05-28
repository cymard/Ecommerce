import React from 'react';
import { Spinner } from 'react-bootstrap';

function CenteredSpinner () {
    return <div className="d-flex justify-content-center">
    <Spinner animation="border"/>
</div>
}

export default CenteredSpinner;