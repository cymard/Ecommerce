/** @jsxImportSource @emotion/react */
import React,{useContext} from 'react';
import {Button, Card, Row, Col} from 'react-bootstrap';
import {css} from '@emotion/react';
import {UserContext} from '../Context/UserContext';
import { useHistory } from "react-router-dom";


function ConnectedAccountDisconnection () {

    let history = useHistory();

    const userInformation = useContext(UserContext);

    const handleClick = function () {
        // suppression des infos du localStorage
        userInformation.setUserInformation({
            email: null,
            token: null
        });
        
       return history.push("/");
    }

    return <Card className="d-flex p-2">
        <Row className="d-flex justify-content-between align-items-center" 
            css={css`
                margin-right: 0px;
                margin-left: 0px;
            `} 
        >   
            <Col  lg={3}  className="text-center text-nowrap">
                <h3>Se déconnecter : </h3>
            </Col>
            <Col lg={2} className="text-center">
                <Button 
                    className="w-100" 
                    onClick={handleClick}
                >
                    Déconnexion
                </Button>
            </Col>
        </Row>
    </Card>
}

export default ConnectedAccountDisconnection;