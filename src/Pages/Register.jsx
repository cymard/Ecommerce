/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container } from 'react-bootstrap';
import RegisterForm from '../Components/RegisterForm.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import { css} from '@emotion/react';

function Compte(){

    return <Container  className="d-flex justify-content-center">
        <div 
            css={css`
                width: 100%;
            `}
        >
            <TitleH1>Creer votre compte</TitleH1>
            <RegisterForm></RegisterForm>
        </div>
    </Container>
}

export default Compte;