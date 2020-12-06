/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container ,Image ,Card ,Button ,Row} from 'react-bootstrap';
import ProductComment from '../Components/ProductComment.jsx';
import PropTypes from 'prop-types';
import ProductFormComment from '../Components/ProductFormComment.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import { css} from '@emotion/react';

function Product({name, content, price}){
    
    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{name}</TitleH1>


        <Row className="d-flex justify-content-center">
            <div className="col-lg-4 col-md-12 d-flex justify-content-center ">
                <Image className="mb-5" src="holder.js/171x180" rounded 
                    css={css`
                        height: 318px;
                        width: 318px;
                    `}
                />
            </div>
            
            <div className="col-lg-7 col-md-12 ">
                <Card className="ml-2 mr-2" 
                    css={css`
                        height: 318px;
                    `}
                >
                    <Card.Body>
                        <Card.Text>
                            {content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </Row>


        <Card className="mt-5 mb-5">
            <Card.Body className="d-flex justify-content-center flex-column">
                <Card.Title 
                    css={css`
                        margin: auto;
                        margin-bottom: 0.75em
                    `}
                >Prix : {price} €</Card.Title>
                <Button>
                    <Card.Link href="#"
                        css={css`
                            color: white;
                        `}
                    >Ajouter au panier</Card.Link>
                </Button>
            </Card.Body>
        </Card>

        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 
                css={css`
                    white-space: nowrap;
                `}
            > Ecrire un commentaire :</h2>
        </div>

        <ProductFormComment></ProductFormComment>

        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2>Les Commentaires postés : </h2>
        </div>

        <ProductComment></ProductComment>
        <ProductComment></ProductComment>
        <ProductComment></ProductComment>
        <ProductComment></ProductComment>
        
    </Container>
}

Product.defaultProps = {
    name : "Nom de l'objet",
    content : "Description de l'objet",
    price : 20
}

Product.propTypes = {
    name : PropTypes.string,
    content : PropTypes.string,
    price : PropTypes.number

}

export default Product;