import React from 'react';
import HomeProduct from '../Components/HomeProduct.jsx'
import {Container} from 'react-bootstrap';
import HomeCarousel from '../Components/HomeCarousel.jsx'

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