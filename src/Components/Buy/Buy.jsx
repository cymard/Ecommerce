import React from 'react';
import { Container } from 'react-bootstrap';
import BuyForm from "./BuyForm.jsx"

function Buy(){

    return <Container>
        <div className="d-flex justify-content-center mb-5 mt-5">
            <h2>Formulaire de Paiement : </h2>
        </div>
        <BuyForm></BuyForm>
    </Container>
}

export default Buy;