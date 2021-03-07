import React, {useEffect, useContext, useState, useCallback} from 'react';
import { Container } from 'react-bootstrap';
import BuyForm from "../Components/BuyForm.jsx"
import TitleH1 from "../Components/TitleH1.jsx";
import {UserContext} from "../Components/UserContext.jsx";
import axios from 'axios';


function Buy(){
    const informationUser = useContext(UserContext);
    const token = informationUser.token
    const email = informationUser.email

    const [amount, setAmount] = useState();
    const [userInformation, setUserInformation] = useState({status: false})

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

    useEffect(()=>{
        getUserInformation()
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('https://127.0.0.1:8000/api/cart/products')
        .then(function (response) {
            console.log(response.data.totalPrice);
            setAmount(response.data.totalPrice)
        })
        .catch(function (error) {
            console.log(error);
        });
    },[token,email,getUserInformation])

    return <Container>
        <TitleH1>Formulaire de Paiement</TitleH1>
        <BuyForm amount={amount} userInformation={userInformation}></BuyForm>
    </Container>

    
}   

export default Buy;