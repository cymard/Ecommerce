/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import SearchBar from '../Components/SearchBar.jsx';
import PaginationOrdersAdmin from '../Components/PaginationOrdersAdmin.jsx';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import OrdersListAdmin from '../Components/OrdersListAdmin.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";

function Orders() {
    let location = useLocation();
    let history = useHistory();


    // selectionner ou pas le checkbox selectAll
    const [checkedSelectAll, setCheckedSelectAll] = useState();

    // tableau des commandes selectionnées
    const [selectedOrders, setSelectedOrders] = useState([])

    // data
    const [data, setData] = useState({status: false})

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token;

    useEffect(() => {
        // si les 9 sont selectionnés alors 
        setCheckedSelectAll(selectedOrders.length === 9);
    }, [selectedOrders])


    const getOrders = useCallback(()=>{
        if(location.pathname === "/admin/orders" && location.search === "" ){ //redirection en cas de mauvaise url
            history.push('/admin/orders?page=1&search=default')
        }else{

            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000/admin/orders${location.search}`)
            .then(function(response){
                console.log(response)
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
            // toutes les commandes sont séléctionnés 
            setSelectedOrders(data.orders.map(order => order.id));
            setCheckedSelectAll(true)


        }else{
            setSelectedOrders([]);
            setCheckedSelectAll(false)
            
        }
    }


    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Administration</h1>

            <SearchBar reFetch={getOrders}></SearchBar>

            <Table className="text-center" hover>
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                type="checkbox"
                                id="selectAll"
                                onChange={handleClickSelectAll}
                                checked={checkedSelectAll || selectedOrders.length === 9}
                                label=""
                                custom
                            />        
                        </th>
                        <th>Id</th>
                        <th>Status du Paiement</th>
                        <th>Total</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Commande</th>
                    </tr>
                </thead>
                <tbody>

                    {data.status === true && data.allOrdersNumber !== 0?
                        // selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} data={data.productsList}
                    <OrdersListAdmin orders={data.orders} setSelectedOrders={setSelectedOrders} selectedOrders={selectedOrders}></OrdersListAdmin>
                    :  <tr><th>Aucune commande trouvée </th></tr>
                    }

                </tbody>
            </Table>
            <Button 
                variant="danger"
                // onClick={handleRemove}
            >Supprimer</Button>
            {data.status === true && data.allOrdersNumber !== 0? 
                <PaginationOrdersAdmin setData={setData}  data={data} ></PaginationOrdersAdmin>
            :
            <></>
            }
            
        </Container>
    </div>
   
}

export default Orders;