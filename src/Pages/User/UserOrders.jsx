/** @jsxImportSource @emotion/react */
import React,{useEffect, useCallback, useContext, useState} from "react";
import { Container } from "react-bootstrap";
import TitleH1 from "../../Components/All/TitleH1.jsx";
import axios from 'axios'
import {UserContext} from '../../Components/Context/UserContext.jsx'
import {css} from '@emotion/react';
import {
    useLocation,
    useHistory,
    Link
} from "react-router-dom";
import UserOrdersTable from '../../Components/FrontOffice/UserOrdersTable.jsx';
import ReturnPaginationButtons from '../../Components/All/ReturnPaginationButtons.jsx';

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




    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let searchValue = query.get("date");

    const [allLinks, setAllLinks] = useState([])

    useEffect(() => {
        const links = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            // changer l'id dans l'url
            links.push(<Link key={i} to={`/api/orders?page=${i}&date=${searchValue}`}></Link>)
        }

        setAllLinks(links)
    }, [searchValue, data.totalPageNumber])

    return <Container
        css={css`
            min-height: 90vh;
        `}
    >
        <TitleH1>L'historique de mes commandes</TitleH1>
        <UserOrdersTable data={data}></UserOrdersTable>
        <ReturnPaginationButtons 
            totalPageNumber={data.totalPageNumber} 
            allLinks={allLinks}
        ></ReturnPaginationButtons>
    </Container>
    
}

export default UserOrders