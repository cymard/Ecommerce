import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import ConnectedAccountForm from './ConnectedAccountForm.jsx';
import TitleH1 from "../Common/TitleH1.jsx";

function ConnectedAccount () {
    return <Container>

        <TitleH1>Vos Informations</TitleH1>
        <ConnectedAccountForm></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount