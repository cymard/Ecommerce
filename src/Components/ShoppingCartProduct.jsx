/** @jsxImportSource @emotion/react */
import React from 'react';
import { Card, Button ,Row, Form} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';



function ShoppingCartProduct ({src, titre, prix}) {
    

    return <Card className="d-flex mb-5" 
        css={css`
            width: 100%;
            height : 318px;
        `}
    >
        <Row 
            css={css`
                margin-right : 0;
                margin-left : 0;
                height: 100%;
            `}
        >
            <div 
                css={css`
                    width: 318px;
                `}
            >
                <Card.Img src={src} 
                    css={css`
                        height: 318px;
                        width: 318px;
                    `}
                />
            </div>
            <div 
                css={css`
                    width: calc(100% - 318px);
                `}
            >
                <Row className="d-flex justify-content-between" 
                css={css`
                    margin-right : 0;
                    margin-left : 0;
                    height: 70%;
                `}
                >
                    
                    <div className="p-4 d-flex flex-column align-items-center justify-content-between">
                        <h2>{titre}</h2>
                        <Form 
                            css={css`
                                width: 100%;
                            `}
                        >
                            <Form.Group  className="d-flex" controlId="formQuantity"
                                css={css`
                                    width: 100%;
                                `}
                            >
                                <Form.Label 
                                    css={css`
                                        fontSize : 1.2em;
                                    `}
                                >
                                    Quantité : 
                                </Form.Label>
                                <Form.Control className="ml-3 mr-3" type="text" 
                                    css={css`
                                        width: 60px;
                                    `}
                                />
                                <Button>Mettre à jour</Button>
                            </Form.Group>
                        </Form>
                    </div>

                    <div className="p-4">
                        <p>Prix : {prix} €</p>
                    </div>
                </Row>
                <Row className="p-4 d-flex justify-content-end align-items-end" 
                    css={css`
                        marginRight : 0;
                        marginLeft : 0;
                        height: 30%;
                    `}
                >
                    <Button variant="danger" 
                        css={css`
                            height : 40px;
                        `}
                    >
                        Supprimer
                    </Button>
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