import React from 'react';
import {Card,Button} from 'react-bootstrap'
import ModifiedLinks from '../Common/ModifiedLinks.jsx';

function ShoppingCartTotal () {
      
    // la logique de calculs
    return <Card>
        <Card.Body className="d-flex justify-content-between">
            <Card.Title>Total à payer:</Card.Title>
            <ModifiedLinks to="/Buy">
                <Button variant="primary">Passer la commande</Button>  
            </ModifiedLinks> 
        </Card.Body>
    </Card>
}

export default ShoppingCartTotal;
