import React from 'react';
import RateWithStars from './RateWithStars.jsx';
import {Card} from 'react-bootstrap';
import PropTypes from 'prop-types';

function ProductAverageRating({data}){
    return <Card className="mt-4">
    <Card.Body className=" d-flex justify-content-around align-items-center">
        Note moyenne du produit : 
        <div>
            <RateWithStars rate={Math.round(data.averaging)}></RateWithStars>
        </div> 
    </Card.Body> 
</Card> 
}

ProductAverageRating.propTypes = {
    ProductAverageRating : PropTypes.string
}

export default ProductAverageRating;