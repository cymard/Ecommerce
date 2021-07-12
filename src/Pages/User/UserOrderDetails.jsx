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
import UserAlert from '../../Components/All/UserAlert.jsx';

function UserOrderDetails () {

    let { orderId } = useParams();
    const {token} = useContext(UserContext)
    axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})

    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })


    const getProducts = useCallback(
        () => {
            axios.get(`https://protected-taiga-91617.herokuapp.com/api/order/${orderId}/cart`)
            .then(function(response){
                setData({
                    status: true,
                    products: response.data.data
                })

                console.log(response.data.data);
            })
            .catch(function(error){
                if(error.response.status === 401){
                    setAlertState({
                        isOpen: true,
                        text: error.response.data.message,
                        variant: "danger"
                    });
                }else{
                    setAlertState({
                        isOpen: true,
                        text: " Une erreur est survenue lors de la récuperation des produits.",
                        variant: "danger"
                    });
                }
            })
        },[orderId]
    )

    const getOrderInformation = useCallback(
        () => {
            axios.get(`https://protected-taiga-91617.herokuapp.com/api/order/${orderId}`)
            .then(function(response){
                setInformationOrder({
                    status: true,
                    data: response.data.orderInformations
                })
            })
            .catch(function(error){
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Une erreur empêche de récuperer les informations de la commande.",
                    variant: "danger"
                });
            })
        },
        [orderId]
    )



    useEffect(()=>{
        getProducts()
        getOrderInformation()
    },[getProducts,getOrderInformation])

    return <>
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    
    <Container fluid
        css={css`
            min-height: 90vh;
        `}
    >
        <h1 className="text-center mt-4 mb-5">Détails de la commande</h1>

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
    </Container>
</>
}

export default UserOrderDetails;