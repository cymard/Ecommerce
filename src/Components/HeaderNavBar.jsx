/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useRef} from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import {UserContext} from './UserContext';
import { css} from '@emotion/react';
import {Link} from "react-router-dom";

function HeaderNavBar () {

    const searchIcon = <FontAwesomeIcon icon={faSearch} />
    const itemHome = <FontAwesomeIcon icon={faHome} size="2x" />;


    // utilisation du contexte
    const userInformations = useContext(UserContext);

    const [value, setValue] = useState();
    const searchInput = useRef(null);
    const handleChange = () => {
        console.log(searchInput.current.value)
        setValue(searchInput.current.value);
    }



  
    return <> 
        <Navbar css={css`box-shadow: 1px 2px 3px gray;`} collapseOnSelect fixed="top" bg="light" expand="lg" > 

            <Navbar.Brand>
                <ModifiedLinksRouter color="black" to="/">{itemHome}</ModifiedLinksRouter>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">

                <Form  className="d-flex flex-nowrap" 
                    css={css`
                        width: 100%;
                    `}
                >
                    <FormControl onChange={handleChange} ref={searchInput} type="text" placeholder="Rechercher" className="mr-sm-2" />
                    <Link to={`/products?search=${encodeURIComponent(value)}&page=1`}>
                        <Button  variant="outline-success">{searchIcon}</Button>
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
                    {/* <ModifiedLinksRouter color="black" to="/ShoppingCart">{shoppingCartIcon} Panier </ModifiedLinksRouter>
                    <ModifiedLinksRouter color="black" to="/ShoppingCart">{itemEmail} Contact </ModifiedLinksRouter> */}
                    <ModifiedLinksRouter color="black" to="/ShoppingCart">Panier </ModifiedLinksRouter>
                    <Nav.Link className="p-0" href="https://127.0.0.1:8000/contact">
                        <div className="d-flex justify-content-center align-items-center p-1" 
                            css={css`
                                white-space: nowrap;
                                color: black;
                            `}
                        >
                            Contact
                        </div>
                    </Nav.Link>
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