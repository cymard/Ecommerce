import React from 'react';
import {Alert} from 'react-bootstrap';

function ProductStock ({stock}) {

    console.log("nombre : "+stock)
    if(stock === 0){
        return <Alert className="text-center" variant="danger">Actuellement Indisponible.</Alert>
    }else if(stock > 0 && stock <= 3){
        return <Alert className="text-center" variant="warning ">Il ne reste plus que {stock} exemplaire(s) en stock.</Alert>
    }else if(stock === "chargement"){
        return <Alert className="text-center" variant="warning ">Chargement ...</Alert>
    }else{
        return <Alert className="text-center" variant="success">En stock.</Alert>
    }
        
}

export default ProductStock;

