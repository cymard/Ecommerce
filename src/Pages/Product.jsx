/** @jsxImportSource @emotion/react */
import React, {useEffect, useState, useContext} from 'react';
import { Container ,Image ,Card ,Button ,Row} from 'react-bootstrap';
import ProductComment from '../Components/ProductComment.jsx';
import PropTypes from 'prop-types';
import ProductFormComment from '../Components/ProductFormComment.jsx'
import TitleH1 from "../Components/TitleH1.jsx";
import { css} from '@emotion/react';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import {UserContext} from '../Components/UserContext.jsx';
import {
    Link
  } from "react-router-dom";
// import mac from "../images/mac.jpg"

function Product({name, content, price}){


    const informationUser = useContext(UserContext);
    console.log(informationUser);
    const location = useLocation();

    const [data,setData] = useState({status:false,data:""})

    useEffect(() => {
        
        const currentPath = location.pathname;
        // console.log(`https://127.0.0.1:8000${currentPath}`)
        // get product
        
        axios.get(`https://127.0.0.1:8000${currentPath}`)
            .then(res => setData({
                status: true,
                data: res.data
            }))
    }, [location]);
    
    // data.status ? console.log(data) : console.log("wait");
    const title = data.status ? data.data.name : name;
    const description = data.status ? data.data.description : content;
    const productPrice = data.status ? data.data.price : price;
    const image = data.status ? data.data.image : "holder.js/171x180";
    // console.log(mac);

    // méthodes pour upload
    const [file, setFile] = useState({selectedFile: null});

    const fileSelectedHandler = (event) => {
        setFile({selectedFile: event.target.files[0]})
        console.log(file)
    }

    const uploadFile = () => {
        console.log(file)
        const fd = new FormData();
        const uriPath = location.pathname
        fd.append('image',file.selectedFile, file.selectedFile.name)
        axios.put(`https://127.0.0.1:8000${uriPath}`,fd)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{title}</TitleH1>

        <input type="file" onChange={fileSelectedHandler}/>
        <button onClick={uploadFile}>salut</button>

        <Row className="d-flex justify-content-center">
            <div className="col-lg-4 col-md-12 d-flex justify-content-center ">
                <Image className="mb-5" src={image} rounded 
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
                        {description}
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
                >Prix : {productPrice} €</Card.Title>
               
                    {informationUser.email === null && informationUser.token === null ?

                        <Link to="/login"><Button
                            css={css`
                                width: 100%;
                            `}
                        >Ajouter au panier</Button></Link>
                        
                    :
                    
                        <Card.Link href="#"
                            css={css`
                                color: white;
                            `}
                        >Ajouter au panier</Card.Link>
                    }
                    
                
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
    price : "prix"
}

Product.propTypes = {
    name : PropTypes.string,
    content : PropTypes.string,
    price : PropTypes.number

}

export default Product;