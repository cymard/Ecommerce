import React, { useState } from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ModifiedLinks from '../Common/ModifiedLinks.jsx'

function HeaderNavBar () {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return <> 
    <Navbar fixed="top" bg="light" expand="lg" > 

        <Navbar.Brand>
          <ModifiedLinks color="black" to="/">LOGO</ModifiedLinks>
        </Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Form style={{width: "100%"}} className="d-flex flex-nowrap">
            <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
            <Button variant="outline-success">{searchIcon}</Button>
          </Form>
          
          <Nav className="mr-auto">
               
            <ModifiedLinks color="black" to="/RegisterOrConnection">Compte</ModifiedLinks>

            <ModifiedLinks color="black" to="/ShoppingCart">Panier {shoppingCartIcon}</ModifiedLinks>

          </Nav>  
        </Navbar.Collapse>
      </Navbar>

    <div style={{height : "64px"}}>

    </div>
  </>
}

export default HeaderNavBar;