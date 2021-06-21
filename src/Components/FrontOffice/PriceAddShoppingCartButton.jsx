/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';

function PriceAddShoppingCartButton ({clickEffect, isDisabled}) {
    return <Button
    css={css`
        color: white;
    `}
    onClick={clickEffect} 
    disabled={isDisabled}
>
    Ajouter au panier
</Button>
}

PriceAddShoppingCartButton.propTypes = {
    displayModal : PropTypes.func,
    isDisabled : PropTypes.bool
}

export default PriceAddShoppingCartButton;