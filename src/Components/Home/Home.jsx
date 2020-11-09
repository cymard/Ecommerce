import React from 'react';
import Product from './Product.jsx'
import {Container} from 'react-bootstrap';
import HomeCarousel from './HomeCarousel.jsx'

function Home(){

    return <>
        
        <Container className="d-flex justify-content-around flex-wrap">
            <HomeCarousel></HomeCarousel>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </Container>
    </>
}

export default Home;