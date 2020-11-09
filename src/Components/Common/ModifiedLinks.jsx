import React, {useState} from 'react';
import PropTypes from 'prop-types'; // ES6
import {
    Link
  } from "react-router-dom";

function ModifiedLinks ({color, to, children}){

    const linkStyleBlack = {
        color: "black"
    }
    
    const hoverLinkStyleBlack = {
        textDecoration : "none",
        color: "black"
    }

    const linkStyleWhite = {
        color: "white"
    }
    
    const hoverLinkStyleWhite = {
        textDecoration : "none",
        color: "white"
    }

    const [style, setStyle] = useState(color === "white" ? linkStyleWhite : linkStyleBlack)

    const handleMouseOver = function(){
        if(color === "white"){
            setStyle(hoverLinkStyleWhite)
        }else {
            setStyle(hoverLinkStyleBlack)
        }
        
    }

    const handleMouseOut = function(){
        if(color === "white"){
            setStyle(linkStyleWhite)
        }else {
            setStyle(linkStyleBlack)
        }
    }

    
    return <Link  style={style} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} color={color} to={to}>
            <div className="d-flex justify-content-center align-items-center p-1" style={{width: "100%", height:"100%"}}>{children}</div>
        </Link>
    
}

ModifiedLinks.propTypes = {
    color: PropTypes.oneOf(['white', 'black']).isRequired,
    to: PropTypes.string.isRequired,
    children : PropTypes.string
}

export default ModifiedLinks;