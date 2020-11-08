import React from 'react';
import { Container, Button } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function RegisterOrConnection () {


    return <Container className="d-flex justify-content-between mt-3">
        <Link to="/Login"><Button>J'ai déjà un compte EXISTANT, je souhaite me CONNECTER</Button></Link>
        <Link to="/Account"><Button>Je suis NOUVEAU, je souhaite CREER un compte</Button></Link>
    </Container>
}

export default RegisterOrConnection;