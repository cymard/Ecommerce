/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import {Container, Alert} from "react-bootstrap";
import ConnectedAccountForm from '../../Components/FrontOffice/ConnectedAccountForm.jsx';
import Title from "../../Components/All/Title.jsx";
import ConnectedAccountDisconnection from "../../Components/FrontOffice/ConnectedAccountDisconnection.jsx";
import {css} from '@emotion/react';
import axios from 'axios'
import {UserContext} from '../../Components/Context/UserContext.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faTruck, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import ConnectedAccountCard from '../../Components/FrontOffice/ConnectedAccountCard.jsx';

function ConnectedAccount () {
    const itemPassword = <FontAwesomeIcon icon={faLock} size="7x" /> 
    const itemTruck = <FontAwesomeIcon icon={faTruck} size="7x" />
    const itemEmail = <FontAwesomeIcon icon={faEnvelope} size="7x" />

    const [userInformation, setUserInformation] = useState({status: false})
    const [userOrderNumber, setUserOrderNumber] = useState({status: false})
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    const {token} = useContext(UserContext);
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const isUserHaveAtLeastOneOrder = userOrderNumber.status && userOrderNumber.orderNumber > 0;

    const getUserInformation = useCallback(
        () => {
            axios.get('https://127.0.0.1:8000/api/connectedAccount')
            .then(function (response) {
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
                console.warn(error);
            });
        },[]
    )


    const getUserOrderNumber = useCallback(
        () => {
            axios.get('https://127.0.0.1:8000/api/user/order')
            .then(function (response) {
                setUserOrderNumber({
                    status: true,
                    orderNumber: response.data.orderNumber 
                })
            })
            .catch(function(error){
                console.warn(error);
            });
        },[setUserOrderNumber]
    )

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


    
    useEffect(() => {
        getUserInformation()
        getUserOrderNumber()
    }, [ getUserInformation,getUserOrderNumber])


    return <Container>
        <Alert 
            variant={alertState.variant}
            show={alertState.isOpen}
            css={css`
                position: sticky; 
                top: 100px;  
                text-align: center;
                min-width: 10px;              
                max-width: 400px;
                z-index: 1;
                box-shadow: 1px 1px 1px black;
            `}
        >
            {alertState.text}
        </Alert>
        <Title>Mon Compte</Title>
        <ConnectedAccountDisconnection></ConnectedAccountDisconnection>

        {/* Return ce lien uniquement si le client a au moins une commande */}
        {isUserHaveAtLeastOneOrder &&
            
            <ConnectedAccountCard
                item={itemTruck} 
                text="Cliquez pour acceder à vos commandes" 
                to="/api/orders?page=1&date=desc"
            >
                Mes Commandes :
            </ConnectedAccountCard>
            
        }

        <ConnectedAccountCard
            item={itemPassword} 
            text="Cliquez pour changer votre mot de passe" 
            to="/api/modify/password"
        >
            Changer de mot de passe :
        </ConnectedAccountCard>

        <ConnectedAccountCard
            item={itemEmail} 
            text="Cliquez pour changer votre adresse email" 
            to="/api/modify/email"
        >
            Changer d'adresse email :
        </ConnectedAccountCard>

        <div className="d-flex justify-content-center align-items-center mb-4">
            <h2 
                css={css`
                    font-size: 2.5em;
                    margin-top: 100px;
                    text-align: center;
                `}
            >
                Mes Informations :
            </h2>
        </div>
        <ConnectedAccountForm 
            userInformation={userInformation} 
            closeAlert={closeAlert} 
            setAlertState={setAlertState}
        ></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount