/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card,Button, Row, Col} from 'react-bootstrap'
import ModifiedLinksRouter from './ModifiedLinksRouter.jsx';
import {css} from '@emotion/react';
import PropTypes from 'prop-types'

function ShoppingCartTotal ({price}) {
      
    return <Card className="mb-5">
        <Card.Body className="w-100 ">
            <Row>
                <Col sm={12} lg={3} className="text-center">
                    <Card.Title 
                        css={css`
                            font-size: 1.4em;
                        `}
                    >
                        Total à payer : {price} €
                    </Card.Title>
                </Col>

                <Col sm={0} lg={6}></Col>
                <Col sm={12} lg={3} className="text-center">

                {price !== 0 
                ? 
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
