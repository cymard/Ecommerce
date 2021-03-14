/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserContext} from "../Components/UserContext.jsx";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import {Table, Container,Card,Spinner, Form, Button} from 'react-bootstrap'


function UserOrderDetails () {

    let { orderId } = useParams();
    const userInformation = useContext(UserContext)
    const token = userInformation.token

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})

    const getProducts = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/api/order/${orderId}/cart`)
            .then(function(response){
                console.log(response);
                setData({
                    status: true,
                    products: response.data.data
                    
                })
            })
            .catch(function(error){
                console.log(error);
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
                    // stringCardNumber: response.data.orderInformations.cardNumber.toString()
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

    return <Container fluid>
            <h1 className="text-center mt-4 mb-5">Détails de la commande</h1>

            <h2 className="text-center mb-5">Les produits commandés : </h2>

            <div className="d-flex justify-content-center flex-wrap">
                {data.status === true ? data.products.map(product => 
                    <Card className="mr-2 ml-2 mb-4"  key={product.product.id} style={{ minWidth: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{product.product.name}</Card.Title>
                            <Card.Text>
                            {/* {product.product.description} */}
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
                    <Card>
                        <Card.Body>
                            <Card.Title>Identité de l'acheteur</Card.Title>
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
                            <Card.Title>Mode de paiement</Card.Title>
                            <Card.Text>
                                Mode de Paiement : {informationOrder.data.paymentMethod}
                                <br/>
                                {/* Numéro de la Carte :  ***{informationOrder.stringCardNumber.substr(-3)} */}
                                Numéro de la Carte :  {informationOrder.data.cardNumber}
                                <br/>
                                Propriétaire de la Carte :  {informationOrder.data.cardName}
                                <br/>
                                Date d'expiration de la Carte : {informationOrder.data.cardExpirationDate}
                            </Card.Text>
                            <Card.Title>Autres informations</Card.Title>
                            <Card.Text>
                                Date de la Commande : {informationOrder.data.createdDate}
                                <br/>
                                Montant de la Commande :  {informationOrder.data.amount}€
                                <br/>
                                Numéro de la Commande :  {informationOrder.data.id}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                :
                    <div><Spinner animation="border" /></div>
                }     
            </div>
    </Container>

}

export default UserOrderDetails;