import React from 'react';
import ProductCard from './ProductCard.jsx';
import CenteredSpinner from './CenteredSpinner.jsx';

function DisplayProductHome ({data}) {
    return <>
        {data.status ?
            data.data.map(product =><ProductCard urlImage={product.image} key={product.id} title={product.name} id={product.id}></ProductCard>)
            :
            <CenteredSpinner/>
        }
    </>
}

export default DisplayProductHome;