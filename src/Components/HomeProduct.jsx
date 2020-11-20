/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
    Link
  } from "react-router-dom";

function HomeProduct ({title,textButton}) {

    const cardStyle = {
        width: '20rem', 
        margin : "10px"
    }

    return <Card css={cardStyle}>
            <Card.Title className="pt-4 pb-4 m-auto">{title}</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body className="pt-4 pb-4 m-auto">
                <Link to="/Product"><Button>{textButton}</Button></Link>
            </Card.Body>
        </Card>
}

HomeProduct.propTypes = {
    title : PropTypes.node,
    textButton : PropTypes.node
}

HomeProduct.defaultProps = {
    title : "Le Titre",
    textButton : "Voir l'article"
}

export default HomeProduct;