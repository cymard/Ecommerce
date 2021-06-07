import React from 'react';
import  "react-bootstrap";
import PropTypes from 'prop-types'

function Title ({children}) {

    return <div className="d-flex justify-content-center mb-5 mt-5 text-center ">
        <h1> {children} :</h1>
    </div>

}

Title.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.array
    ])
}

Title.defaultProps = {
    children : "title h1"
}

export default Title