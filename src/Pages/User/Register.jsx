/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../../Components/FrontOffice/RegisterForm.jsx'
import Title from "../../Components/All/Title.jsx";
import { css} from '@emotion/react';

function Compte(){

    return <Container  className="d-flex justify-content-center">
        <div 
            css={css`
                width: 100%;
            `}
        >
            <Title>Creer votre compte</Title>
            <RegisterForm></RegisterForm>
        </div>
    </Container>
}

export default Compte;