/** @jsxImportSource @emotion/react */
import React, {useContext,useEffect, useCallback, useState} from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from '../Components/ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../Components/ShoppingCartTotal.jsx'
import {UserContext} from "../Components/UserContext.jsx";
import {css} from '@emotion/react';
import RedirectLoginRegister from '../Components/RedirectLoginRegister';
import axios from 'axios';

function ShoppingCart(){

    const userInformation = useContext(UserContext);
    const token = userInformation.token;

    const [data, setData] = useState({status: false})

    const displayArticles = useCallback(() => {

        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('https://127.0.0.1:8000/api/cart/products')
            .then(function (response) {
                setData({
                    status: true,
                    allArticles: response.data.allProducts,
                    totalPrice : parseInt(response.data.totalPrice),
                    totalArticles : parseInt(response.data.totalArticles)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    },[token])

    useEffect(()=>{
        displayArticles()
    },[displayArticles])


    return <Container
        css={css`
            min-height: 90vh; 
        `}
    >
        <div className="d-flex justify-content-center  mt-5 "
            css={css`
                margin-bottom: 100px;
            `}
        >
            <h1> Voici votre panier :</h1>
        </div>

        {userInformation.email === null && userInformation.token === null ?

            <RedirectLoginRegister></RedirectLoginRegister>
        : 
            <>
                <ShoppingCartTotal price={data.status === true ? data.totalPrice : 0}></ShoppingCartTotal>

                {data.status === true ? 
                    data.allArticles.map(article =>  <ShoppingCartProduct reFetch={displayArticles} key={article.id} id={article.id} quantity={article.quantity} image={article.image} title={article.title} price={article.price}></ShoppingCartProduct>) 
                : 
                    <div>chargement</div>
                }
                
                <ShoppingCartTotal price={data.status === true ? data.totalPrice : 0}></ShoppingCartTotal>
            </>
        }
        
    </Container>
}

export default ShoppingCart;