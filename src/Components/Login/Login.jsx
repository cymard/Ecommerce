import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from './LoginForm.jsx'
import TitleH1 from "../Common/TitleH1.jsx";

function Login(){
    return <Container className="d-flex justify-content-center">
        <div style={{width: "100%"}}>
            <TitleH1>Se Connecter</TitleH1>
            <LoginForm></LoginForm>
        </div>
    </Container>
}

export default Login;