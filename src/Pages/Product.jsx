import React, {useEffect, useState} from 'react';
import { Container, Button} from 'react-bootstrap';
import ProductComment from '../Components/ProductComment.jsx';
import PropTypes from 'prop-types';
import TitleH1 from "../Components/TitleH1.jsx";
import axios from 'axios';
import {useLocation} from "react-router-dom";
import ProductImageDescription from "../Components/ProductImageDescription.jsx";
import ProductPriceAddShoppingCart from '../Components/ProductPriceAddShoppingCart.jsx';
import ProductStock from '../Components/ProductStock.jsx';


function Product({name, content, price}){

    const location = useLocation();

    const [data,setData] = useState({status:false})
    
    useEffect(() => {
        const currentPath = location.pathname;
        axios.get(`https://127.0.0.1:8000${currentPath}`)
            .then(res => setData({
                status: true,
                product: res.data.product,
                comments: res.data.comments
            }))
    }, [location]);

    const handleClick = () => {
        console.log("clique");
    }

    
    // gerer l'etat avant la réponse de l'api :
   
    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{data.status ? data.product.name : name}</TitleH1>

        <ProductImageDescription image={data.status ? data.product.image : "holder.js/171x180"}>{data.status ? data.product.description : content}</ProductImageDescription> 
        <ProductStock stock={data.status ? data.product.stock : "chargement"}></ProductStock>
        <ProductPriceAddShoppingCart price={data.status ? data.product.price : parseInt(price)}></ProductPriceAddShoppingCart>

        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2>Les Commentaires postés : </h2>
        </div>
       { console.log(data.comments)}
        {data.status?
        data.comments.map(comment => <ProductComment key={comment.id} button={<Button variant="primary" onClick={handleClick}>Signaler</Button>} title={comment.title} pseudo={comment.username} content={comment.content} note={comment.note} date={comment.date}></ProductComment>)
        :
        <div>chargement...</div>
        }
        
    </Container>
}

Product.defaultProps = {
    name : "Nom de l'objet",
    content : "Description de l'objet",
    price : "prix"
}

Product.propTypes = {
    name : PropTypes.string,
    content : PropTypes.string,
    price : PropTypes.string
}

export default Product;



       /* <input type="file" onChange={fileSelectedHandler}/>
        <button onClick={uploadFile}>salut</button> */
    // méthodes pour upload
    // const [file, setFile] = useState({selectedFile: null});

    // const fileSelectedHandler = (event) => {
    //     setFile({selectedFile: event.target.files[0]})
    //     console.log(file)
    // }

    // const uploadFile = () => {
    //     console.log(file)
    //     const fd = new FormData();
    //     const uriPath = location.pathname
    //     fd.append('image',file.selectedFile, file.selectedFile.name)
    //     axios.put(`https://127.0.0.1:8000${uriPath}`,fd)
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    // }