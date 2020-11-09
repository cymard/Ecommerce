import React from 'react';
import { Container } from 'react-bootstrap';
import BuyForm from "./BuyForm.jsx"
import TitleH1 from "../Common/TitleH1.jsx";



function Buy(){

    return <Container>
        <TitleH1>Formulaire de Paiement</TitleH1>
        <BuyForm></BuyForm>
    </Container>

    
}   

export default Buy;