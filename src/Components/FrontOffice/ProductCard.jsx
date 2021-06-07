/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import {
    Link
  } from "react-router-dom";
import screen from '../../images/screen.jpg';

function ProductCard ({link, urlImage,title,textButton}) {
    return <Card 
        css={css`
            width: 20rem;
            margin: 10px;
        `}
    >
            <Card.Title className="pt-4 pb-4 m-auto"
                css={css`
                    text-align: center;
                `}
            >
                {title}
            </Card.Title>
            <Card.Img 
                variant="top" 
                src={ urlImage || screen} 
                css={css`
                    max-height: 200px;
                `}
            />
            <Card.Body className="m-auto">
                <Link to={link}><Button>{textButton}</Button></Link>
            </Card.Body>
        </Card>
}

ProductCard.propTypes = {
    link : PropTypes.string,
    urlImage : PropTypes.string,
    title : PropTypes.string,
    textButton : PropTypes.string
}

ProductCard.defaultProps = {
    title : "Le Titre",
    textButton : "Voir l'article"
}

export default ProductCard;