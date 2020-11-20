/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from '../Components/LoginForm.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import {
    Link
  } from "react-router-dom";

function Login(){

    const containerHeight = {
        height : "calc(100vh - 204px)"
    }

    const divWidthStyle = {
        width : "100%"
    }

    return <Container css={containerHeight} className="d-flex justify-content-center">
        <div css={divWidthStyle}>
            <TitleH1>Se Connecter</TitleH1>
            <LoginForm></LoginForm>
            <Link to="/Register">S'inscrire</Link>
        </div>
    </Container>
}

export default Login;