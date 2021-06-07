/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import {
    Link
} from "react-router-dom";

function ModifiedLinksRouter ({color, to, children, onClick}){

    const style = (color === "white" ? "white" : "black") ;

    const blackOrWhiteColor = style;
    
    return <Link color={blackOrWhiteColor} onClick={onClick} to={to} 
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
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onClick : PropTypes.func
}

export default ModifiedLinksRouter;