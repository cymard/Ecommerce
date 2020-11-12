import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from '../ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../ShoppingCartTotal.jsx'
import TitleH1 from "../TitleH1.jsx";

function ShoppingCart(){
    return <Container>
        <TitleH1>Voici votre Panier</TitleH1>
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartProduct></ShoppingCartProduct>

        <ShoppingCartTotal></ShoppingCartTotal>
        
    </Container>
}

export default ShoppingCart;