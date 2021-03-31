/** @jsxImportSource @emotion/react */
import React, {useState, useCallback, useContext} from 'react';
import { Button ,Row, Form, Modal, Col,Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {css} from '@emotion/react';
import axios from 'axios';
import {UserContext} from './UserContext.jsx';
import screen from '../images/screen.jpg';




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
    const email = informationUser.email;


    const updateQuantity = useCallback(
        (e) => {
            // axios pour changer la quantité
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/api/cart/product/${id}/quantity`,{
                "quantity" : quantityToBuy
            })
            .then(function (response){
                // handle success
                console.log(response.data);
                if(response.data.message){
                    console.log("cool");
                }else{
                    console.log("probleme");
                    setShowModal(true);
                    setQuantityToBuy(response.data.number);
                }
                reFetch();
                
            })
            .catch(function (error) {
                // handle error
                console.log(error); 
            })
        },
        [token,email,quantityToBuy,id]
    )

    const handleClickDelete = useCallback(
        (e) => {
            axios.delete(`https://127.0.0.1:8000/api/cart/product/${id}/delete`,{
                headers:{'Authorization': `Bearer ${token}`}
            })
            .then(function (response){
                // handle success
                console.log(response.data);
                reFetch()
            })
            .catch(function (error) {
                // handle error
                console.log(error); 
            })
        },
        [token,email,id],
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
            <Col
                sm={12}
                md={12}
                lg={4}
                className="d-flex justify-content-center p-0"

            >
                <Image 
                    css={css`
                        height: 318px;
                        width: 318px;
                    `}
                    src={image || screen} 
                    rounded 
                />
            </Col>

            <Col  
                css = {css`
                    height: 20px;
                `}
                sm={12}
                md={12}
                lg={1}
            ></Col>

            <Col
                css={css`
                    display: flex;
                    flex-direction: column;
                    border: solid #DFDFDF 1px;
                    border-radius: 5px;
                    min-height: 318px;
                `}
                sm={12}
                md={12}
                lg={7}
            >
                <Row 
                    css={css`
                       height: 40%;
                    `}
                >
                    <Col className="text-center pt-2" lg={5} sm={12}>
                        <h2>{title}</h2>
                    </Col>    
                    <Col lg={4} sm={0}></Col>
                    <Col className="text-center pt-2" lg={3} sm={12} >
                        <p 
                            css={css`
                                font-size: 20px;
                            `}
                        >Prix : {price} €</p>
                    </Col> 
                </Row>   
                <Row 
                    css={css`
                        height: 40%;
                    `}
                >
                    <Col lg={3} sm={0}></Col>
                    <Col lg={7} md={12} sm={12}>
                        <Form 
                            css={css`
                                width: 100%;
                            `}
                        >
                            <Form.Group 
                                css={css`
                                    width: 100%;
                                    display: flex;
                                    justify-content: center;
                                `}
                            >
                                <Form.Label 
                                    css={css`
                                        fontSize : 1.2em;
                                    `}
                                >
                                    Quantité : 
                                </Form.Label>
                                <Form.Control id="quantityToBuy" value={quantityToBuy} onChange={quantityToBuyChange} className="ml-3 mr-3" type="text" 
                                    css={css`
                                        width: 60px;
                                    `}
                                    
                                />
                                <Button onClick={updateQuantity}>Mettre à jour</Button>
                            </Form.Group>
                        </Form>    

                    </Col>
                    <Col lg={2} sm={0}></Col>

                </Row> 
                <Row className="h-auto d-flex justify-content-center">
                    <Button
                        variant="danger" 
                        css={css`
                            height : 40px;
                        `}
                        onClick={handleClickDelete}
                    >
                        Supprimer
                    </Button>    
                </Row>  
            </Col>            
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