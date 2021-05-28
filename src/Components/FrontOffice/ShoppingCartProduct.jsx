/** @jsxImportSource @emotion/react */
import React, {useState, useCallback, useContext} from 'react';
import { Row, Modal, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import axios from 'axios';
import {UserContext} from '../Context/UserContext.jsx';
import ShoppingCartProductImage from './ShoppingCartProductImage.jsx';
import ShoppingCartProductInformations from './ShoppingCartProductInformations.jsx';


function ShoppingCartProduct ({reFetch, image, title, price, quantity, id}) {
    
    const [quantityToBuy, setQuantityToBuy] = useState(quantity)

    const quantityToBuyChange = (e) => {
        setQuantityToBuy(e.target.value)
    }

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    const updateQuantity = useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/api/cart/product/${id}/quantity`,{
                "quantity" : quantityToBuy
            })
            .then(function (response){
                if(response.data.message){
                }else{
                    setShowModal(true);
                    setQuantityToBuy(response.data.number);
                }
                reFetch();
                
            })
            .catch(function (error) {
                console.log(error); 
            })
        },
        [token,quantityToBuy,id,reFetch]
    )

    const handleClickDelete = useCallback(
        (e) => {
            axios.delete(`https://127.0.0.1:8000/api/cart/product/${id}/delete`,{
                headers:{'Authorization': `Bearer ${token}`}
            })
            .then(function (response){
                reFetch()
            })
            .catch(function (error) {
                console.log(error); 
            })
        },
        [token,id,reFetch],
    )


    return <div className="d-flex mb-5" 
        css={css`
            width: 100%;

        `}
    >
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Erreur</Modal.Title>
            </Modal.Header>
            <Modal.Body>Impossible d'éffectuer cette action, La quantité demandée est supérieure au stock disponibles.</Modal.Body>
        </Modal>


        <Row
            css={css`
                height: 100%;
                width: 100%;
                margin: 0;
            `}
        >
            <ShoppingCartProductImage image={image} />
            
            <Col  
                css = {css`
                    height: 20px;
                `}
                sm={12}
                md={12}
                lg={1}
            ></Col>

            <ShoppingCartProductInformations
                title={title} 
                price={price} 
                quantityToBuy={quantityToBuy} 
                quantityToBuyChange={quantityToBuyChange} 
                updateQuantity={updateQuantity} 
                handleClickDelete={handleClickDelete}
            ></ShoppingCartProductInformations>
        </Row>
    </div>
}

ShoppingCartProduct.propTypes = {
    image : PropTypes.string,
    title : PropTypes.string,
    price : PropTypes.number
}

ShoppingCartProduct.defaultProps = {
    image : "holder.js/100px160",
    title : "Titre du produit",
    price : 10
}

export default ShoppingCartProduct;