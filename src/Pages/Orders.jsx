/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
import SortPriceButtons from '../Components/SortPriceButtons.jsx';
import ProductsListAdmin from '../Components/ProductsListAdmin.jsx';
import PaginationProductsAdmin from '../Components/PaginationProductsAdmin.jsx';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";

function Orders() {
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
                                // onChange={handleClickSelectAll}
                                // checked={checkedSelectAll || selectedProducts.length === 9}
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
                    {/* {data.productsList.length > 0 ?
                    
                    <ProductsListAdmin selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} data={data.productsList}></ProductsListAdmin>
                    :  <tr><th>Chargement ...</th></tr>
                    } */}
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