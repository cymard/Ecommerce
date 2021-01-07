/** @jsxImportSource @emotion/react */
import React,{useContext} from 'react';
import {Button, Card, Row} from 'react-bootstrap';
import {css} from '@emotion/react';
import {UserContext} from './UserContext';
import { useHistory } from "react-router-dom";


function ConnectedAccountDisconnection () {

    let history = useHistory();

    const userInformation = useContext(UserContext);

    const handleClick = function () {
        // suppression des infos du localStorage
        userInformation.setUserInformation({
            email: undefined,
            token: undefined
        });
        
       return history.push("/");
        // return <Redirect to="/" />
        // window.location='/Home';
        
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