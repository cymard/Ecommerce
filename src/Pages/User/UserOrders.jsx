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
import UserAlert from '../../Components/All/UserAlert.jsx';

function UserOrders (){

    let history = useHistory();
    const location = useLocation();

    const {token} = useContext(UserContext);

    const [data, setData] = useState({status: false})
    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let queryDateValue = query.get("date");
    let queryPageValue = query.get("page");

    const getUserOrders = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/api/orders?page=${queryPageValue}&date=${queryDateValue}`)
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
                setAlertState({
                    isOpen: true,
                    text: "Une erreur empêche de récuperer les informations des commandes de l'utilisateur.",
                    variant: "danger"
                });
            })
        },[token, queryPageValue, queryDateValue]
    )



    useEffect(() => {
        if(location.pathname === "/api/orders" && location.search === "" ){ // redirection en cas de mauvaise url
            history.push('https://127.0.0.1:8000/api/orders?page=1&date=desc')
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

    return <>
     <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <Container
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
    </>
}

export default UserOrders