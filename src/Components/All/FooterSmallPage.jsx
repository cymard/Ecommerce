/** @jsxImportSource @emotion/react */
import React from 'react';
import { css} from '@emotion/react';

function FooterSmallPage(){
    return <div 
        css={css`            
            background-color: black;
            position:absolute;
            bottom:0;
            width:100%;
            height:50px;
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

export default FooterSmallPage;