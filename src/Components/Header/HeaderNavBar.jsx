import React, { useState } from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import HeaderLinks from './HeaderLinks.jsx'

function HeaderNavBar () {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return <Navbar bg="light" expand="lg" >     {/*fixed top*/ }

        <Navbar.Brand>
          <HeaderLinks color="black" to="/">LOGO</HeaderLinks>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Form style={{width: "100%"}} className="d-flex flex-nowrap">
            <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
            <Button variant="outline-success">{searchIcon}</Button>
          </Form>
          
          <Nav className="mr-auto">
            <Nav.Link>
              <HeaderLinks  color="black" to="/Account">Inscription</HeaderLinks>
            </Nav.Link>
            
            <Nav.Link style={{width: "82px"}}>
              <HeaderLinks color="black" to="/ShoppingCart">Panier {shoppingCartIcon}</HeaderLinks>
            </Nav.Link>
          </Nav>  
        </Navbar.Collapse>
      </Navbar>

    

}

export default HeaderNavBar;