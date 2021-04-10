/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import RateWithStars from './RateWithStars.jsx';

function ProductComment ({pseudo, content, note, date, title, buttons}) {
    // const starIcon = <FontAwesomeIcon color="orange"  icon={faStar} />
    const marginBottom = 0;

    return <Card className="text-left mb-3">
        <Card.Header className="d-flex justify-content-between">
            <p 
                css={css`
                    margin-bottom: ${marginBottom};
                `}
            >
                {pseudo}
            </p>

            <p>
                <strong>{title} </strong>
            </p>
            
            <p 
                css={css`
                    margin-bottom: ${marginBottom};
                `}
            >
                <RateWithStars rate={note}></RateWithStars>
            </p>
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {content}
            </Card.Text>
        </Card.Body>
        {/* className="text-muted d-flex justify-content-between" */}
        <Card.Footer >
            {/*  <Row>
                <Col sm={6} lg={10}>
                    <Row sm={0} lg={12}>
                        <Col  md={2}><p>Publié le</p></Col>
                        <Col className="text-left"  md={10}><p>{date}</p></Col>
                    </Row>
                    
 
                </Col>
                <Col  sm={6}  className="text-right" lg={2}>{buttons}</Col>
            </Row> */}

            <Row>
                <Col lg={3}><p>Publié le {date}</p></Col>
                <Col sm={0} lg={7}></Col>
                <Col lg={2}>{buttons}</Col>
            </Row>
            
        </Card.Footer>
    </Card>
}

ProductComment.propTypes = {
    pseudo : PropTypes.string,
    content : PropTypes.string,
    note : PropTypes.oneOf([0,1,2,3,4,5]),
    date : PropTypes.string
}

ProductComment.defaultProps = {
    pseudo : "Pseudo",
    content : "Contenu du commentaire",
    note : 5,
    date : "Date"
}


export default ProductComment;