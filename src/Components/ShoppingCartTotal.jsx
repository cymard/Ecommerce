import React from 'react';
import {Col, Button, Card, Row} from 'react-bootstrap'
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import PropTypes from 'prop-types';
import ShoppingCartTotalPrice from './ShoppingCartTotalPrice.jsx';

function ShoppingCartTotal ({price}) {
      
    return <Card className="mb-5">
        <Card.Body className="w-100 ">
            <Row>
                <ShoppingCartTotalPrice price={price}/>
                <Col sm={0} lg={6}></Col>
                <Col sm={12} lg={3} className="text-center">
                    {price !== 0 ? 
                        <ModifiedLinksRouter color="white" to="/Buy">
                            <Button className="w-100" variant="success">Passer la commande</Button>  
                        </ModifiedLinksRouter> 
                    :
                        <Button disabled className="w-100" variant="success">Passer la commande</Button>  
                    }
                </Col>
            </Row>
        </Card.Body>
    </Card>
}

ShoppingCartTotal.propTypes = {
    price : PropTypes.number
}

ShoppingCartTotal.defaultProps = {
    price : 0
}

export default ShoppingCartTotal;
