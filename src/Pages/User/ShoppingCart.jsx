/** @jsxImportSource @emotion/react */
import React, {useContext,useEffect, useCallback, useState} from 'react';
import { Container } from 'react-bootstrap';
import ShoppingCartProduct from '../../Components/FrontOffice/ShoppingCartProduct.jsx'
import ShoppingCartTotal from '../../Components/FrontOffice/ShoppingCartTotal.jsx'
import {UserContext} from "../../Components/Context/UserContext.jsx";
import {css} from '@emotion/react';
import RedirectLoginRegister from '../../Components/FrontOffice/RedirectLoginRegister';
import axios from 'axios';
import CenteredSpinner from '../../Components/All/CenteredSpinner.jsx';
import UserAlert from '../../Components/All/UserAlert.jsx';

function ShoppingCart(){

    const userInformations = useContext(UserContext);
    const [data, setData] = useState({status: false})
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })
    const isCurrentUserConnected = userInformations.email === null && userInformations.token === null;


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

    const displayArticles = useCallback(() => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${userInformations.token}`}
        axios.get('https://protected-taiga-91617.herokuapp.com/api/cart/products')
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
                if(error.response.status === 401){
                    // Ne pas envoyer de message d'erreur, une div s'affiche déjà lorsque l'utilisateur n'est pas connecté.    
                    userInformations.setUserInformation({
                        email: null,
                        token: null
                    });
                }else{
                    setAlertState({
                        isOpen: true,
                        text: "Une erreur est survenue, impossible de récuperer les informations des produits du panier.",
                        variant: "danger"
                    });
                }
               
            })
    },[userInformations])

    useEffect(()=>{
        displayArticles()
    },[displayArticles])


    return<>
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <Container
        css={css`
            min-height: 90vh; 
        `}
    >
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
    </>
}

export default ShoppingCart;