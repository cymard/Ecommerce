/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card,Col} from 'react-bootstrap'
import {css} from '@emotion/react';

function ShoppingCartTotalPrice ({price}) {
    return <Col sm={12} lg={3} className="text-center">
    <Card.Title 
        css={css`
            font-size: 1.4em;
        `}
    >
        Total à payer : {price} €
    </Card.Title>
</Col>
}

export default ShoppingCartTotalPrice;