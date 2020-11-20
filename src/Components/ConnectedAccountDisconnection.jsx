/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button, Card, Row} from 'react-bootstrap';

function ConnectedAccountDisconnection () {

    const rowStyle = {
        marginRight : 0,
        marginLeft : 0
    }

    const handleClick = function () {
        localStorage.removeItem('connexion');
        window.location='/Home';
    }

    return <Card className="d-flex p-2">
        <Row className="d-flex justify-content-between align-items-center" css={rowStyle} >
            <h3>Se déconnecter : </h3>
            <Button onClick={handleClick}>Déconnexion</Button>
        </Row>
        
    </Card>
}

export default ConnectedAccountDisconnection;