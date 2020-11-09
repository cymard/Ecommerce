import React from 'react';
import  "react-bootstrap";

function TitleH1 ({children}) {


    return <div className="d-flex justify-content-center mb-5 mt-5 ">
        <h1> {children} :</h1>
    </div>
}

export default TitleH1