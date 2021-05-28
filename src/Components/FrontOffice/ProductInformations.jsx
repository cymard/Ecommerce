/** @jsxImportSource @emotion/react */
import React from 'react';
import TitleH1 from "../All/TitleH1.jsx";
import ProductImageDescription from "./ProductImageDescription.jsx";
import ProductPriceAddShoppingCart from './ProductPriceAddShoppingCart.jsx';
import ProductStock from './ProductStock.jsx';
import screen from '../../images/screen.jpg';
import ProductAverageRating from '../All/ProductAverageRating.jsx';

function ProductInformations({data, informationProduct, name, content, price}){
    return <>
    <TitleH1>{data.status ? data.product.name : name}</TitleH1>

    <ProductImageDescription 
        image={data.status ? data.product.image : screen}
    >
        {data.status ? data.product.description : content}
    </ProductImageDescription> 

    <ProductStock 
        stock={data.status ? data.product.stock : "chargement"}
    ></ProductStock>

    {data.status ?  
        <ProductAverageRating data={data}></ProductAverageRating>
    : 
        <div></div>
    }

    {
        informationProduct.stock > 0 ?
            <ProductPriceAddShoppingCart stock={data.status ? data.product.stock : undefined}  price={data.status ? data.product.price : parseInt(price)}></ProductPriceAddShoppingCart>
        :
            <></>
    }
</>
}

export default ProductInformations;