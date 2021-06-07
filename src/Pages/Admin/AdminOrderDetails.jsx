/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserAdminContext} from "../../Components/Context/UserAdminContext.jsx";
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import {Container} from 'react-bootstrap';
import OrderIdentificationInformations from '../../Components/All/OrderIdentificationInformations.jsx';
import ProductsInformationsOfOrder from '../../Components/FrontOffice/ProductsInformationsOfOrder.jsx';
import PersonalOrderInformations from '../../Components/All/PersonalOrderInformations.jsx';
import CenteredSpinner from '../../Components/All/CenteredSpinner.jsx';

function AdminOrderDetails () {

    let { orderId } = useParams();

    const {token} = useContext(UserAdminContext);

    const [data, setData] = useState({status: false})
    const [informationOrder, setInformationOrder] = useState({status: false})
    axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}

    const getProducts = useCallback(
        () => {
            axios.get(`https://relaxed-sammet-0deed4.netlify.app/admin/order/${orderId}/cart`)
            .then(function(response){
                setData({
                    status: true,
                    products: response.data.data
                })
            })
            .catch(function(error){
                console.warn(error);
            })
        },
        [orderId]
    )

    const getInformationOrder = useCallback(
        () => {
            axios.get(`https://relaxed-sammet-0deed4.netlify.app/admin/order/${orderId}`)
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
            <h2 className="text-center mb-5">Les produits commandés :</h2>

            {informationOrder.status ? 
                <>
                <OrderIdentificationInformations informationOrder={informationOrder}></OrderIdentificationInformations>
                
                    {data.status === true ? 
                        <div className="d-flex justify-content-center">
                            {data.products.map(product => 
                                <ProductsInformationsOfOrder product={product} key={product.product.id}></ProductsInformationsOfOrder>
                            )}
                        </div>
                    : 
                        <CenteredSpinner></CenteredSpinner>
                    }
                

                <PersonalOrderInformations informationOrder={informationOrder}></PersonalOrderInformations>
                </>
            : 
                <CenteredSpinner></CenteredSpinner>
            }

        </Container>
    </div>
}

export default AdminOrderDetails;