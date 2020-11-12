import React from 'react';
import {Card} from 'react-bootstrap'
import PropTypes from 'prop-types';

function ProductComment ({pseudo, content, note, date}) {
    return <Card className="text-center mb-3">
        <Card.Header className="d-flex justify-content-between">
            <p style={{marginBottom : 0}}>{pseudo}</p>
            <p style={{marginBottom : 0}}>Note : {note}/5</p>
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
    pseudo : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    content : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    note : PropTypes.oneOf([0,1,2,3,4,5]),
    date : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ])
}

ProductComment.defaultProps = {
    pseudo : "Pseudo",
    content : "Contenu du commentaire",
    note : 5,
    date : "Date"
}


export default ProductComment;