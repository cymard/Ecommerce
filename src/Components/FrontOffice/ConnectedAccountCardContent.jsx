import React from "react";
import {Card } from "react-bootstrap";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';


function ConnectedAccountCardContent({ text, to, item}){
    return <Link to={to}>
        <Card className="d-flex justify-content-center">
            <Card.Body className="d-flex flex-column text-center">
                <div className="mb-3">{item}</div>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    </Link>
}

ConnectedAccountCardContent.propTypes = {
    text : PropTypes.string,
    to : PropTypes.string.isRequired,
    item : PropTypes.element,
}

export default ConnectedAccountCardContent;