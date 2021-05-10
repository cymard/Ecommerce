/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserAdminContext} from "../Components/UserAdminContext.jsx";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import {Container,Spinner} from 'react-bootstrap';
import OrderIdentificationInformations from '../Components/OrderIdentificationInformations.jsx';
import ProductsInformationsOfOrder from '../Components/ProductsInformationsOfOrder.jsx';
import PersonalOrderInformations from '../Components/PersonalOrderInformations.jsx';

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
                <OrderIdentificationInformations informationOrder={informationOrder}></OrderIdentificationInformations>
            : 
                <div><Spinner animation="border" /></div>
            }

            <div className="d-flex justify-content-center">

                {data.status === true 
                ? 
                data.products.map(product => 
                    <ProductsInformationsOfOrder product={product}></ProductsInformationsOfOrder>
                ) 
                : 
                <div><Spinner animation="border" /></div>}
           
            </div>

            <h2 className="text-center mt-5 mb-5">Les informations liées à la commande : </h2>
            
            <div className="d-flex justify-content-center mb-5">
                { informationOrder.status 
                ? 
                    <PersonalOrderInformations informationOrder={informationOrder}></PersonalOrderInformations>
                :
                    <div><Spinner animation="border" /></div>
                }  
            </div>
            
        </Container>
    </div>
}

export default AdminOrderDetails;