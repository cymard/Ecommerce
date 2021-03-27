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

    return <>  
    <Navbar 
        bg="dark"
        variant="dark"
        css={css`
            display: flex;
            height: 100vh;
            position: fixed;       
            padding: 20px;
        `} 
    >
        <div 
            css={css`
                height: 100vh;
                position: sticky;
                display: flex;
                flex-direction: column;
                max-width: 170px;
                justify-content: space-around;        
            `} 
        >
            <ModifiedLinksRouter color="white" to="/admin/home">PRODUITS</ModifiedLinksRouter>
            {/* <ModifiedLinksRouter color="white" to="/admin/CreateProduct">CRÉER UN PRODUIT</ModifiedLinksRouter> */}
            <ModifiedLinksRouter color="white" to="/admin/orders">COMMANDES</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/comments/reported">COMMENTAIRES SIGNALÉS</ModifiedLinksRouter>
            <ModifiedLinksRouter onClick={handleClick} color="white" to="/">DÉCONNEXION</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/">ACCÉDER AU SITE</ModifiedLinksRouter>
        </div>
        
    </Navbar>
    <div 
        css={css`
            width: 220px;
        `}
    ></div>
    </>
}

export default AdminNavBar;
