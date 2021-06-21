/** @jsxImportSource @emotion/react */
import React from 'react';
import {Alert} from 'react-bootstrap';
import {css} from '@emotion/react';

function UserAlert ({variant, isOpen, children}) {
    
    return <Alert 
        variant={variant}
        show={isOpen}
        css={css`
            position: sticky; 
            top: 100px;
            left: 300px;  
            text-align: center;
            min-width: 10px;              
            max-width: 400px;
            z-index: 1;
            box-shadow: 1px 1px 1px black;
        `}
    >
        {children}
    </Alert>
}

export default UserAlert;