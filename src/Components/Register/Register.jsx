import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from './RegisterForm.jsx'

function Compte(){
    return <Container className="d-flex justify-content-center">
        <div style={{width: "100%"}}>
            <div className="d-flex justify-content-center mb-3 mt-4">
                <h1>Creer votre compte : </h1>
            </div>
            <RegisterForm></RegisterForm>
        </div>
    </Container>
}

export default Compte;