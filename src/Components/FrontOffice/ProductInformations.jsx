/** @jsxImportSource @emotion/react */
import React from 'react';
import Title from "../All/Title.jsx";
import ProductImageDescription from "./ProductImageDescription.jsx";
import ProductPriceAddShoppingCart from './ProductPriceAddShoppingCart.jsx';
import ProductStock from './ProductStock.jsx';
import screen from '../../images/screen.jpg';
import ProductAverageRating from '../All/ProductAverageRating.jsx';
import PropTypes from 'prop-types';


function ProductInformations({data, name, content, price, setAlertState, closeAlert}){
    return <>
    <Title>{data.status ? data.product.name : name}</Title>

    <ProductImageDescription 
        image={data.status ? data.product.image : screen}
    >
        {data.status ? data.product.description : content}
    </ProductImageDescription> 

    <ProductStock 
        stock={data.status ? data.product.stock : "chargement"}
    ></ProductStock>

    {data.status &&
        <ProductAverageRating data={data}></ProductAverageRating>
    }

    {data.stock > 0 && <ProductPriceAddShoppingCart 
            stock={data.status ? data.product.stock : undefined}  
            price={data.status ? data.product.price : parseInt(price)}
            setAlertState={setAlertState}
            closeAlert={closeAlert}
        ></ProductPriceAddShoppingCart>
    }
</>
}

ProductInformations.propTypes = {
    data :  PropTypes.object,
    informationProduct :  PropTypes.object,
    name :  PropTypes.string,
    content :  PropTypes.string,
    price :  PropTypes.number,
    setAlertState : PropTypes.func,
    closeAlert : PropTypes.func
}

export default ProductInformations;