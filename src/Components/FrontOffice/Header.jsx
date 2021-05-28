/** @jsxImportSource @emotion/react */
import React from 'react';
import HeaderNavBar from './HeaderNavBar.jsx';
import { css} from '@emotion/react';

function Header(){

    return <div>
        <HeaderNavBar></HeaderNavBar>
        <div 
            css={css`
                height: 64px;
            `}
        ></div>
    </div>
}

export default Header;