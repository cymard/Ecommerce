/** @jsxImportSource @emotion/react */
import React from 'react';
import { Container ,Image ,Card ,Button ,Row} from 'react-bootstrap';
import ProductComment from '../Components/ProductComment.jsx';
import PropTypes from 'prop-types';
import ProductFormComment from '../Components/ProductFormComment.jsx'
import TitleH1 from "../Components/TitleH1.jsx";

function Product({name, content, price}){

    const imageStyle = {
        height: "318px", width:"318px"
    }

    const cardHeightStyle = {
        height: "318px"
    }

    const cardTitleStyle = {
        margin: "auto", 
        marginBottom : "0.75rem"
    }

    const linkColorStyle = {
        color : "white"
    }

    const h2Style= {
        whiteSpace: "nowrap"
    }
    
    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{name}</TitleH1>


        <Row className="d-flex justify-content-center">
            <div className="col-lg-4 col-md-12 d-flex justify-content-center ">
                <Image className="mb-5" css={imageStyle} src="holder.js/171x180" rounded />
            </div>
            
            <div className="col-lg-7 col-md-12 ">
                <Card css={cardHeightStyle} className="ml-2 mr-2" >
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
                <Card.Title css={cardTitleStyle}>Prix : {price} €</Card.Title>
                <Button>
                    <Card.Link href="#" css={linkColorStyle}>Ajouter au panier</Card.Link>
                </Button>
            </Card.Body>
        </Card>

        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 css={h2Style}> Ecrire un commentaire :</h2>
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