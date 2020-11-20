/** @jsxImportSource @emotion/react */
import React from "react";
import { Container } from "react-bootstrap";
import ConnectedAccountForm from '../Components/ConnectedAccountForm.jsx';
import TitleH1 from "../Components/TitleH1.jsx";
import ConnectedAccountDisconnection from "../Components/ConnectedAccountDisconnection.jsx"

function ConnectedAccount () {

    const h2Style = {
        fontSize : "2.5rem"
    }

    return <Container>
        <TitleH1>Mon Compte</TitleH1>
        <ConnectedAccountDisconnection></ConnectedAccountDisconnection>
        <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
            <h2 css={h2Style}>Mes Informations</h2>
        </div>
        <ConnectedAccountForm></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount