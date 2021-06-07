/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import { Container } from "react-bootstrap";
import Title from "../../Components/All/Title.jsx";
import axios from 'axios'
import {UserContext} from '../../Components/Context/UserContext.jsx'
import {css} from '@emotion/react';
import {
    useLocation,
    useHistory
} from "react-router-dom";
import UserOrdersTable from '../../Components/FrontOffice/UserOrdersTable.jsx';
import PaginationButtons from '../../Components/All/PaginationButtons.jsx';

function UserOrders (){

    let history = useHistory();
    const location = useLocation();

    const {token} = useContext(UserContext);

    const [data, setData] = useState({status: false})

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let queryDateValue = query.get("date");
    let queryPageValue = query.get("page");

    const getUserOrders = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get(`https://relaxed-sammet-0deed4.netlify.app/api/orders?page=${queryPageValue}&date=${queryDateValue}`)
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
                console.warn(error)
            })
        },[token, queryPageValue, queryDateValue]
    )



    useEffect(() => {
        if(location.pathname === "/api/orders" && location.search === "" ){ // redirection en cas de mauvaise url
            history.push('https://relaxed-sammet-0deed4.netlify.app/api/orders?page=1&date=desc')
        }else{
            getUserOrders();
        }
        
    }, [getUserOrders, location, history])

    const [allPageUris, setAllPageUris] = useState([])

    useEffect(() => {
        const uris = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            // changer l'id dans l'url
            uris.push({
                uri: `/api/orders?page=${i}&date=${queryDateValue}`,
                key: i
            })
        }

        setAllPageUris(uris)
    }, [queryDateValue, data.totalPageNumber])

    return <Container
        css={css`
            min-height: 90vh;
        `}
    >
        <Title>L'historique de mes commandes</Title>
        <UserOrdersTable data={data}></UserOrdersTable>
        <PaginationButtons 
            totalPageNumber={data.totalPageNumber} 
            allPageUris={allPageUris}
            pageValue={queryPageValue}
        ></PaginationButtons>
    </Container>
    
}

export default UserOrders