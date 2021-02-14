import React from 'react';
import  "react-bootstrap";
import PropTypes from 'prop-types'

function TitleH1 ({children}) {

    return <div className="d-flex justify-content-center mb-5 mt-5 ">
        <h1> {children} :</h1>
    </div>

}

TitleH1.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
      ])
}

TitleH1.defaultProps = {
    children : "title h1"
}

export default TitleH1