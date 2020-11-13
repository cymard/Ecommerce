import React from "react";
import { Container } from "react-bootstrap";
import ConnectedAccountForm from '../ConnectedAccountForm.jsx';
import TitleH1 from "../TitleH1.jsx";
import ConnectedAccountDisconnection from "../ConnectedAccountDisconnection.jsx"

function ConnectedAccount () {
    return <Container>
        <TitleH1>Mon Compte</TitleH1>
        <ConnectedAccountDisconnection></ConnectedAccountDisconnection>
        <div className="d-flex justify-content-center align-items-center mb-5 mt-5">
            <h2 style={{fontSize : "2.5rem"}}>Mes Informations</h2>
        </div>
        <ConnectedAccountForm></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount