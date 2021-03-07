/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
// import SortPriceButtons from '../Components/SortPriceButtons.jsx';
// import ProductsListAdmin from '../Components/ProductsListAdmin.jsx';
// import PaginationProductsAdmin from '../Components/PaginationProductsAdmin.jsx';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import OrdersListAdmin from '../Components/OrdersListAdmin.jsx';
// import {
//     useLocation,
//     useHistory
// } from "react-router-dom";

function Orders() {

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
        axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
        axios.get('https://127.0.0.1:8000/admin/orders')
        .then(function(response){
            console.log(response)
            setData({
                status: true,
                orders: response.data
            })
        })
        .catch(function(error){
            console.log(error)
        })
        
    },[token])

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

            <CategoryFilter></CategoryFilter>

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
                        <th>Status</th>
                        <th>Total</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Commande</th>
                    </tr>
                </thead>
                <tbody>


                    {data.status === true ?
                        // selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} data={data.productsList}
                    <OrdersListAdmin orders={data.orders} setSelectedOrders={setSelectedOrders} selectedOrders={selectedOrders}></OrdersListAdmin>
                    :  <tr><th>Chargement ...</th></tr>
                    }

                </tbody>
            </Table>
            <Button 
                variant="danger"
                // onClick={handleRemove}
            >Supprimer</Button>
            {/* <PaginationProductsAdmin setData={setData}  data={data} ></PaginationProductsAdmin> */}
        </Container>
    </div>
   
}

export default Orders;