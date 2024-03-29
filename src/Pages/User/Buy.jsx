import React, {useEffect, useContext, useState, useCallback} from 'react';
import { Container } from 'react-bootstrap';
import BuyForm from "../../Components/FrontOffice/BuyForm.jsx"
import Title from "../../Components/All/Title.jsx";
import {UserContext} from "../../Components/Context/UserContext.jsx";
import axios from 'axios';
import UserAlert from '../../Components/All/UserAlert.jsx';


function Buy(){
    const {token, email} = useContext(UserContext);
    const [amount, setAmount] = useState();
    const [userInformation, setUserInformation] = useState({status: false})
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

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

    const getUserInformation = useCallback(
        () => {
            axios.get('https://protected-taiga-91617.herokuapp.com/api/connectedAccount')
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
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la récupèration de vos informations.",
                    variant: "danger"
                });
            });
        },[setUserInformation]
    )

    const getCartTotalPrice = useCallback(
        () => {
            axios.get('https://protected-taiga-91617.herokuapp.com/api/cart/products')
            .then(function (response) {
                setAmount(response.data.totalPrice)
            })
            .catch(function (error) {
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la récupération du prix total.",
                    variant: "danger"
                });
            });
        },
        []
    )

    useEffect(()=>{
        getUserInformation()
        getCartTotalPrice()
    },[token,email,getUserInformation,getCartTotalPrice])

    return <Container>
        <UserAlert
            variant={alertState.variant}
            isOpen={alertState.isOpen}
        >
            {alertState.text}
        </UserAlert>

        <Title>Formulaire de Paiement</Title>
        <BuyForm 
            amount={amount}
            userInformation={userInformation}
            setAlertState={setAlertState}
            closeAlert={closeAlert}
        ></BuyForm>
    </Container>

    
}   

export default Buy;