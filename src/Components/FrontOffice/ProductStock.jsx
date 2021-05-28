import React from 'react';
import {Alert} from 'react-bootstrap';
import CenteredSpinner from '../All/CenteredSpinner';

function ProductStock ({stock}) {
    if(stock === 0){
        return <Alert className="text-center" variant="danger">Actuellement Indisponible.</Alert>
    }else if(stock > 1 && stock <= 3){
        return <Alert className="text-center" variant="warning ">Il ne reste plus que {stock} exemplaires en stock.</Alert>
    }else if(stock === 1){
        return <Alert className="text-center" variant="warning ">Il ne reste plus qu'un exemplaire en stock.</Alert>
    }else if(stock === "chargement"){
        return <Alert className="text-center" variant="warning "><CenteredSpinner/></Alert>
    }else{
        return <Alert className="text-center" variant="success">En stock.</Alert>
    }

}

export default ProductStock;

