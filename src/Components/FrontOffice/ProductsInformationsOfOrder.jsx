/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import screen from '../../images/screen.jpg';
import {Card} from 'react-bootstrap';

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
                prix : {product.product.price}€
                <br/>
                quantité : {product.quantity}
            </Card.Text>
                
        </Card.Body>
    </Card>
}

export default ProductsInformationsOfOrder;