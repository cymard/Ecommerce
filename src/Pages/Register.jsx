/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../Components/RegisterForm.jsx'
import TitleH1 from "../Components/TitleH1.jsx";

function Compte(){

    const containerStyle = {
        height : "calc(100vh - 204px)"
    }

    const divStyle = {
        width: "100%"
    }

    return <Container style={containerStyle} className="d-flex justify-content-center">
        <div css={divStyle}>
            <TitleH1>Creer votre compte</TitleH1>
            <RegisterForm></RegisterForm>
        </div>
    </Container>
}

export default Compte;