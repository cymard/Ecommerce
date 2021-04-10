/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserAdminContext} from "../Components/UserAdminContext.jsx";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import {Container,Card,Spinner} from 'react-bootstrap'
import screen from '../images/screen.jpg';


function AdminOrderDetails () {

    let { orderId } = useParams();
    const adminInformation = useContext(UserAdminContext)
    const token = adminInformation.token

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})

    const getProducts = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/admin/order/${orderId}/cart`)
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
            axios.get(`https://127.0.0.1:8000/admin/order/${orderId}`)
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

    return <div     
    
    css={css`
        min-height: 90vh;
        display: flex;
    `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Détails de la commande</h1>
            <h2 className="text-center mb-5">Les produits commandés : </h2>

            {informationOrder.status ? 
                <div className="d-flex justify-content-center mb-5 ">
                    <Card className="p-3">
                        <p>Date de la Commande :  <span
                            css={css`
                                font-size: 20px;
                            `}
                        >{informationOrder.data.createdDate}</span>  </p> 
                        <br/>
                        <p>Montant de la Commande : <span
                            css={css`
                                font-size: 20px;
                            `}
                        >{informationOrder.data.amount}€</span> </p>
                        <br/>
                        <p>Numéro de la Commande :  <span
                            css={css`
                                font-size: 20px;
                            `}
                        >{informationOrder.data.id}</span>  </p> 
                    </Card>
                </div>
                
            : 
                <div><Spinner animation="border" /></div>
            }

            <div className="d-flex justify-content-center">
            {data.status === true ? data.products.map(product => 
                <Card className="mr-2 ml-2"  key={product.product.id} style={{ width: '18rem' }}>
                    <Card.Img 
                        variant="top"
                        src={product.product.image || screen} 
                        css={css`
                            max-height: 200px;
                        `}    
                    />
                    <Card.Body>
                        <Card.Title className="text-center">{product.product.name}</Card.Title>
                        <Card.Text>
                        {/* {product.product.description} */}
                            prix : {product.product.price}€
                            <br/>
                            quantité : {product.quantity}
                        </Card.Text>
                            
                    </Card.Body>
                </Card>
                
                
            ) : <div><Spinner animation="border" /></div>}
           
            </div>

            <h2 className="text-center mt-5 mb-5">Les informations liées à la commande : </h2>
            
            <div className="d-flex justify-content-center mb-5">
            { informationOrder.status ? 
            <Card>
            <Card.Body>
                <Card.Title className="font-weight-bold">Identité de l'acheteur</Card.Title>
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
                <Card.Title className="font-weight-bold mt-5">Mode de paiement</Card.Title>
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
            </Card.Body>
        </Card>
            
                
            :
            <div><Spinner animation="border" /></div>
            }
                
            </div>
            
        </Container>
    </div>
}

export default AdminOrderDetails;