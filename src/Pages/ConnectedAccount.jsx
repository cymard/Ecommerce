/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import { Container, Card } from "react-bootstrap";
import ConnectedAccountForm from '../Components/ConnectedAccountForm.jsx';
import TitleH1 from "../Components/TitleH1.jsx";
import ConnectedAccountDisconnection from "../Components/ConnectedAccountDisconnection.jsx";
import {css} from '@emotion/react';
import axios from 'axios'
import {UserContext} from '../Components/UserContext.jsx'
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLock, faTruck, faEnvelope} from '@fortawesome/free-solid-svg-icons';

function ConnectedAccount () {
    const itemPassword = <FontAwesomeIcon icon={faLock} size="7x" /> 
    const itemTruck = <FontAwesomeIcon icon={faTruck} size="7x" />
    const itemEmail = <FontAwesomeIcon icon={faEnvelope} size="7x" />

    const [userInformation, setUserInformation] = useState({status: false})

    const [userOrderNumber, setUserOrderNumber] = useState({status: false})

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


    const getUserOrderNumber = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get('https://127.0.0.1:8000/api/user/order')
            .then(function (response) {
                console.log(response);
                setUserOrderNumber({
                    status: true,
                    orderNumber: response.data.orderNumber 
                })
                
            
            })
            .catch(function (error) {
                console.log(error);
            });
        },[token,setUserOrderNumber]
    )


    
    useEffect(() => {
        getUserInformation()
        getUserOrderNumber()
    }, [ getUserInformation,getUserOrderNumber])

    // pré remplir le form avec

    return <Container>
        <TitleH1>Mon Compte</TitleH1>
        <ConnectedAccountDisconnection></ConnectedAccountDisconnection>

        {/* Return ce lien uniquement si le client a au moins une commande */}
        {userOrderNumber.status && userOrderNumber.orderNumber > 0 ?
            <>
                <div className="d-flex justify-content-center align-items-center mb-4">
                    <h2 
                        css={css`
                            font-size: 2.5em;
                            margin-top: 100px;
                        `}
                    >
                        Mes Commandes :
                    </h2>
                </div>
                <Link color="white" to="/api/orders?page=1&date=desc">
                    <Card className="d-flex justify-content-center">
                        <Card.Body className="d-flex flex-column text-center">
                            <div className="mb-3">{itemTruck}</div>
                            <Card.Text>Cliquez pour acceder à vos commandes</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </>
        :
            <></>
        }

        <div className="d-flex justify-content-center align-items-center mb-4 ">
            <h2 
                css={css`
                    font-size: 2.5em;
                    margin-top: 100px;
                    text-align: center;
                `}
            >
                Changer de mot de passe :
            </h2>
        </div>
        <Link to="/api/modify/password">
            <Card className="d-flex justify-content-center">
                <Card.Body className="d-flex flex-column text-center">
                    <div className="mb-3">{itemPassword}</div>
                    <Card.Text>Cliquez pour changer votre mot de passe</Card.Text>
                </Card.Body>
            </Card>
        </Link>

        <div className="d-flex justify-content-center align-items-center mb-4 ">
            <h2 
                css={css`
                    font-size: 2.5em;
                    margin-top: 100px;
                    text-align: center;
                `}
            >
                Changer d'adresse email :
            </h2>
        </div>
        <Link to="/api/modify/email">
            <Card className="d-flex justify-content-center">
                <Card.Body className="d-flex flex-column text-center">
                    <div className="mb-3">{itemEmail}</div>
                    <Card.Text>Cliquez pour changer votre adresse email</Card.Text>
                </Card.Body>
            </Card>
        </Link>

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
        <ConnectedAccountForm userInformation={userInformation}></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount