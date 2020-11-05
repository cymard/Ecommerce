import React from 'react';
import Product from './Product.jsx'
import {Container} from 'react-bootstrap';

function Home(){

    return <Container className="d-flex justify-content-around flex-wrap">
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </Container>

}

export default Home;