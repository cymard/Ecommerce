/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from '../Components/ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../Components/ShoppingCartTotal.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import {UserContext} from "../Components/UserContext.jsx";
import {css} from '@emotion/react';
import {Button} from 'react-bootstrap';
import {
    Link
  } from "react-router-dom";

function ShoppingCart(){

    // verifier que l'utilisateur est connecté
    // -> verifier si le context existe
    const userInformation = useContext(UserContext);
    console.log(userInformation);

    return <Container
        css={css`
            min-height: calc(100vh - 232px); 
        `}
    >
        <TitleH1>Voici votre Panier</TitleH1>
        {userInformation.email === null && userInformation.token === null 
        
        ?
        <div
            css={css`
               display: flex;
               justify-content: center;
               width: 100%;
               flex-direction: column;
               margin-top: 150px;
               background-color: #c5cdc7;
               padding: 30px 0;
               border-radius: 5px;
            `}
        >
            <div
                css={css`
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    flex-direction: row;
                `}
            
            >
                <h2 className="mb-5">Pour accéder à votre panier vous devez être connecté </h2>
            </div>
            <div
                css={css`
                    display: flex;
                    justify-content: space-around;
                    width: 100%;
                `}
            >
                <Link to="/Login"><Button variant="success">Connectez-vous à votre compte</Button></Link>
                
                <Link to="/Register"><Button variant="warning">Inscrivez-vous maintenant</Button></Link>
            </div>
        </div>
        
        
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