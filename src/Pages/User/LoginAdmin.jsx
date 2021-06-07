/** @jsxImportSource @emotion/react */
import React from 'react';
import {Container} from "react-bootstrap";
import Title from "../../Components/All/Title.jsx";
import { css} from '@emotion/react';
import LoginAdminForm from '../../Components/FrontOffice/LoginAdminForm.jsx'


function LoginAdmin() {
    return <Container className="d-flex justify-content-center">
    <div 
        css={css`
            width: 100%;
        `}
    >
        <Title>Connexion au panneau d'administration</Title>
        <LoginAdminForm></LoginAdminForm>
    </div>
</Container>
}

export default LoginAdmin;