/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import { Container } from "react-bootstrap";
import TitleH1 from "../Components/TitleH1.jsx";
import axios from 'axios'
import {UserContext} from '../Components/UserContext.jsx'
import {css} from '@emotion/react';
import {
    useLocation,
    useHistory
} from "react-router-dom";
import UserOrdersTable from '../Components/UserOrdersTable.jsx';
import PaginationButtons from '../Components/PaginationButtons.jsx';

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
        <UserOrdersTable data={data}></UserOrdersTable>
        <PaginationButtons isAdmin={false} isOrder={true} queryName={"search"} data={data}></PaginationButtons>
    </Container>
    
}

export default UserOrders