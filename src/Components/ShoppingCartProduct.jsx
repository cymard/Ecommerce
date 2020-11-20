/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card, Button ,Row, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';



function ShoppingCartProduct ({src, titre, prix}) {

    const onlyMaxWidth = {
        width: "100%"
    }

    const cardStyle = {
        width: "100%",
        height : "318px"
    }

    const rowStyle = {
        marginRight : "0",
        marginLeft : "0", 
        height: "100%"
    }

    const rowStyle2 = {
        marginRight : "0",
        marginLeft : "0",
        height:"70%"
    }

    const rowStyle3 = {
        marginRight : "0",
        marginLeft : "0",
        height:"30%"
    }

    const cardImgStyle = {
        height: "318px", 
        width:"318px"
    }

    const divImgStyle = {
        width: "318px"
    }

    const divWidthStyle = {
        width: "calc(100% - 318px)"
    }

    const formLabelFontSize = {
        fontSize : "1.2em"
    }

    const formControlWidth = {
        width: "60px"
    }

    const buttonStyle = {
        height : "40px"
    }
    

    return <Card className="d-flex mb-5" css={cardStyle}>
        <Row css={rowStyle}>
            <div css={divImgStyle}>
                <Card.Img css={cardImgStyle} src={src} />
            </div>
            <div css={divWidthStyle}>
                <Row className="d-flex justify-content-between" css={rowStyle2}>
                    
                    <div className="p-4 d-flex flex-column align-items-center justify-content-between">
                        <h2>{titre}</h2>
                        <Form css={onlyMaxWidth}>
                            <Form.Group css={onlyMaxWidth} className="d-flex" controlId="formQuantity">
                                <Form.Label css={formLabelFontSize}>Quantité : </Form.Label>
                                <Form.Control css={formControlWidth} className="ml-3 mr-3" type="text"/>
                                <Button>Mettre à jour</Button>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="p-4">
                        <p>Prix : {prix} €</p>
                    </div>
                </Row>
                <Row className="p-4 d-flex justify-content-end align-items-end" css={rowStyle3}>
                    <Button css={buttonStyle} variant="danger">Supprimer</Button>
                </Row>
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