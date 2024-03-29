/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card, Col, Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import RateWithStars from '../All/RateWithStars.jsx';
import dateFormat from 'dateformat';

function ProductComment ({pseudo, content, note, date, title, buttons}) {
    const marginBottom = 0;

    return <Card className="text-left mb-5">
        <Card.Header className="d-flex justify-content-between">
            <p 
                css={css`
                    margin-bottom: ${marginBottom};
                `}
            >
                {pseudo}
            </p>

            <p>
                <strong>{title}</strong>
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
        
        <Card.Footer >
            <Row>
                <Col lg={3} md={3}>
                    <p>Publié le {dateFormat(date, "mm/dd/yyyy à HH:MM:ss")}</p>
                </Col>
                <Col sm={0} md={7} lg={7}></Col>
                <Col lg={2} md={2}>{buttons}</Col>
            </Row>
            
        </Card.Footer>
    </Card>
}

ProductComment.propTypes = {
    pseudo : PropTypes.string,
    title : PropTypes.string,
    buttons : PropTypes.element,
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