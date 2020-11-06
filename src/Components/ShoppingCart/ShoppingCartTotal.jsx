import React from 'react';
import {Card,Button} from 'react-bootstrap'

function ShoppingCartTotal () {
    const linkStyle = {
        color : 'white'
    }
    // la logique de calculs
    return <Card>
        <Card.Body className="d-flex justify-content-between">
            <Card.Title>Total à payer:</Card.Title>
            <Button variant="primary"> 
                <a href="#" style={linkStyle}>Passer la commande</a> 
            </Button>
        </Card.Body>
    </Card>
}

export default ShoppingCartTotal;
