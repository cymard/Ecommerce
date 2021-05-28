/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import LinkAdminNavBar from './LinkAdminNavBar.jsx';

function AdminNavBarBottom ({disconnection}) {
    return <div
    css={css`
        display: flex;
        flex-direction: column;
    `} 
>
    <LinkAdminNavBar url="/">ACCÉDER AU SITE</LinkAdminNavBar>
    <LinkAdminNavBar url="/" onClick={disconnection}>DÉCONNEXION</LinkAdminNavBar>
</div>
}

export default AdminNavBarBottom;