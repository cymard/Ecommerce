/** @jsxImportSource @emotion/react */
import React from 'react';
import {Carousel } from 'react-bootstrap';
import { css} from '@emotion/react';

function HomeCarousel () {

    return <Carousel  
        css={css`
            width: 100%;
            height: 400px;
            border: solid 1px black;
            margin-bottom: 50px;
            margin-top: 20px;
        `}
    >

    <Carousel.Item interval={1000}>
        <img
            className="d-block w-100"
            src="..."
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
            src="..."
            alt="second slide"
        />
        <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
    </Carousel.Item>

    <Carousel.Item>
        <img
            className="d-block w-100"
            src="..."
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