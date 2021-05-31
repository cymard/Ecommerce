/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button, Row, Col, Form} from 'react-bootstrap';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';


function ShoppingCartProductQuantity ({quantityToBuyChange, quantityToBuy, updateQuantity}) {
    return  <Row 
    css={css`
        height: 40%;
    `}
>
    <Col lg={3} sm={0}></Col>
    <Col lg={7} md={12} sm={12}> 
        <Form 
            css={css`
                width: 100%;
            `}
        >
            <Form.Group 
                css={css`
                    width: 100%;
                    display: flex;
                    justify-content: center;
                `}
            >
                <Form.Label 
                    css={css`
                        fontSize : 1.2em;
                    `}
                >
                    Quantité : 
                </Form.Label>
                <Form.Control id="quantityToBuy" value={quantityToBuy} onChange={quantityToBuyChange} className="ml-3 mr-3" type="text" 
                    css={css`
                        width: 60px;
                    `}
                />
                <Button onClick={updateQuantity}>Mettre à jour</Button>
            </Form.Group>
        </Form> 
    </Col>
    <Col lg={2} sm={0}></Col>
</Row> 
}

ShoppingCartProductQuantity.propTypes = {
    quantityToBuyChange : PropTypes.func,
    quantityToBuy : PropTypes.number,
    updateQuantity : PropTypes.func,
}


export default ShoppingCartProductQuantity;