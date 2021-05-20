/** @jsxImportSource @emotion/react */
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserContext} from "../Components/UserContext.jsx";
import { Container } from 'react-bootstrap';
import {css} from '@emotion/react';
import CenteredSpinner from '../Components/CenteredSpinner.jsx';
import OrderIdentificationInformations from '../Components/OrderIdentificationInformations.jsx';
import ProductsInformationsOfOrder from '../Components/ProductsInformationsOfOrder.jsx';
import PersonalOrderInformations from '../Components/PersonalOrderInformations.jsx';

function UserOrderDetails () {

    let { orderId } = useParams();
    const userInformation = useContext(UserContext)
    const token = userInformation.token
    axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})

    const [errorMessage, setErrorMessage] = useState({status : false})

    const getProducts = useCallback(
        () => {
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
        [orderId]
    )

    const getInformationOrder = useCallback(
        () => {
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
        [orderId]
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
                // error message
                <p 
                    css={css`
                        color: red;
                        text-align: center;
                        font-size: 20px;
                        padding: 100px;
                    `}
                >
                    {errorMessage.message}
                </p>
            :
                <>
                <h2 className="text-center mb-5">Les produits commandés : </h2>

                {informationOrder.status && data.status ? 
                    <>
                    <OrderIdentificationInformations informationOrder={informationOrder}></OrderIdentificationInformations>
                    <div className="d-flex justify-content-center flex-wrap">
                        {data.products.map(product => 
                            <ProductsInformationsOfOrder product={product} key={product.product.id}></ProductsInformationsOfOrder>
                        )}
                    </div>
                    <PersonalOrderInformations informationOrder={informationOrder}></PersonalOrderInformations>
                    </>
                : 
                    <CenteredSpinner></CenteredSpinner>
                }
                </>
            }     
    </Container>

}

export default UserOrderDetails;