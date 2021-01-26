/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from '../Components/LoginForm.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import { css} from '@emotion/react';
import {
    Link
  } from "react-router-dom";


function LoginAdmin() {
    return <Container className="d-flex justify-content-center"
    css={css`
        height : calc(100vh - 204px);
    `}
>
    <div 
        css={css`
            width: 100%;
        `}
    >
        <TitleH1>Connexion au panneau d'administration</TitleH1>
        <LoginForm></LoginForm>
    </div>
</Container>
}

export default LoginAdmin;