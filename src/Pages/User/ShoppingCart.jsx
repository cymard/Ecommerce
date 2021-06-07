/** @jsxImportSource @emotion/react */
import React, {useContext,useEffect, useCallback, useState} from 'react';
import { Container, Alert } from 'react-bootstrap';
import ShoppingCartProduct from '../../Components/FrontOffice/ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../../Components/FrontOffice/ShoppingCartTotal.jsx'
import {UserContext} from "../../Components/Context/UserContext.jsx";
import {css} from '@emotion/react';
import RedirectLoginRegister from '../../Components/FrontOffice/RedirectLoginRegister';
import axios from 'axios';
import CenteredSpinner from '../../Components/All/CenteredSpinner.jsx';

function ShoppingCart(){

    const {token, email} = useContext(UserContext);
    const [data, setData] = useState({status: false})
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })
    const isCurrentUserConnected = email === null && token === null;

    const displayArticles = useCallback(() => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('https://relaxed-sammet-0deed4.netlify.app/api/cart/products')
            .then(function (response) {
                setData({
                    status: true,
                    allArticles: response.data.allProducts,
                    totalPrice : parseInt(response.data.totalPrice),
                    totalArticles : parseInt(response.data.totalArticles)
                })
            })
            .catch(function (error) {
                console.warn(error);
            })
    },[token])

    useEffect(()=>{
        displayArticles()
    },[displayArticles])

    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )


    return <Container
        css={css`
            min-height: 90vh; 
        `}
    >
        <Alert 
            variant={alertState.variant}
            show={alertState.isOpen}
            css={css`
                position: sticky;
                top: 100px;
                min-width: 10px;
                max-width: 300px;
                text-align: center;
                z-index: 1;
                box-shadow: 1px 1px 1px black;
            `}
        >
            {alertState.text}
        </Alert>
        <div 
            css={css`
                display: flex;
                justify-content: center;
                margin-top: 60px;
                margin-bottom: 100px;
            `}
        >
            <h1> Voici votre panier :</h1>
        </div>

        {isCurrentUserConnected ?

            <RedirectLoginRegister></RedirectLoginRegister>
        : 
            <>
            <ShoppingCartTotal price={data.status === true ? data.totalPrice : 0}></ShoppingCartTotal>

            {data.status === true ? 
                data.allArticles.map(article =>  <ShoppingCartProduct reFetch={displayArticles} key={article.id} id={article.id} quantity={article.quantity} image={article.image} title={article.title} price={article.price} closeAlert={closeAlert} setAlertState={setAlertState}></ShoppingCartProduct>) 
            : 
                <CenteredSpinner></CenteredSpinner>
            }
            
            <ShoppingCartTotal price={data.status === true ? data.totalPrice : 0}></ShoppingCartTotal>
            </>
        }
        
    </Container>
}

export default ShoppingCart;