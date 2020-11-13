import React from 'react';
import {Button, Card, Row} from 'react-bootstrap';


function ConnectedAccountDisconnection () {

    const handleClick = function () {
        localStorage.removeItem('connexion');
        document.location.reload(true);
    }

    return <Card className="d-flex p-2">
        <Row className="d-flex justify-content-between align-items-center" style={{marginRight : "0", marginLeft : '0'}}>
            <h3>Se déconnecter : </h3>
            <Button onClick={handleClick}>Déconnexion</Button>
        </Row>
        
    </Card>
}

export default ConnectedAccountDisconnection;