/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button ,Row} from 'react-bootstrap';
import {css} from '@emotion/react';

function ShoppingCartProductDelete ({handleClickDelete}) {
    return <Row className="h-auto d-flex justify-content-center">
    <Button
        variant="danger" 
        css={css`
            height : 40px;
        `}
        onClick={handleClickDelete}
    >
        Supprimer
    </Button>    
</Row>  
}

export default ShoppingCartProductDelete;