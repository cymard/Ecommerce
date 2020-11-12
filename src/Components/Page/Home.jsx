import React from 'react';
import HomeProduct from '../HomeProduct.jsx'
import {Container} from 'react-bootstrap';
import HomeCarousel from '../HomeCarousel.jsx'

function Home(){

    return <>
        
        <Container className="d-flex justify-content-around flex-wrap">
            <HomeCarousel></HomeCarousel>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
            <HomeProduct></HomeProduct>
        </Container>
    </>
}

export default Home;