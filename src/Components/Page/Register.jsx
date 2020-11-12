import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../RegisterForm.jsx'
import TitleH1 from "../TitleH1.jsx";

function Compte(){
    return <Container className="d-flex justify-content-center">
        <div style={{width: "100%"}}>
            <TitleH1>Creer votre compte</TitleH1>
            <RegisterForm></RegisterForm>
        </div>
    </Container>
}

export default Compte;