/** @jsxImportSource @emotion/react */
import React from 'react';
import {Button} from 'react-bootstrap';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';

function SortPriceButtonsDesign ({handleClick, children}) {

    return <Button 
        onClick={handleClick} 
        variant="secondary" 
        className="p-0 pl-1 pr-1 rounded-0"
        css={css`
            background-color: white;
            border: 1px black solid;
            color: black;
        `}
    >
        {children}
    </Button>
}

SortPriceButtonsDesign.propTypes = {
    handleClick : PropTypes.func,
    children : PropTypes.element
}

export default SortPriceButtonsDesign;