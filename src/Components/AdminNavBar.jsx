/** @jsxImportSource @emotion/react */
import React from 'react';
import {Navbar} from 'react-bootstrap';
import ModifiedLinksRouter from './ModifiedLinksRouter';
import {css} from '@emotion/react';

function AdminNavBar () {

    return  <Navbar bg="dark" variant="dark"
    css={css`
        height: 100vh;
        position: sticky;
        top: 0px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        line-height: 100px;
    `}
    >
        <div>
            <ModifiedLinksRouter color="white" to="/admin/home">PRODUITS</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/home">CREER</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/admin/home">COMMENTAIRES</ModifiedLinksRouter>
            <ModifiedLinksRouter color="white" to="/">QUITTER</ModifiedLinksRouter>
        </div>
        
    </Navbar>
}

export default AdminNavBar;
