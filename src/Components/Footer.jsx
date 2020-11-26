/** @jsxImportSource @emotion/react */
import React from 'react';
import { css} from '@emotion/react';

function Footer(){

    return <div 
        css={css`
            background-color: black;
            height: 120px;
            width: 100%;
            margin-top: 20px;
        `}
    >
        <h2 
            css={css`
                color: white;
                font-size: 20px;
            `}
        >
            FOOTER
        </h2>
    </div>
}

export default Footer;