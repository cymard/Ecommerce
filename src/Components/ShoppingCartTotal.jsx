/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card,Button} from 'react-bootstrap'
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import {css} from '@emotion/react';
import PropTypes from 'prop-types'

function ShoppingCartTotal ({prix}) {
      
    return <Card className="mb-5">
        <Card.Body className="d-flex justify-content-between align-items-center">
            <Card.Title 
                css={css`
                    font-size: 1.4em;
                `}
            >
                Total à payer : {prix} €
            </Card.Title>
            <ModifiedLinksRouter color="white" to="/Buy">
                <Button variant="success">Passer la commande</Button>  
            </ModifiedLinksRouter> 
        </Card.Body>
    </Card>
}

ShoppingCartTotal.propTypes = {
    prix : PropTypes.number
}

ShoppingCartTotal.defaultProps = {
    prix : 0
}

export default ShoppingCartTotal;
