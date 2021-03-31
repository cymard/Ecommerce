/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import {UserContext} from './UserContext';
import { css} from '@emotion/react';
import {Link} from "react-router-dom";

function HeaderNavBar () {

    const searchIcon = <FontAwesomeIcon icon={faSearch} />
    const shoppingCartIcon = <FontAwesomeIcon icon={faShoppingCart} />

    // utilisation du contexte
    const userInformations = useContext(UserContext);


    const [value, setValue] = useState();

    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(value);
    }

  
    return <> 
      <Navbar collapseOnSelect fixed="top" bg="light" expand="lg" > 

        <Navbar.Brand>
          <ModifiedLinksRouter color="black" to="/">LOGO</ModifiedLinksRouter>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

            <Form  className="d-flex flex-nowrap" 
                css={css`
                    width: 100%;
                `}
            >
                <FormControl value={value} onChange={handleChange} type="text" placeholder="Rechercher" className="mr-sm-2" />
                <Link to={`/products?search=${value}&page=1`}>
                    <Button variant="outline-success">{searchIcon}</Button>
                </Link>
            
            </Form>
          
            <Nav className="mr-auto">
                {
                    userInformations.email 
                ? 
                    <ModifiedLinksRouter color="black" to="/api/connectedAccount">Compte</ModifiedLinksRouter> 
                : 
                    <ModifiedLinksRouter color="black" to="/Login">Se Connecter</ModifiedLinksRouter>
                }
                <ModifiedLinksRouter color="black" to="/ShoppingCart">Panier {shoppingCartIcon}</ModifiedLinksRouter>
            </Nav>  
        </Navbar.Collapse>

      </Navbar>

      <div 
        css={css`
          height: 64px;
        `}
      ></div>
  </>
}

export default HeaderNavBar;