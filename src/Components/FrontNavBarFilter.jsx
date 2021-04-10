/** @jsxImportSource @emotion/react */
import React from 'react';
import {Nav, Button, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { css} from '@emotion/react';

function FrontNavBarFilter () {
    
    return <Nav 
        fill 
        variant="tabs" 
        defaultActiveKey="/home"
        css={css`
            margin-top: 20px;
        `}
    >

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=all&page=1`}><Button  css={css`font-size: 22px;`} variant="link">Toutes</Button></Link> 
            </Nav.Item>
        </Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=sports&page=1`}><Button css={css`font-size: 22px;`} variant="link">Sports/Vêtements</Button></Link> 
            </Nav.Item>
        </Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=informatique&page=1`}><Button css={css`font-size: 22px;`} variant="link">Informatique/High-tech</Button></Link> 
            </Nav.Item>
        </Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=maison&page=1`}><Button css={css`font-size: 22px;`} variant="link">Maison</Button></Link> 
          </Nav.Item>
        </Col>

        <Col xs={0} md={4} lg={"auto"}></Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=livres&page=1`}><Button css={css`font-size: 22px;`} variant="link" >Livres</Button></Link> 
            </Nav.Item>
        </Col>
    </Nav>
}

export default FrontNavBarFilter;