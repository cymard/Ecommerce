import React, {useState} from 'react';
import PropTypes from 'prop-types'; // ES6
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

function HeaderLinks ({color, to, children}){

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

    
    return <div>
        <Link style={style} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} color={color} to={to}>{children}</Link>
    </div>
}

HeaderLinks.propTypes = {
    color: PropTypes.oneOf(['white', 'black']).isRequired,
    to: PropTypes.string.isRequired,
    children : PropTypes.string
}

export default HeaderLinks;