/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import React,{useCallback, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {UserAdminContext} from "../Components/UserAdminContext.jsx";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import {Table, Container,Card,Spinner, Form, Button} from 'react-bootstrap'


function OrderShoppingCart () {

    let { orderId } = useParams();
    const adminInformation = useContext(UserAdminContext)
    const token = adminInformation.token

    const [data, setData] = useState({status: false})

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
        [orderId,token])
    
    useEffect(()=>{
        getProducts()
    },[getProducts])

    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Administration</h1>

            <div className="d-flex">
            {data.status === true ? data.products.map(product => 
                <Card key={product.product.id} style={{ width: '18rem' }}>
                 <Card.Img variant="top" src="holder.js/100px180" />
                 <Card.Body>
                    <Card.Title>{product.product.name}</Card.Title>
                    <Card.Text>
                    {/* {product.product.description} */}
                        <div>prix : {product.product.price}€</div>
                        <div>quantité : {product.quantity}</div>
                    </Card.Text>
                     
                 </Card.Body>
             </Card>
                
                
            ) : <div><Spinner animation="border" /></div>}
           
            </div>
        </Container>
    </div>
}

export default OrderShoppingCart;