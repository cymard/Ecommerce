/** @jsxImportSource @emotion/react */
import React from 'react';
import { css} from '@emotion/react';
import {Link} from "react-router-dom";
import {Row, Col} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';


function Footer(){
    return <div 
        css={css`            
            background-color: gray;
            width:100%;
            min-height: 50px;
            padding: 10px 0;
            color: white;
            font-size: 18px;

            display: flex;
            justify-content: center;
            align-items: center;
            
        `}
    >
        <Row className="m-0">
            <Col xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link to="/informations/mentions_legales" css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1 ">MENTIONS LEGALES</Link>  
            </Col>

            <Col  xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link to="/informations/condition_de_vente" css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">CONDITIONS GENERALES DE VENTE</Link> 
            </Col>

            <Col xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Nav.Link className="pr-4 pt-1 pb-1" href="https://127.0.0.1:8000/contact"
                    css={css`
                        color: white;
                        &:hover{
                            color: white;
                            text-decoration: underline;
                        }
                    `}
                >
                    CONTACT
                </Nav.Link>
            </Col>

            <Col xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link to={"/api/connectedAccount"} css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">MON COMPTE</Link> 
            </Col>

            <Col xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link to={"/ShoppingCart"} css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">PANIER</Link>
            </Col>
        </Row>
    </div>
}

export default Footer;