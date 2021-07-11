
/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react'
import {css} from '@emotion/react';
import {Container, Button} from 'react-bootstrap';
import axios from 'axios';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import SearchBar from '../../Components/BackOffice/SearchBar.jsx';
import PaginationButtons from '../../Components/All/PaginationButtons.jsx';
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";
import OrdersTable from '../../Components/BackOffice/OrdersTable.jsx';
import UserAlert from '../../Components/All/UserAlert.jsx';

function Orders() {
    
    let location = useLocation();
    let history = useHistory();

    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })
    
    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )

    // selectionner ou pas le checkbox selectAll
    const [checkedSelectAll, setCheckedSelectAll] = useState();

    // tableau des commandes selectionnées
    const [selectedOrders, setSelectedOrders] = useState([])

    const [data, setData] = useState({status: false})

    const {token} = useContext(UserAdminContext);

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    let querySearchValue = query.get("search");
    let queryPageValue = query.get("page");

    useEffect(() => {
        // si les 9 sont selectionnés alors select all
        setCheckedSelectAll(selectedOrders.length === 9);
    }, [selectedOrders])


    const getOrders = useCallback(()=>{
        if(location.pathname === "/admin/orders" && location.search === "" ){ //redirection en cas de mauvaise url
            history.push('/admin/orders?page=1&search=')
        }else{

            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://relaxed-sammet-0deed4.netlify.app/admin/orders?page=${queryPageValue}&search=${querySearchValue}`)
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
                console.warn(error)
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la récuperation des commandes.",
                    variant: "danger"
                });
            })

        }
        
    },[token, location, history, querySearchValue, queryPageValue])

    useEffect(()=>{
        getOrders()
    },[getOrders])

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

    // Buttons Pagination
    
    const [allPageUris, setAllPageUris] = useState([])

    useEffect(() => {
        const uris = []

        for(let i = 1;i<=data.totalPageNumber; i++){
            // changer l'id dans l'url
            uris.push(`/admin/orders?page=${i}&search=${querySearchValue}`)
        }

       setAllPageUris(uris)
    }, [querySearchValue, data.totalPageNumber])


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

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push({
            pathname: HistoryPushPathname,
            search: `?page=1&search=${searchValue}`
        })
    }


    const handleDelete = useCallback(
        () => {
            axios.delete(`https://relaxed-sammet-0deed4.netlify.app/admin/order`,{
                data:{
                    selectedOrders
                }
            })
            .then(function (response){
                // déselectionner checkbox
                setSelectedOrders([])
                setAlertState({
                    isOpen: true,
                    text: "Commande(s) supprimée(s).",
                    variant: "success"
                });
                closeAlert();
                history.push('/admin/orders?page=1&search=');
                
            })
            .catch(function (error) {
                console.warn(error); 
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la suppression de commande.",
                    variant: "danger"
                });
            })
        },[closeAlert, history, selectedOrders]
    )

    



    return <> 
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <div     
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
                onClick={handleDelete}
            >
                Supprimer
            </Button>

            {data.status === true && data.allOrdersNumber !== 0 &&
                <PaginationButtons 
                    allPageUris={allPageUris} 
                    totalPageNumber={data.totalPageNumber}
                    pageValue={queryPageValue}
                ></PaginationButtons>
            }
            
        </Container>
    </div> 
    </>
}

export default Orders;