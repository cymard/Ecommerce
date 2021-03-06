/** @jsxImportSource @emotion/react */
import React, {useEffect, useState, useContext, useCallback} from 'react';
import { Container, Button} from 'react-bootstrap';
import ProductComment from '../Components/ProductComment.jsx';
import PropTypes from 'prop-types';
import TitleH1 from "../Components/TitleH1.jsx";
import axios from 'axios';
import {useLocation} from "react-router-dom";
import ProductImageDescription from "../Components/ProductImageDescription.jsx";
import ProductPriceAddShoppingCart from '../Components/ProductPriceAddShoppingCart.jsx';
import ProductStock from '../Components/ProductStock.jsx';
import {UserContext} from '../Components/UserContext.jsx';
import RedirectModal from '../Components/RedirectModal.jsx';
import {Link} from "react-router-dom";
import {css} from '@emotion/react';
import ProductFormComment from '../Components/ProductFormComment.jsx';
import DisplayAveraging from '../Components/DisplayAveraging.jsx';

function Product({name, content, price}){

    const location = useLocation();
    const informationUser = useContext(UserContext);
    const token = informationUser.token

    const [data,setData] = useState({status:false})

    // state pour la modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const displayModal = () => setShow(true)
        
    
    const displayComments = useCallback(
        () => {
            const currentPath = location.pathname;
            axios.get(`https://127.0.0.1:8000${currentPath}`)
                .then(res => setData({
                    status: true,
                    product: res.data.product,
                    comments: res.data.comments,
                    averaging: res.data.averaging,
                    rateNumber: res.data.rateNumber
                }))
        },
        [location])

    
    useEffect(() => {
        displayComments()
    }, [displayComments]);

    const handleReport = useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/api/comment/${e.target.id}`)
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        },
        [token])

    
    // gerer l'etat avant la réponse de l'api :
   
    return <Container className="d-flex flex-column justify-content-around">
        <TitleH1>{data.status ? data.product.name : name}</TitleH1>

        <ProductImageDescription image={data.status ? data.product.image : "holder.js/171x180"}>{data.status ? data.product.description : content}</ProductImageDescription> 
        <ProductStock stock={data.status ? data.product.stock : "chargement"}></ProductStock>
        {data.status ?  <DisplayAveraging rateNumber={data.rateNumber}>{data.averaging}</DisplayAveraging> : <div></div>}
        <ProductPriceAddShoppingCart price={data.status ? data.product.price : parseInt(price)}></ProductPriceAddShoppingCart>

       
        

        {informationUser.email === null && informationUser.token === null ? 
        <></>
        : 
        <>
            <div className="d-flex justify-content-center mt-5 mb-5">
                <h2 
                    css={css`
                        white-space: nowrap;
                    `}
                > Ecrire un commentaire :</h2>
            </div>
            <ProductFormComment reFetch={displayComments}></ProductFormComment>
        </>
        }





        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2>Les Commentaires postés : </h2>
        </div>

        <RedirectModal 
            show={show} 
            onHide={handleClose} 
            title="Action impossible"
            firstButton={<Link to="/Login"><Button variant="success">Connectez-vous à votre compte</Button></Link>}
            secondButton={<Link to="/Register"><Button variant="warning">Inscrivez-vous maintenant</Button></Link>}
        >Vous devez être connecté pour effectuer cette action.</RedirectModal>
    
        {data.status?
            data.comments.map(comment => <ProductComment key={comment.id} button={token != null ? <Button id={comment.id} variant="primary" onClick={handleReport}>Signaler</Button> : <Button variant="primary" onClick={displayModal}>Signaler</Button> } title={comment.title} pseudo={comment.username} content={comment.content} note={comment.note} date={comment.date}></ProductComment>)
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