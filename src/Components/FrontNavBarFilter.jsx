import React from 'react';
import {Nav, Button, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function FrontNavBarFilter () {
    
    return <Nav fill variant="tabs" defaultActiveKey="/home">

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=all&page=1`}><Button variant="link">Toutes</Button></Link> 
            </Nav.Item>
        </Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=sports&page=1`}><Button variant="link">sports/vetements</Button></Link> 
            </Nav.Item>
        </Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=informatique&page=1`}><Button variant="link">informatique/high-tech</Button></Link> 
            </Nav.Item>
        </Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=maison&page=1`}><Button variant="link">maison</Button></Link> 
          </Nav.Item>
        </Col>

        <Col xs={0} md={4} lg={"auto"}></Col>

        <Col xs={12} md={4} lg={"auto"}>
            <Nav.Item>
                <Link to={`/products?category=livres&page=1`}><Button variant="link">livres</Button></Link> 
            </Nav.Item>
        </Col>
    </Nav>
}

export default FrontNavBarFilter;