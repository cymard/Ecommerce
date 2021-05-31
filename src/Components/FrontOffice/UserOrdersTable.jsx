import React from "react";
import {Table,Row,Col } from "react-bootstrap";
import OrdersListUser from './OrdersListUser.jsx'
import SortDateButtons from './SortDateButtons.jsx';
import PropTypes from 'prop-types';


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

UserOrdersTable.propTypes = {
    data : PropTypes.object.isRequired
}

export default UserOrdersTable;