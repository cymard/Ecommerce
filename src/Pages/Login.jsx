/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from "react-bootstrap";
import LoginForm from '../Components/LoginForm.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import { css} from '@emotion/react';
import {
    Link
  } from "react-router-dom";

function Login(){

    return <Container className="d-flex justify-content-center"
        // css={css`
        //     height : calc(100vh - 204px);
        // `}
    >
        <div 
            css={css`
                width: 100%;
            `}
        >
            <TitleH1>Se Connecter</TitleH1>
            <LoginForm></LoginForm>
            <Link to="/Register">S'inscrire</Link>
        </div>
    </Container>
}

export default Login;