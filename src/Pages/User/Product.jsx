/** @jsxImportSource @emotion/react */
import React, {useEffect, useState, useContext, useCallback} from 'react';
import { Container, Button} from 'react-bootstrap';
import ProductComment from '../../Components/FrontOffice/ProductComment.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import {useLocation} from "react-router-dom";
import {UserContext} from '../../Components/Context/UserContext.jsx';
import RedirectModal from '../../Components/All/RedirectModal.jsx';
import {Link, useParams} from "react-router-dom";
import {css} from '@emotion/react';
import ProductFormComment from '../../Components/FrontOffice/ProductFormComment.jsx';
import ProductInformations from "../../Components/FrontOffice/ProductInformations.jsx";

function Product({name, content, price}){

    const location = useLocation();
    const informationUser = useContext(UserContext);
    const token = informationUser.token

    const [data,setData] = useState({status:false})

    const [informationProduct, setInformationProduct] = useState({status: false})

    let { id } = useParams();

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
                    averaging: res.data.arrayAveraging,
                    rateNumber: res.data.rateNumber
                }))
                .catch(function(error){
                    console.log(error)
                })
        },
        [location])

    const getInformationProduct = useCallback(
        () => {
            axios.get(`https://127.0.0.1:8000/product/${id}`)
            .then(function(response){
                setInformationProduct({
                    status: true,
                    stock: response.data.product.stock
                })
            })
            .catch(function(error){
                console.log(error)
            })
        },
        [id])
    
    useEffect(() => {
        displayComments()
        getInformationProduct()
    }, [displayComments,getInformationProduct]);

    const handleReport = useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/api/comment/${e.target.id}`)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        [token])


    return <Container className="d-flex flex-column justify-content-around"
        css={css`
            min-height: 90vh;
        `}
    >
        <ProductInformations content={content} price={price} name={name} data={data} informationProduct={informationProduct}></ProductInformations>

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
            <h2 className="text-center">Les commentaires postés : </h2>
        </div>

        <RedirectModal 
            show={show} 
            onHide={handleClose} 
            firstButton={<Link to="/Login"><Button variant="success">Connectez-vous à votre compte</Button></Link>}
            secondButton={<Link to="/Register"><Button variant="warning">Inscrivez-vous maintenant</Button></Link>}
        >
            Vous devez être connecté pour effectuer cette action.
        </RedirectModal>
    
        {data.status?
            data.comments.map(comment => <ProductComment key={comment.id} buttons={token != null ? <Button className="w-100" id={comment.id} variant="primary" onClick={handleReport}>Signaler</Button> : <Button className="w-100" variant="primary" onClick={displayModal}>Signaler</Button> } title={comment.title} pseudo={comment.username} content={comment.content} note={comment.note} date={comment.date}></ProductComment>)
        :
            <div>chargement...</div>
        }
        
    </Container>
}

Product.defaultProps = {
    name : "Nom de l'objet",
    content : "Description de l'objet",
    price : 10
}

Product.propTypes = {
    name : PropTypes.string,
    content : PropTypes.string,
    price : PropTypes.number
}

export default Product;