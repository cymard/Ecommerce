/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import { Container, Table,Row,Col } from "react-bootstrap";
import TitleH1 from "../Components/TitleH1.jsx";
import axios from 'axios'
import {UserContext} from '../Components/UserContext.jsx'
import OrdersListUser from '../Components/OrdersListUser.jsx'
import PaginationOrdersUser from '../Components/PaginationOrdersUser.jsx';
import SortDateButtons from '../Components/SortDateButtons.jsx';
import {css} from '@emotion/react';
import {
    useLocation,
    useHistory
} from "react-router-dom";

function UserOrders (){

    let history = useHistory();
    const location = useLocation();

    const userInformation = useContext(UserContext);
    const token = userInformation.token;

    const [data, setData] = useState({status: false})

    const getUserOrders = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
            .then(function(response){
                setData({
                    status: true,
                    orders: response.data.pageContent,
                    ordersPerPage : response.data.ordersPerPage,
                    allOrdersNumber : response.data.allOrdersNumber,
                    totalPageNumber : response.data.totalPageNumber                
                })
            })
            .catch(function(error){
                console.log(error)
            })
        },
        [token,location]
    )

    useEffect(() => {
        if(location.pathname === "/api/orders" && location.search === "" ){ // redirection en cas de mauvaise url
            history.push('https://127.0.0.1:8000/api/orders?page=1&date=desc')
        }else{
            getUserOrders();
        }
        
    }, [getUserOrders, location, history])

    return <Container
        css={css`
            min-height: 90vh;
        `}
    >
        <TitleH1>L'historique de mes commandes</TitleH1>

        
        <Table className="text-center" responsive hover>
            <thead>
                <tr>
                    <th>N° </th>
                    <th>
                        <Row >
                            <Col className="d-flex justify-content-center align-items-center">Commande éffectuée le<SortDateButtons></SortDateButtons></Col>
                        </Row>
                    </th>
                    <th>Total</th>
                    <th>Détails de la commande</th>
                </tr>
            </thead>
            <tbody>
                {data.status 
                ?
                    <OrdersListUser orders={data.orders}></OrdersListUser>
                :  
                    <tr><th>Chargement ...</th></tr>
                }
            </tbody>
        </Table>

        <PaginationOrdersUser setData={setData}  data={data}></PaginationOrdersUser>
    </Container>
    
}

export default UserOrders