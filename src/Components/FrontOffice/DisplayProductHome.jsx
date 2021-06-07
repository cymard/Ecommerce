import React from 'react';
import ProductCard from './ProductCard.jsx';
import CenteredSpinner from '../All/CenteredSpinner.jsx';
import PropTypes from 'prop-types';

function DisplayProductHome ({isLoading, products}) {
    return <>
        {isLoading ?
            products.map(product =><ProductCard link={`/product/${product.id}`} urlImage={product.image} key={product.id} title={product.name}></ProductCard>)
            :
            <CenteredSpinner/>
        }
    </>
}

DisplayProductHome.propTypes = {
    isLoading : PropTypes.bool.isRequired,
    products : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array
    ])
}

export default DisplayProductHome;