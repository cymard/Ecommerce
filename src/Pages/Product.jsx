import React, {useEffect, useState, useContext} from 'react';
import { Container} from 'react-bootstrap';
import ProductComment from '../Components/ProductComment.jsx';
import PropTypes from 'prop-types';
import TitleH1 from "../Components/TitleH1.jsx";
import axios from 'axios';
import {useLocation} from "react-router-dom";
import {UserContext} from '../Components/UserContext.jsx';
import ProductImageDescription from "../Components/ProductImageDescription.jsx";
import ProductPriceAddShoppingCart from '../Components/ProductPriceAddShoppingCart.jsx';
import ProductStock from '../Components/ProductStock.jsx';


function Product({name, content, price}){


    const informationUser = useContext(UserContext);

    const location = useLocation();

    const [data,setData] = useState({status:false,data:""})
    
    useEffect(() => {
        const currentPath = location.pathname;
        axios.get(`https://127.0.0.1:8000${currentPath}`)
            .then(res => setData({
                status: true,
                data: res.data
            }))
    }, [location]);
    
    // gerer l'etat avant la réponse de l'api :
    // data.status ? console.log(data) : console.log("wait");
    const title = data.status ? data.data.name : name;
    const description = data.status ? data.data.description : content;
    const productPrice = data.status ? data.data.price : price;
    const image = data.status ? data.data.image : "holder.js/171x180";
    const stock = data.status ? data.data.stock : "chargement";
    // console.log(mac);

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
    
    console.log(data);
    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{title}</TitleH1>

        {/* <input type="file" onChange={fileSelectedHandler}/>
        <button onClick={uploadFile}>salut</button> */}

        <ProductImageDescription image={image}>{description}</ProductImageDescription> 
        <ProductStock stock={stock}></ProductStock>
        <ProductPriceAddShoppingCart price={productPrice}></ProductPriceAddShoppingCart>

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
    price : "prix"
}

Product.propTypes = {
    name : PropTypes.string,
    content : PropTypes.string,
    price : PropTypes.number

}

export default Product;