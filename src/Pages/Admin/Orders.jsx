/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react'
import {css} from '@emotion/react';
import {Container, Button} from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import SearchBar from '../../Components/BackOffice/SearchBar.jsx';
import ReturnPaginationButtons from '../../Components/All/ReturnPaginationButtons.jsx';
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import {
    useLocation,
    useHistory,
    Link
} from "react-router-dom";
import OrdersTable from '../../Components/BackOffice/OrdersTable.jsx';

function Orders() {
    let location = useLocation();
    let history = useHistory();

    // selectionner ou pas le checkbox selectAll
    const [checkedSelectAll, setCheckedSelectAll] = useState();

    // tableau des commandes selectionnées
    const [selectedOrders, setSelectedOrders] = useState([])

    const [data, setData] = useState({status: false})

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token;

    useEffect(() => {
        // si les 9 sont selectionnés alors select all
        setCheckedSelectAll(selectedOrders.length === 9);
    }, [selectedOrders])


    const getOrders = useCallback(()=>{
        if(location.pathname === "/admin/orders" && location.search === "" ){ //redirection en cas de mauvaise url
            history.push('/admin/orders?page=1&search=')
        }else{

            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/admin/orders${location.search}`)
            .then(function(response){
                setData({
                    status: true,
                    orders: response.data.pageContent,
                    allOrdersNumber: response.data.allOrdersNumber,
                    ordersPerPage: response.data.ordersPerPage,
                    totalPageNumber: response.data.totalPageNumber
                })
            })
            .catch(function(error){
                console.log(error)
            })

        }
        
    },[token, location, history])

    useEffect(()=>{
        getOrders()
    }
    ,[getOrders])

    const handleClickSelectAll = (e) => {
        if(e.target.checked === true){
            // select all selectionne toutes les commandes
            setSelectedOrders(data.orders.map(order => order.id));
            setCheckedSelectAll(true)
        }else{
            setSelectedOrders([]);
            setCheckedSelectAll(false)
        }
    }

    // Pagination Buttons
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let search = query.get("search")
    
    const [allLinks, setAllLinks] = useState([])

    useEffect(() => {
        const links = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            // changer l'id dans l'url
            links.push(<Link key={i} to={`/admin/orders?page=${i}&search=${search}`}></Link>)
        }

       setAllLinks(links)
    }, [search, data.totalPageNumber])


    // Search bar
    const [searchValue, setSearchValue] = useState('');
    const HistoryPushPathname = '/admin/orders';

    const changeSearchValue = (e) => {
        setSearchValue(e.target.value)
    }

    const handleClearSearch = () => {
        setSearchValue('');
        history.push({
            pathname: HistoryPushPathname,
            search: `?page=1&search=`
        })
    }

    const handleSubmit = () => {
        history.push({
            pathname: HistoryPushPathname,
            search: `?page=1&search=${searchValue}`
        })
    }



    return <div     
        css={css`
            
            display: flex;
        `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Administration</h1>

            <SearchBar 
                handleSubmit={handleSubmit} 
                handleClearSearch={handleClearSearch}
                searchValue={searchValue}
                changeSearchValue={changeSearchValue}
            />
            
            <OrdersTable
                data={data}
                handleClickSelectAll={handleClickSelectAll} 
                checkedSelectAll={checkedSelectAll} 
                selectedOrders={selectedOrders} 
                setSelectedOrders={setSelectedOrders}
            ></OrdersTable>

            <Button 
                variant="danger"
            >
                Supprimer
            </Button>

            {data.status === true && data.allOrdersNumber !== 0 ? 
                <ReturnPaginationButtons 
                    allLinks={allLinks}
                    totalPageNumber={data.totalPageNumber}
                ></ReturnPaginationButtons>
            :
                <></>
            }
            
        </Container>
    </div> 
}

export default Orders;