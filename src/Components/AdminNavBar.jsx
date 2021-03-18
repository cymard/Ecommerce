/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import {Navbar} from 'react-bootstrap';
import ModifiedLinksRouter from './ModifiedLinksRouter';
import {css} from '@emotion/react';
import {UserAdminContext} from './UserAdminContext.jsx'


function AdminNavBar () {
    const userAdminInformation = useContext(UserAdminContext);
    const handleClick = () => {
        userAdminInformation.setUserAdminInformation({
            email: null,
            token: null
        })
    }

    return  <Navbar bg="dark" variant="dark"
    
    
    >
        <div>

            <ModifiedLinksRouter color="white" to="/admin/home">PRODUITS</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/CreateProduct">CREER</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/orders">COMMANDES</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/comments/reported">SIGNALEMENTS</ModifiedLinksRouter>
            <ModifiedLinksRouter onClick={handleClick} color="white" to="/">DECONNEXION</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/">ACCEDER AU SITE</ModifiedLinksRouter>
        </div>
        
    </Navbar>
}

export default AdminNavBar;
