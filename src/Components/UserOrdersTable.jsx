/** @jsxImportSource @emotion/react */
import React from "react";
import {Table,Row,Col } from "react-bootstrap";
import OrdersListUser from '../Components/OrdersListUser.jsx'
import SortDateButtons from '../Components/SortDateButtons.jsx';



function UserOrdersTable ({data}) {
    return <Table className="text-center" responsive hover>
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
}

export default UserOrdersTable;