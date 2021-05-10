/** @jsxImportSource @emotion/react */
import React from "react";
import {Card } from "react-bootstrap";
import {css} from '@emotion/react';
import {Link} from 'react-router-dom';


function ConnectedAccountCard({children, text, to, item}){
    return <>
    <div className="d-flex justify-content-center align-items-center mb-4 ">
        <h2 
            css={css`
                font-size: 2.5em;
                margin-top: 100px;
                text-align: center;
            `}
        >
           {children}
        </h2>
    </div>
    <Link to={to}>
        <Card className="d-flex justify-content-center">
            <Card.Body className="d-flex flex-column text-center">
                <div className="mb-3">{item}</div>
                <Card.Text>{text}</Card.Text>
            </Card.Body>
        </Card>
    </Link>
</>
}

export default ConnectedAccountCard;