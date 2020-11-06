import React from 'react';
import { Container ,Image ,Card ,Button} from 'react-bootstrap';
import ProductComment from './ProductComment.jsx';
import PropTypes from 'prop-types';

function Product({name, content, price}){
    return <Container className="d-flex flex-column justify-content-around">
        <div className="d-flex justify-content-center mb-5 mt-5">
            <h1>{name}</h1>
        </div>


        <div className="d-flex">
            <Image style={{height: "318px", width:"318px"}} src="holder.js/171x180" rounded />
            <Card style={{ width: '50rem' }}>
                <Card.Body>
                    <Card.Text>
                        {content}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>

        

        <Card className="mt-5">
            <Card.Body className="d-flex justify-content-center flex-column">
                <Card.Title style={{margin: "auto", marginBottom : "0.75rem"}}>Prix : {price} €</Card.Title>
                <Button>
                    <Card.Link href="#" style={{color : "white"}}>Ajouter au panier</Card.Link>
                </Button>
            </Card.Body>
        </Card>

        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2>Les Commentaires : </h2>
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