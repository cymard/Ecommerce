import React from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from './ShoppingCartProduct.jsx'
import ShoppingCartTotal from './ShoppingCartTotal.jsx'

function ShoppingCart(){
    return <Container>
        <div className="d-flex justify-content-center mb-5 mt-4">
            <h1>Voici votre Panier : </h1>
        </div>
        
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartProduct></ShoppingCartProduct>
        <ShoppingCartProduct></ShoppingCartProduct>

        <ShoppingCartTotal></ShoppingCartTotal>
        
    </Container>
}

export default ShoppingCart;