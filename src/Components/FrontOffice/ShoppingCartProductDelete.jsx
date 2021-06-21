/** @jsxImportSource @emotion/react */
import React from 'react';
import { Button ,Row} from 'react-bootstrap';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';

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

ShoppingCartProductDelete.propTypes = {
    handleClickDelete : PropTypes.func.isRequired
}

export default ShoppingCartProductDelete;