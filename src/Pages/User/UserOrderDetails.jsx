/** @jsxImportSource @emotion/react */
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserContext} from "../../Components/Context/UserContext.jsx";
import { Container } from 'react-bootstrap';
import {css} from '@emotion/react';
import CenteredSpinner from '../../Components/All/CenteredSpinner.jsx';
import OrderIdentificationInformations from '../../Components/All/OrderIdentificationInformations.jsx';
import ProductsInformationsOfOrder from '../../Components/FrontOffice/ProductsInformationsOfOrder.jsx';
import PersonalOrderInformations from '../../Components/All/PersonalOrderInformations.jsx';

function UserOrderDetails () {

    let { orderId } = useParams();
    const {token} = useContext(UserContext)
    axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})
    const [isError, setIsError] = useState({status : false})

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
                    setIsError({
                        status: true, 
                        message: error.response.data.message
                    })
                }
            })
        },[orderId]
    )

    const getOrderInformation = useCallback(
        () => {
            axios.get(`https://127.0.0.1:8000/api/order/${orderId}`)
            .then(function(response){
                setInformationOrder({
                    status: true,
                    data: response.data.orderInformations
                })
            })
            .catch(function(error){
                console.warn(error);
            })
        },
        [orderId]
    )



    useEffect(()=>{
        getProducts()
        getOrderInformation()
    },[getProducts,getOrderInformation])

    return <Container fluid
        css={css`
            min-height: 90vh;
        `}
    >
            <h1 className="text-center mt-4 mb-5">Détails de la commande</h1>

            {isError.status ? 
                // error message
                <p 
                    css={css`
                        color: red;
                        text-align: center;
                        font-size: 20px;
                        padding: 100px;
                    `}
                >
                    {isError.message}
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