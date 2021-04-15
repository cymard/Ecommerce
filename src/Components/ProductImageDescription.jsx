/** @jsxImportSource @emotion/react */
import React from 'react';
import {Row, Image, Card,Accordion,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { css} from '@emotion/react';

function ProductImageDescription ({image, children}) {
    return <Row className="d-flex justify-content-center mb-4">
        <div  className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center ">
            <Image className="m-2" src={image} rounded 
                css={css`
                    max-height: 318px;
                    max-width: 318px;
                `}
                
            />
        </div>
        
        <div className="col-lg-7 col-md-12">
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        Cliquez pour voir la Description
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>{children}</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    </Row>
}

// return <Row className="d-flex justify-content-center mb-4">
// <div  className="col-lg-4 col-md-12 d-flex justify-content-center align-items-center ">
//     <Image className="m-2" src={image} rounded 
//         css={css`
//             max-height: 318px;
//             max-width: 318px;
//         `}
        
//     />
// </div>

// <div className="col-lg-7 col-md-12">
//     <Card className="ml-2 mr-2">
//         <Card.Body>
//             <Card.Text >
//                 {children}
//             </Card.Text>
//         </Card.Body>
//     </Card>
// </div>
// </Row>
// }

export default ProductImageDescription;

ProductImageDescription.propTypes = {
    image :  PropTypes.string,
    children : PropTypes.string
}