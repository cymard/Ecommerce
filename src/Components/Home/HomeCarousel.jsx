import React from 'react';
import {Carousel, } from 'react-bootstrap';


function HomeCarousel () {

    const carouselStyle= {
        width : "100%",
        height: "400px",
        border: "solid 1px black",
        marginBottom: "50px",
        marginTop: "20px"
    }

    return <Carousel style={carouselStyle}>

    <Carousel.Item interval={1000}>
        <img
        className="d-block w-100"
        src="holder.js/800x400?text=First slide&bg=373940"
        alt="First slide"
        />
        <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item interval={1000}>
        <img
        className="d-block w-100"
        src="holder.js/800x400?text=Second slide&bg=282c34"
        alt="Third slide"
        />
        <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
        <img
        className="d-block w-100"
        src="holder.js/800x400?text=Third slide&bg=20232a"
        alt="Third slide"
        />
        <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
    </Carousel.Item>

  </Carousel>
}

export default HomeCarousel;