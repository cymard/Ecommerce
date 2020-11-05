import React from 'react';
import { Container,Form,Button  } from 'react-bootstrap';

function Compte(){
    return <Container className="d-flex justify-content-center">
        <div style={{width: "100%"}}>
            <div className="d-flex justify-content-center mb-5">
                <h1>Creer votre compte : </h1>
            </div>
            
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control type="email" placeholder="Entrez votre adresse email ..." />
                    <Form.Text className="text-muted">
                    Nous ne communiquerons pas votre email
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control type="password" placeholder="Entrez votre mot de passe ..." />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        </div>
    </Container>
}

export default Compte;