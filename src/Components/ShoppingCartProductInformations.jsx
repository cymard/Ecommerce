/** @jsxImportSource @emotion/react */
import React from 'react';
import {Col} from 'react-bootstrap';
import {css} from '@emotion/react';
import ShoppingCartProductQuantity from './ShoppingCartProductQuantity.jsx';
import ShoppingCartProductTitleAndPrice from './ShoppingCartProductTitleAndPrice.jsx';
import ShoppingCartProductDelete from './ShoppingCartProductDelete.jsx';


function ShoppingCartProductInformations ({title, price, quantityToBuy, quantityToBuyChange, updateQuantity, handleClickDelete}) {
    return <Col
    css={css`
        display: flex;
        flex-direction: column;
        border: solid #DFDFDF 1px;
        border-radius: 5px;
        min-height: 318px;
    `}
    sm={12}
    md={12}
    lg={7}
>
    <ShoppingCartProductTitleAndPrice
        title={title}
        price={price}
    />
    <ShoppingCartProductQuantity 
        quantityToBuyChange={quantityToBuyChange} 
        quantityToBuy={quantityToBuy} 
        updateQuantity={updateQuantity}
    />

    <ShoppingCartProductDelete handleClickDelete={handleClickDelete}/>
</Col>      
}

export default ShoppingCartProductInformations;