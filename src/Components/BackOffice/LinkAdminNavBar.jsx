/** @jsxImportSource @emotion/react */
import React from 'react';
import {Link} from 'react-router-dom';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';

function LinkAdminNavBar ({url,children, onClick}) {
    return <Link
        to={url}
        css={css`
            color: white;
            font-size: 20px;
            margin-bottom: 15px;
            border-left: solid 1px #343A40;
            padding-left: 3px;
            &:hover {
                text-decoration: none;
                color: white;
                border-left: solid 1px white;
            }
        `}
        onClick={onClick || null}
    >
        {children}
    </Link>
}

LinkAdminNavBar.propTypes = {
    url : PropTypes.string.isRequired,
    children : PropTypes.string.isRequired,
    onClick : PropTypes.func
}

export default LinkAdminNavBar;