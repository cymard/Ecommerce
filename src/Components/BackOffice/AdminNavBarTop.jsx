/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import LinkAdminNavBar from './LinkAdminNavBar.jsx';

function AdminNavBarTop () {
    return <div 
        css={css`
            display: flex;
            flex-flow: column nowrap;
        `} 
    >
        <LinkAdminNavBar url="/admin/home">PRODUITS</LinkAdminNavBar>
        <LinkAdminNavBar url="/admin/orders">COMMANDES</LinkAdminNavBar>
        <LinkAdminNavBar url="/admin/comments/reported">COMMENTAIRES SIGNALÉS</LinkAdminNavBar>
    </div>
}

export default AdminNavBarTop;