import React from 'react';
import {Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function FrontNavBarFilter () {
    
    return <Nav fill variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
            <Link to={`/all/1`}><Button variant="link">Toutes</Button></Link> 
        </Nav.Item>

        <Nav.Item>
            <Link to={`/sports/1`}><Button variant="link">sports/vetements</Button></Link> 
        </Nav.Item>

        <Nav.Item>
            <Link to={`/informatique/1`}><Button variant="link">informatique/high-tech</Button></Link> 
        </Nav.Item>

        <Nav.Item>
            <Link to={`/maison/1`}><Button variant="link">maison</Button></Link> 
        </Nav.Item>

        <Nav.Item>
            <Link to={`/livres/1`}><Button variant="link">livres</Button></Link> 
        </Nav.Item>
    </Nav>
}

export default FrontNavBarFilter;