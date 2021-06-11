/** @jsxImportSource @emotion/react */
import React from 'react';
import {Image} from 'react-bootstrap';
import { css} from '@emotion/react';
import screen from '../../images/screen.jpg';
import PropTypes from 'prop-types';


function ProductImage ({image}) {
    return  <div  className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center ">
    <Image 
        className="m-2" 
        src={image !== null ? image : screen} 
        rounded 
        css={css`
            max-height: 318px;
            max-width: 318px;
        `}
    />
</div>
}

ProductImage.propTypes = {
    image : PropTypes.string
}

export default ProductImage;