import React from 'react';
import {Card,Button} from 'react-bootstrap'
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';

function ShoppingCartTotal () {
      
    // la logique de calculs
    return <Card>
        <Card.Body className="d-flex justify-content-between">
            <Card.Title>Total à payer:</Card.Title>
            <ModifiedLinksRouter to="/Buy">
                <Button variant="primary">Passer la commande</Button>  
            </ModifiedLinksRouter> 
        </Card.Body>
    </Card>
}

export default ShoppingCartTotal;
