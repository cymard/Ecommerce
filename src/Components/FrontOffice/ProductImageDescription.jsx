/** @jsxImportSource @emotion/react */
import React,{useRef} from 'react';
import {Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductImage from './ProductImage.jsx';
import ProductDescription from './ProductDescription.jsx';

function ProductImageDescription ({image, children}) {
    const refRow = useRef(null);

    return <Row ref={refRow} className="d-flex justify-content-center mb-4">
        <ProductImage image={image}/>
        <ProductDescription refRow={refRow}>{children}</ProductDescription>
    </Row>
}


export default ProductImageDescription;

ProductImageDescription.propTypes = {
    image :  PropTypes.string,
    children : PropTypes.string
}