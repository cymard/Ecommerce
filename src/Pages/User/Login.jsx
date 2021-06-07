/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from '../../Components/FrontOffice/LoginForm.jsx'
import Title from "../../Components/All/Title.jsx";
import { css} from '@emotion/react';
import {
    Link
  } from "react-router-dom";

function Login(){

    return <Container className="d-flex justify-content-center">
        <div 
            css={css`
                width: 100%;
            `}
        >
            <Title>Se Connecter</Title>
            <LoginForm></LoginForm>
            <Link to="/Register">S'inscrire</Link>
        </div>
    </Container>
}

export default Login;