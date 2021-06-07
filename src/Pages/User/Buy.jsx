import React, {useEffect, useContext, useState, useCallback} from 'react';
import { Container } from 'react-bootstrap';
import BuyForm from "../../Components/FrontOffice/BuyForm.jsx"
import Title from "../../Components/All/Title.jsx";
import {UserContext} from "../../Components/Context/UserContext.jsx";
import axios from 'axios';


function Buy(){
    const {token, email} = useContext(UserContext);
    const [amount, setAmount] = useState();
    const [userInformation, setUserInformation] = useState({status: false})
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

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
        },[setUserInformation]
    )

    const getCartTotalPrice = useCallback(
        () => {
            axios.get('https://127.0.0.1:8000/api/cart/products')
            .then(function (response) {
                setAmount(response.data.totalPrice)
            })
            .catch(function (error) {
                console.warn(error);
            });
        },
        []
    )

    useEffect(()=>{
        getUserInformation()
        getCartTotalPrice()
    },[token,email,getUserInformation,getCartTotalPrice])

    return <Container>
        <Title>Formulaire de Paiement</Title>
        <BuyForm 
            amount={amount}
            userInformation={userInformation}
        ></BuyForm>
    </Container>

    
}   

export default Buy;