/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';

function ProductComment ({pseudo, content, note, date}) {

    const marginBottom = 0;

    return <Card className="text-center mb-3">
        <Card.Header className="d-flex justify-content-between">
            <p 
                css={css`
                    margin-bottom: ${marginBottom};
                `}
            >
                {pseudo}
            </p>
            
            <p 
                css={css`
                    margin-bottom: ${marginBottom};
                `}
            >
                Note : {note}/5
            </p>
        </Card.Header>
        <Card.Body>
            <Card.Text>
                {content}
            </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Publié le {date}</Card.Footer>
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