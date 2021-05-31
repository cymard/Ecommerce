/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';

function InformationOrderLine ({children,informationOrder}){
    return <p>{children}:   
    <span
        css={css`
            font-size: 20px;
            padding-left: 7px;
        `}
    >
        {informationOrder}
    </span>  
</p> 
}

InformationOrderLine.propTypes = {
    children : PropTypes.string.isRequired,
    informationOrder : PropTypes.object.isRequired
}

export default InformationOrderLine;