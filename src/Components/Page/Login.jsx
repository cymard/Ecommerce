import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from '../LoginForm.jsx'
import TitleH1 from "../TitleH1.jsx";
import {
    Link
  } from "react-router-dom";

function Login(){
    return <Container style={{height : "calc(100vh - 204px)"}} className="d-flex justify-content-center">
        <div style={{width: "100%"}}>
            <TitleH1>Se Connecter</TitleH1>
            <LoginForm></LoginForm>
            <Link to="/Register">S'inscrire</Link>
        </div>
    </Container>
}

export default Login;