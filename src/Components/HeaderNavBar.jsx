/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import {ThemeContext} from './App/App.jsx';

function HeaderNavBar () {

    const formStyle = {
        width: "100%"
    }

    const divStyle= {
        height : "64px"
    }

    const searchIcon = <FontAwesomeIcon icon={faSearch} />
    const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    // utilisation du contexte
    const context = useContext(ThemeContext);
    console.log(context);
  
    return <> 
      <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" > 

        <Navbar.Brand>
          <ModifiedLinksRouter color="black" to="/">LOGO</ModifiedLinksRouter>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Form css={formStyle} className="d-flex flex-nowrap">
            <FormControl type="text" placeholder="Rechercher" className="mr-sm-2" />
            <Button variant="outline-success">{searchIcon}</Button>
          </Form>
          
          <Nav className="mr-auto">
            {context.buttonValue}
            <ModifiedLinksRouter color="black" to="/ShoppingCart">Panier {shoppingCartIcon}</ModifiedLinksRouter>
          </Nav>  

        </Navbar.Collapse>

      </Navbar>

      <div css={divStyle}></div>
  </>
}

export default HeaderNavBar;