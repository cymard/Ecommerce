/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from "react-bootstrap";
import TitleH1 from "../Components/TitleH1.jsx";
import { css} from '@emotion/react';
import LoginAdminForm from '../Components/LoginAdminForm.jsx'


function LoginAdmin() {
    return <Container className="d-flex justify-content-center">
    <div 
        css={css`
            width: 100%;
        `}
    >
        <TitleH1>Connexion au panneau d'administration</TitleH1>
        <LoginAdminForm></LoginAdminForm>
    </div>
</Container>
}

export default LoginAdmin;