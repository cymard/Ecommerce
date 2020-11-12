import React from 'react';
import { Card, Button ,Row} from 'react-bootstrap';
import PropTypes from 'prop-types';



function ShoppingCartProduct ({src, titre, prix}) {
    
    return <div >
        <Row className="d-flex justify-content-center flex-row mb-5">
            <div className="col-lg-4 col-md-12 d-flex justify-content-center mb-2">
                <Card.Img style={{height: "318px", width:"318px"}} src={src} />
            </div>

            <Card style={{height : "318px"}} className="col-lg-7 col-md-12 d-flex align-items-center justify-content-around mb-2 flex-column mr-2 ml-2">
                <Card.Title>{titre}</Card.Title>
                <h3> {prix} €</h3>
                <Button variant="primary">Supprimer</Button>
            </Card>
        </Row>
        
    </div>

    
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