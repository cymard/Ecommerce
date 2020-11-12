import React from 'react';
import {Card,Button} from 'react-bootstrap';
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import PropTypes from 'prop-types';

function HomeProduct ({title,textButton}) {

    return <Card style={{ width: '20rem', margin : "10px"}}>
            <Card.Title className="pt-4 pb-4 m-auto">{title}</Card.Title>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body className="pt-4 pb-4 m-auto">
                <ModifiedLinksRouter color="white" to="/Product">
                    <Button>{textButton}</Button>
                </ModifiedLinksRouter>
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