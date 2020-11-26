/** @jsxImportSource @emotion/react */
import React from "react";
import { Container } from "react-bootstrap";
import ConnectedAccountForm from '../Components/ConnectedAccountForm.jsx';
import TitleH1 from "../Components/TitleH1.jsx";
import ConnectedAccountDisconnection from "../Components/ConnectedAccountDisconnection.jsx";
import {css} from '@emotion/react';

function ConnectedAccount () {

    return <Container>
        <TitleH1>Mon Compte</TitleH1>
        <ConnectedAccountDisconnection></ConnectedAccountDisconnection>
        <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
            <h2 
                css={css`
                    font-size: 2.5em;
                `}
            >
                Mes Informations
            </h2>
        </div>
        <ConnectedAccountForm></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount