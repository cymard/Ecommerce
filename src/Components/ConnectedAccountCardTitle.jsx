/** @jsxImportSource @emotion/react */
import React from "react";
import {css} from '@emotion/react';

function ConnectedAccountCardTitle({children}){
    return <div className="d-flex justify-content-center align-items-center mb-4 ">
        <h2 
            css={css`
                font-size: 2.5em;
                margin-top: 100px;
                text-align: center;
            `}
        >
           {children}
        </h2>
    </div>

}

export default ConnectedAccountCardTitle;