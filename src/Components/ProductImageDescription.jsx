/** @jsxImportSource @emotion/react */
import React from 'react';
import {Row, Image, Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { css} from '@emotion/react';

function ProductImageDescription ({image, children}) {
    return <Row className="d-flex justify-content-center">
        <div className="col-lg-4 col-md-12 d-flex justify-content-center ">
            <Image className="mb-5" src={image} rounded 
                css={css`
                    height: 318px;
                    width: 318px;
                `}
            />
        </div>
        
        <div className="col-lg-7 col-md-12 ">
            <Card className="ml-2 mr-2" 
                css={css`
                    height: 318px;
                `}
            >
                <Card.Body>
                    <Card.Text>
                    {children}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    </Row>
}

export default ProductImageDescription;

ProductImageDescription.propTypes = {
    image :  PropTypes.string,
    children : PropTypes.string
}