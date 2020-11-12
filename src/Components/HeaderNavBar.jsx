import React from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx'

function HeaderNavBar () {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return <> 
      <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" > 

        <Navbar.Brand>
          <ModifiedLinksRouter color="black" to="/">LOGO</ModifiedLinksRouter>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Form style={{width: "100%"}} className="d-flex flex-nowrap">
            <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
            <Button variant="outline-success">{searchIcon}</Button>
          </Form>
          
          <Nav className="mr-auto">
            <ModifiedLinksRouter color="black" to="/Login">Se Connecter</ModifiedLinksRouter>
            <ModifiedLinksRouter color="black" to="/ShoppingCart">Panier {shoppingCartIcon}</ModifiedLinksRouter>
          </Nav>  

        </Navbar.Collapse>

      </Navbar>

      <div style={{height : "64px"}}></div>
  </>
}

export default HeaderNavBar;