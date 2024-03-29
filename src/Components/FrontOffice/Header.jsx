/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useRef} from 'react';
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import ModifiedLinksRouter from '../All/ModifiedLinksRouter.jsx';
import {UserContext} from '../Context/UserContext';
import { css} from '@emotion/react';
import {Link} from "react-router-dom";

function Header () {

    const searchIcon = <FontAwesomeIcon icon={faSearch} />
    const itemHome = <FontAwesomeIcon icon={faHome} size="2x" />;

    const {email} = useContext(UserContext);

    const [value, setValue] = useState();
    const searchInput = useRef(null);

    const handleChange = () => {
        setValue(searchInput.current.value);
    }
  
    return <Navbar 
        css={css`
            box-shadow: 1px 2px 3px gray;
            position: sticky;
            top: 0px;
            z-index: 1030;
        `} 
        collapseOnSelect 
        bg="light"
        expand="lg"
    > 

        <Navbar.Brand>
            <ModifiedLinksRouter 
                color="black" 
                to="/"
            >
                {itemHome}
            </ModifiedLinksRouter>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

            <Form  
                className="d-flex flex-nowrap" 
                css={css`
                    width: 100%;
                `}
            >
                <FormControl 
                    onChange={handleChange} 
                    ref={searchInput} 
                    type="text" 
                    placeholder="Rechercher" 
                    className="mr-sm-2" 
                />
                <Link to={`/products?search=${encodeURIComponent(value)}&page=1`}>
                    <Button  type="submit" variant="outline-success">{searchIcon}</Button> 
                </Link>
            </Form>
        
            <Nav className="mr-auto">
                {email ? 
                    <ModifiedLinksRouter color="black" to="/connectedAccount">Compte</ModifiedLinksRouter> 
                : 
                    <ModifiedLinksRouter color="black" to="/Login">Se Connecter</ModifiedLinksRouter>
                }

                <ModifiedLinksRouter color="black" to="/ShoppingCart">Panier </ModifiedLinksRouter>
                
                <Nav.Link className="p-0" href="https://protected-taiga-91617.herokuapp.com/contact">
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
}

export default Header;