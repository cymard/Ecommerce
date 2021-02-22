/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import RateWithStars from './RateWithStars.jsx';

function ProductComment ({pseudo, content, note, date, title, button}) {
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
        <Card.Footer className="text-muted d-flex justify-content-between">
           <p>Publié le {date}</p> 
           {button}
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