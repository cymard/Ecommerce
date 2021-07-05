/** @jsxImportSource @emotion/react */
import React from 'react';
import {Alert} from 'react-bootstrap';
import {css} from '@emotion/react';

function UserAlert ({variant, isOpen, children}) {
    
    return <Alert 
        variant={variant}
        show={isOpen}
        css={css`
            position: fixed; 
            bottom: 5px;
            right: 5px;
            text-align: center;
            min-width: 10px;              
            max-width: 400px;
            z-index: 2000;
            box-shadow: 1px 1px 1px black;
        `}
    >
        {children}
    </Alert>
}

export default UserAlert;