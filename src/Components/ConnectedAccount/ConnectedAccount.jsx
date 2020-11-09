import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import ConnectedAccountForm from './ConnectedAccountForm.jsx'

function ConnectedAccount () {
    return <Container>

            <div className="d-flex justify-content-center mb-5 mt-5 ">
                <h1> Vos Informations :</h1>
            </div>

            <ConnectedAccountForm></ConnectedAccountForm>
    </Container>
}

export default ConnectedAccount