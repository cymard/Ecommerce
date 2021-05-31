/** @jsxImportSource @emotion/react */
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';


function ShoppingCartProductTitleAndPrice ({title, price}) {
    return <Row 
    css={css`
       height: 40%;
    `}
>
    <Col className="text-center pt-2" lg={5} sm={12}>
        <h2>{title}</h2>
    </Col>    
    <Col lg={4} sm={0}></Col>
    <Col className="text-center pt-2" lg={3} sm={12} >
        <p 
            css={css`
                font-size: 20px;
            `}
        >
            Prix : {price} €
        </p>
    </Col> 
</Row>   
}

ShoppingCartProductTitleAndPrice.propTypes = {
    title : PropTypes.string.isRequired,
    price : PropTypes.number.isRequired
}

export default ShoppingCartProductTitleAndPrice;