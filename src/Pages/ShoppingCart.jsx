/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from '../Components/ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../Components/ShoppingCartTotal.jsx'
import {UserContext} from "../Components/UserContext.jsx";
import {css} from '@emotion/react';
import RedirectLoginRegister from '../Components/RedirectLoginRegister';

function ShoppingCart(){

    const userInformation = useContext(UserContext);

    return <Container
        css={css`
            min-height: calc(100vh - 232px); 
        `}
    >
        <div className="d-flex justify-content-center  mt-5 "
            css={css`
                margin-bottom: 180px;
            `}
        >
            <h1> Voici votre panier :</h1>
        </div>

        {userInformation.email === null && userInformation.token === null ?

            <RedirectLoginRegister></RedirectLoginRegister>
        : 
            <>
                <ShoppingCartTotal></ShoppingCartTotal>
                <ShoppingCartProduct></ShoppingCartProduct>
                <ShoppingCartProduct></ShoppingCartProduct>
                <ShoppingCartProduct></ShoppingCartProduct>
                <ShoppingCartTotal></ShoppingCartTotal>
            </>
        }
        
    </Container>
}

export default ShoppingCart;