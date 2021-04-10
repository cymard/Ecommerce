/** @jsxImportSource @emotion/react */
import React from 'react';
import { css} from '@emotion/react';
import {Link} from "react-router-dom";
import {Row, Col} from 'react-bootstrap';


function Footer(){
    // height:50px;
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
        {/* modifications visuelles avec css / adapter au différents formats */}
        <Row className="m-0">
            <Col xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1 ">MENTIONS LEGALES</Link>  
            </Col>

            <Col  xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">CONDITIONS GENERALES DE VENTE</Link> 
            </Col>

            <Col xs={12} lg={"auto"} className="pr-4 d-flex justify-content-center align-items-center">
                <Link css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">CONTACT</Link> 
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