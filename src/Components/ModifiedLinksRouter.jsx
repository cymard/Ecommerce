/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {css} from '@emotion/react';
import {
    Link
} from "react-router-dom";

function ModifiedLinksRouter ({color, to, children}){


    const style = (color === "white" ? "white" : "black") ;

    // les changements
    const blackOrWhiteColor = style;
    
    return <Link color={blackOrWhiteColor} to={to} 
        css={css`
            color: ${blackOrWhiteColor};
            &:hover {
                text-decoration: none;
                color: ${blackOrWhiteColor};
            }
        `}
    >
        <div className="d-flex justify-content-center align-items-center p-1" 
            css={css`
                white-space: nowrap;
            `}
        >
            {children}
        </div>
    </Link>
    
}

ModifiedLinksRouter.propTypes = {
    color: PropTypes.oneOf(['white', 'black']).isRequired,
    to: PropTypes.string.isRequired,
    children : PropTypes.any
}

export default ModifiedLinksRouter;