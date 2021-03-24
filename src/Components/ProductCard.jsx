/** @jsxImportSource @emotion/react */
import React from 'react';
import {Card,Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import {
    Link
  } from "react-router-dom";
// import image from '../images/mac.jpg';
import screen from '../images/screen.jpg';


function ProductCard ({urlImage,title,textButton,id}) {

    
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
            >{title}</Card.Title>
            <Card.Img 
                variant="top" 
                src={ urlImage || screen} 
                css={css`
                    max-height: 200px;
                `}
            />
            {/* <img src="https://i.ibb.co/j3Z8Nwz/mac.jpg" alt="mac" border="0"></img> */}
            {/* holder.js/100px180 */}
            <Card.Body className="m-auto">
                <Link to={`/product/${id}`}><Button>{textButton}</Button></Link>
            </Card.Body>
        </Card>
}

ProductCard.propTypes = {
    title : PropTypes.node,
    textButton : PropTypes.node
}

ProductCard.defaultProps = {
    title : "Le Titre",
    textButton : "Voir l'article"
}

export default ProductCard;