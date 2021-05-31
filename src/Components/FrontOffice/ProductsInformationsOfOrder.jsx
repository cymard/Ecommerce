/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import screen from '../../images/screen.jpg';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';


function ProductsInformationsOfOrder ({product}){
    return <Card className="mr-2 ml-2" style={{ width: '18rem' }}>
        <Card.Img 
            variant="top"
            src={product.product.image || screen} 
            css={css`
                max-height: 200px;
            `}    
        />
        <Card.Body>
            <Card.Title className="text-center">{product.product.name}</Card.Title>
            <Card.Text>
                Prix : {product.product.price}€
                <br/>
                Quantité : {product.quantity}
            </Card.Text>
                
        </Card.Body>
    </Card>
}

ProductsInformationsOfOrder.propTypes = {
    product : PropTypes.array.isRequired
}

export default ProductsInformationsOfOrder;