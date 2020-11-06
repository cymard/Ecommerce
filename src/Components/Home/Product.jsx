import React from 'react';
import {Card,Button} from 'react-bootstrap';
import HeaderLinks from '../Header/HeaderLinks.jsx';
import PropTypes from 'prop-types';

function Product ({title,textButton}) {

    return <Card style={{ width: '20rem', margin : "10px"}}>
            <Card.Title className="pt-4 pb-4 m-auto">{title}</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body className="pt-4 pb-4 m-auto">
                <Button>
                    <HeaderLinks color="white" to="/Product">{textButton}</HeaderLinks>
                </Button>
            </Card.Body>
        </Card>

}

Product.propTypes = {
    title : PropTypes.node,
    textButton : PropTypes.node
}

Product.defaultProps = {
    title : "Le Titre",
    textButton : "Voir l'article"
}

export default Product;