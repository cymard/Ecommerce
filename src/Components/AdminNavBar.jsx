import React from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import ModifiedLinksRouter from './ModifiedLinksRouter'

function AdminNavBar () {
    return  <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <ModifiedLinksRouter color="white" to="/">LOGO</ModifiedLinksRouter>
        </Navbar.Brand>
        <Nav className="mr-auto">
            <ModifiedLinksRouter color="white" to="/admin/home">Home</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/home">Creer</ModifiedLinksRouter>
        </Nav>
    </Navbar>
}

export default AdminNavBar;