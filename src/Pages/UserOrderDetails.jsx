/** @jsxImportSource @emotion/react */
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserContext} from "../Components/UserContext.jsx";
import {Container,Card,Spinner} from 'react-bootstrap';
import {css} from '@emotion/react';
import screen from '../images/screen.jpg';

function UserOrderDetails () {

    let { orderId } = useParams();
    const userInformation = useContext(UserContext)
    const token = userInformation.token

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})

    const [errorMessage, setErrorMessage] = useState({status : false})

    const getProducts = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/api/order/${orderId}/cart`)
            .then(function(response){
                setData({
                    status: true,
                    products: response.data.data
                })
            })
            .catch(function(error){
                if(error.response.status === 401){
                    setErrorMessage({
                        status: true, 
                        message: error.response.data.message
                    })
                }
            })
        },
        [orderId,token]
    )

    const getInformationOrder = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/api/order/${orderId}`)
            .then(function(response){
                console.log(response.data.orderInformations.cardNumber);
                setInformationOrder({
                    status: true,
                    data: response.data.orderInformations
                })
            })
            .catch(function(error){
                console.log(error);
            })
        },
        [orderId,token]
    )



    useEffect(()=>{
        getProducts()
        getInformationOrder()
    },[getProducts,getInformationOrder])

    return <Container fluid
        css={css`
            min-height: 90vh;
        `}
    >
            <h1 className="text-center mt-4 mb-5">Détails de la commande</h1>

            {errorMessage.status === true ? 
                <p 
                    css={css`
                        color: red;
                        text-align: center;
                        font-size: 20px;
                        padding: 100px;
                    `}
                >{errorMessage.message}</p>
            :
                <>
                <h2 className="text-center mb-5">Les produits commandés : </h2>

                {informationOrder.status ? 
                    <div className="d-flex justify-content-center mb-5 ">
                        <Card className="p-3">
                            <p>
                                Date de la Commande :  
                                <span
                                    css={css`
                                        font-size: 20px;
                                    `}
                                >
                                {informationOrder.data.createdDate}
                                </span>  
                            </p> 
                            <br/>
                            <p>
                                Montant de la Commande : 
                                <span
                                    css={css`
                                        font-size: 20px;
                                    `}
                                >
                                    {informationOrder.data.amount}€
                                </span> 
                            </p>
                            <br/>
                            <p>
                                Numéro de la Commande :  
                                <span
                                    css={css`
                                        font-size: 20px;
                                    `}
                                >
                                    {informationOrder.data.id}
                                </span>  
                            </p> 
                        </Card>
                    </div>
                    
                : 
                    <div><Spinner animation="border" /></div>
                
                }


                <div className="d-flex justify-content-center flex-wrap">
                    {data.status === true ? data.products.map(product => 
                        <Card className="mr-2 ml-2 mb-4"  key={product.product.id} style={{ minWidth: '18rem' }}>
                            <Card.Img  
                                css={css`
                                    max-height: 200px;
                                    max-width: 18rem;
                                `}
                                variant="top" 
                                src={product.product.image || screen} 
                            />
                            <Card.Body>
                                <Card.Title className="text-center">{product.product.name}</Card.Title>
                                <Card.Text>
                                    prix : {product.product.price}€
                                    <br/>
                                    quantité : {product.quantity}
                                </Card.Text>
                            </Card.Body>
                        </Card>) 
                    : 
                        <div><Spinner animation="border" /></div>
                    }
                </div>

                
                <h2 className="text-center mt-5 mb-5">Les informations liées à la commande : </h2>
            
                <div className="d-flex justify-content-center mb-5">
                    {informationOrder.status ? 
                        <Card className="mb-5">
                            <Card.Body>
                                <Card.Title  className="font-weight-bold">Identité de l'acheteur</Card.Title>
                                <Card.Text>
                                    Prénom : {informationOrder.data.firstName}
                                    <br/>
                                    Nom : {informationOrder.data.lastName}
                                    <br/>
                                    Email : {informationOrder.data.email}
                                    <br/>
                                    Ville : {informationOrder.data.city}
                                    <br/>
                                    Adresse : {informationOrder.data.address}
                                </Card.Text>
                                <Card.Title className="mt-5 font-weight-bold">Mode de paiement</Card.Title>
                                <Card.Text>
                                    Mode de Paiement : {informationOrder.data.paymentMethod}
                                    <br/>
                                    Numéro de la Carte :  {informationOrder.data.cardNumber}
                                    <br/>
                                    Propriétaire de la Carte :  {informationOrder.data.cardName}
                                    <br/>
                                    Date d'expiration de la Carte : {informationOrder.data.cardExpirationDate}
                                </Card.Text>                            
                            </Card.Body>
                        </Card>
                    :
                        <div><Spinner animation="border" /></div>
                    }     
                </div>
                </>
            }     
    </Container>

}

export default UserOrderDetails;