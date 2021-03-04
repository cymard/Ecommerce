import React, {useEffect, useContext, useState} from 'react';
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

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get('https://127.0.0.1:8000/api/cart/products')
        .then(function (response) {
            console.log(response.data.totalPrice);
            setAmount(response.data.totalPrice)
        })
        .catch(function (error) {
            console.log(error);
        });
    },[token,email])

    return <Container>
        <TitleH1>Formulaire de Paiement</TitleH1>
        <BuyForm amount={amount}></BuyForm>
    </Container>

    
}   

export default Buy;