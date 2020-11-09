import React from 'react';
import {Container, Form, Button} from "react-bootstrap";
import LoginForm from './LoginForm.jsx'

function Login(){
    return <Container className="d-flex justify-content-center">
        <div style={{width: "100%"}}>
            <div className="d-flex justify-content-center mb-3 mt-4">
                <h1>Se Connecter : </h1>
            </div>

            <LoginForm></LoginForm>
            
        </div>
    </Container>
}

export default Login;