/** @jsxImportSource @emotion/react */
import React from 'react';
import {Col,Image} from 'react-bootstrap';
import {css} from '@emotion/react';
import screen from '../../images/screen.jpg';
import PropTypes from 'prop-types';


function ShoppingCartProductImage({image}) {
    return <Col
        sm={12}
        md={12}
        lg={4}
        className="d-flex justify-content-center align-items-center p-0"
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

ShoppingCartProductImage.propTypes = {
    image : PropTypes.string.isRequired
}

export default ShoppingCartProductImage;