/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types'; // ES6
import {
    Link
  } from "react-router-dom";

function ModifiedLinksRouter ({color, to, children}){

    const linkStyleBlack = {
        color: "black",
        '&:hover': {
            textDecoration : "none",
            color : "black"
        }
    }

    const linkStyleWhite = {
        color: "white",
        '&:hover': {
            textDecoration : "none",
            color : "white"
        }
    }

    const divStyle = {
        whiteSpace: "nowrap"
    }


    const style = (color === "white" ? linkStyleWhite : linkStyleBlack) ;
    
    return <Link  css={style} color={color} to={to}>
        <div className="d-flex justify-content-center align-items-center p-1" css={divStyle}>{children}</div>
    </Link>
    
}

ModifiedLinksRouter.propTypes = {
    color: PropTypes.oneOf(['white', 'black']).isRequired,
    to: PropTypes.string.isRequired,
    children : PropTypes.any
}

export default ModifiedLinksRouter;