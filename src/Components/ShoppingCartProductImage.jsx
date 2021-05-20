/** @jsxImportSource @emotion/react */
import React from 'react';
import {Col,Image} from 'react-bootstrap';
import {css} from '@emotion/react';
import screen from '../images/screen.jpg';

function ShoppingCartProductImage({image}) {
    return <Col
        sm={12}
        md={12}
        lg={4}
        className="d-flex justify-content-center p-0"
    >
    <Image 
        css={css`
            max-height: 318px;
            max-width: 318px;
        `}
        src={image || screen} 
        rounded 
    />
</Col>
}

export default ShoppingCartProductImage;