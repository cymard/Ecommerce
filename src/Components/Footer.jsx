/** @jsxImportSource @emotion/react */
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

    return <div css={divStyle}>
        <h2 css={h2Style}>FOOTER</h2>
    </div>
}

export default Footer;