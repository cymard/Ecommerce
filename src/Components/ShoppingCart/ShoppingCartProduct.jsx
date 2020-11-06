import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';



function ShoppingCartProduct ({src, titre, prix}) {
    return <Card className="d-flex justify-content-between flex-row mb-4">
        <div>
            <Card.Img style={{height: "318px", width:"318px"}} src={src} />
        </div>

        <div className="d-flex flex-column align-items-center justify-content-around ">
            <Card.Title>{titre}</Card.Title>
            <Button variant="primary">Supprimer</Button>
        </div>

        <div className="d-flex align-items-center">
            <Card.Body><h3> {prix} €</h3></Card.Body>
            
        </div>
    </Card>
}

ShoppingCartProduct.propTypes = {
    src : PropTypes.string,
    titre : PropTypes.string,
    prix : PropTypes.number
}

ShoppingCartProduct.defaultProps = {
    src : "holder.js/100px160",
    titre : "Titre du produit",
    prix : 10
}

export default ShoppingCartProduct;