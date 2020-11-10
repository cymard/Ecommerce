import React from 'react';
import { Container ,Image ,Card ,Button ,Row} from 'react-bootstrap';
import ProductComment from './ProductComment.jsx';
import PropTypes from 'prop-types';
import ProductFormComment from './ProductFormComment.jsx'
import TitleH1 from "../Common/TitleH1.jsx";

function Product({name, content, price}){



    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{name}</TitleH1>


        <Row className="d-flex justify-content-center">
            <div className="col-lg-4 col-md-12 d-flex justify-content-center ">
                <Image className="mb-5" style={{height: "318px", width:"318px"}} src="holder.js/171x180" rounded />
            </div>
            
            <div className="col-lg-7 col-md-12 ">
                <Card style={{height: "318px"}} className="ml-2 mr-2" >
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
                <Card.Title style={{margin: "auto", marginBottom : "0.75rem"}}>Prix : {price} €</Card.Title>
                <Button>
                    <Card.Link href="#" style={{color : "white"}}>Ajouter au panier</Card.Link>
                </Button>
            </Card.Body>
        </Card>

        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 style={{whiteSpace: "nowrap"}}> Ecrire un commentaire :</h2>
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
    content : PropTypes.oneOf([
        PropTypes.string,
        PropTypes.number
    ]),
    price : PropTypes.number

}

export default Product;