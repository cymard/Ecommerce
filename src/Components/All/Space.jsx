/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React from 'react';

function Space({height}){
    return  <div 
        css={css`
            width: 100%; 
            height: ${height}px;
        `}
    ></div>
}

export default Space;