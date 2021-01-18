import React from 'react';
import ProductCard from './ProductCard.jsx';

function DisplayProductHome ({data}) {
    return <>
        {data.status ?
            data.data.map(product =><ProductCard key={product.id} title={product.name} id={product.id}></ProductCard>)
            :
            <p>Chargement ...</p>
        }
    </>
}

export default DisplayProductHome;