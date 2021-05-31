import React from 'react';
import ProductCard from './ProductCard.jsx';
import CenteredSpinner from '../All/CenteredSpinner.jsx';
import PropTypes from 'prop-types';

function DisplayProductHome ({data}) {
    return <>
        {data.status ?
            data.data.map(product =><ProductCard link={`/product/${product.id}`} urlImage={product.image} key={product.id} title={product.name}></ProductCard>)
            :
            <CenteredSpinner/>
        }
    </>
}

DisplayProductHome.propTypes = {
    data : PropTypes.array.isRequired
}

export default DisplayProductHome;