/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import { Container } from "react-bootstrap";
import ConnectedAccountForm from '../Components/ConnectedAccountForm.jsx';
import TitleH1 from "../Components/TitleH1.jsx";
import ConnectedAccountDisconnection from "../Components/ConnectedAccountDisconnection.jsx";
import {css} from '@emotion/react';
import axios from 'axios'
import {UserContext} from '../Components/UserContext.jsx'

function ConnectedAccount () {

    const [userInformation, setUserInformation] = useState({status: false})

    const informationUser = useContext(UserContext);
    const token = informationUser.token

    // récuperer le paymentMethod.data du user 
    const getUserInformation = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get('https://127.0.0.1:8000/api/connectedAccount')
            .then(function (response) {
                console.log(response);
                setUserInformation({
                    status: true,
                    address: response.data.address,
                    cardExpirationDate: response.data.cardExpirationDate,
                    cardName: response.data.cardName,
                    cardNumber: response.data.cardNumber,
                    city: response.data.city,
                    cryptogram: response.data.cryptogram,
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    password: response.data.password,
                    paymentMethod: response.data.paymentMethod
                })
                
            
            })
            .catch(function (error) {
                console.log(error);
            });
        },[token,setUserInformation]
    )
    
    useEffect(() => {
        getUserInformation()
    }, [ getUserInformation])

    // pré remplir le form avec

    return <Container>
        <TitleH1>Mon Compte</TitleH1>
        <ConnectedAccountDisconnection></ConnectedAccountDisconnection>
        <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
            <h2 
                css={css`
                    font-size: 2.5em;
                `}
            >
                Mes Informations
            </h2>
        </div>
        <ConnectedAccountForm userInformation={userInformation}></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount