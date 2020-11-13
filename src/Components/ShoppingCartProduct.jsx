import React from 'react';
import { Card, Button ,Row, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';



function ShoppingCartProduct ({src, titre, prix}) {
    
    const rowStyle = {
        marginRight : "0",
        marginLeft : "0",
        width : "100%"
    }


    return <Card className="mb-5" style={{width: "100%"}}>
        <Row style={rowStyle}>
            <Card.Img style={{height: "318px", width:"318px"}} src={src} />
            <div className="col-7 pl-5 d-flex flex-column justify-content-between ">
                <Row className="mt-2" style={rowStyle}>
                    <h2>{titre}</h2>
                </Row>
                <Row style={rowStyle}>
                    <Form style={{width: "100%"}}>
                        <Form.Group style={{width: "100%"}} className="d-flex" controlId="formQuantity">
                            <Form.Label style={{fontSize : "1.2em"}}>Quantité : </Form.Label>
                            <Form.Control style={{width: "60px"}} className="ml-3 mr-3" type="text"/>
                            <Button>Mettre à jour</Button>
                        </Form.Group>
                    </Form>
                </Row>
                <Row className="mb-4" style={rowStyle}>
                    <Button variant="danger">Supprimer</Button>
                </Row>
            </div>
            <div>
                <p>Prix : {prix} €</p>
            </div>
        </Row>
        
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