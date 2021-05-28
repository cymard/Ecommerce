/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';


function InformationOrderLine ({children,informationOrder}){
    return <p>{children} :  
    <span
        css={css`
            font-size: 20px;
        `}
    >
        {informationOrder}
    </span>  
</p> 
}

export default InformationOrderLine;