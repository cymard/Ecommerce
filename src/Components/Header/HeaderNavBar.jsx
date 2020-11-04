import React from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function HeaderNavBar () {
  const searchIcon = <FontAwesomeIcon icon={faSearch} />
  const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    return <Navbar bg="light" expand="lg" >     {/*fixed top*/ }

        <Navbar.Brand href="/">LOGO</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">
          <Form inline>
            <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
            <Button variant="outline-success">{searchIcon}</Button>
          </Form>
          
          <Nav className="mr-auto">
            <Nav.Link href="Account">Compte</Nav.Link>
            <Nav.Link href="ShoppingCart">Panier {shoppingCartIcon}</Nav.Link>
          </Nav>
      
        </Navbar.Collapse>
      </Navbar>

    

}

export default HeaderNavBar;