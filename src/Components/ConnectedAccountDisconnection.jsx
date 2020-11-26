/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button, Card, Row} from 'react-bootstrap';
import {css} from '@emotion/react';

function ConnectedAccountDisconnection () {

    const handleClick = function () {
        localStorage.removeItem('connexion');
        window.location='/Home';
    }

    return <Card className="d-flex p-2">
        <Row className="d-flex justify-content-between align-items-center" 
            css={css`
                margin-right: 0px;
                margin-left: 0px;
            `} 
        >
            <h3>Se déconnecter : </h3>
            <Button onClick={handleClick}>Déconnexion</Button>
        </Row>
        
    </Card>
}

export default ConnectedAccountDisconnection;