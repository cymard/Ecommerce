import React from 'react';


function Footer(){

    const divStyle = {
        backgroundColor: "black",
        height: "120px",
        width: "100%",
        marginTop : "20px"
    }

    const h2Style = {
        color: "white",
        fontSize : "20px"
    }

    return <div style={divStyle}>
        <h2 style={h2Style}>FOOTER</h2>
    </div>
}

export default Footer;