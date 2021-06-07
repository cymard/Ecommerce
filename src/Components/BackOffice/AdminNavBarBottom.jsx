/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import LinkAdminNavBar from './LinkAdminNavBar.jsx';
import PropTypes from 'prop-types';

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

AdminNavBarBottom.propTypes = {
    disconnection : PropTypes.func.isRequired
}

export default AdminNavBarBottom;