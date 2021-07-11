/** @jsxImportSource @emotion/react */
import React from 'react';
import { css} from '@emotion/react';
import {Link} from "react-router-dom";
import {Row} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import FooterLinks from './FooterLinks.jsx';

function Footer(){

    const links = [
        <Link to="/informations/mentions_legales" css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1 ">MENTIONS LEGALES</Link>,
        <Link to="/informations/condition_de_vente" css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">CONDITIONS GENERALES DE VENTE</Link> ,
        <Nav.Link 
            className="pr-4 pt-1 pb-1" 
            href="https://relaxed-sammet-0deed4.netlify.app/contact"
            css={css`
                color: white;
                &:hover{
                    color: white;
                    text-decoration: underline;
                }
            `}
        >
            CONTACT
        </Nav.Link>,
        <Link to={"/connectedAccount"} css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">MON COMPTE</Link>,
        <Link to={"/ShoppingCart"} css={css`color:white; &:hover{color: white;}`} className="pr-4 pt-1 pb-1">PANIER</Link>
    ]

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
            position: absolute;
            bottom: 0;
        `}
    >
        <Row className="m-0">
            <FooterLinks links={links}></FooterLinks>
        </Row>
    </div>
    
}

export default Footer;