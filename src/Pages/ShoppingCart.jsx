import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from '../Components/ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../Components/ShoppingCartTotal.jsx'
import TitleH1 from "../Components/TitleH1.jsx";

function ShoppingCart(){
    return <Container>
        <TitleH1>Voici votre Panier</TitleH1>
        <ShoppingCartTotal></ShoppingCartTotal>
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartTotal></ShoppingCartTotal>
    </Container>
}

export default ShoppingCart;