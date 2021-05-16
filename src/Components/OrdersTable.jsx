import React from 'react'
import {Table, Form} from 'react-bootstrap'
import OrdersListAdmin from '../Components/OrdersListAdmin.jsx';

function OrdersTable ({data, handleClickSelectAll, checkedSelectAll, selectedOrders, setSelectedOrders}) {
    return <Table className="text-center" hover>
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
            <OrdersListAdmin orders={data.orders} setSelectedOrders={setSelectedOrders} selectedOrders={selectedOrders}></OrdersListAdmin>
        :  
            <tr><th>Aucune commande trouvée </th></tr>
        }

    </tbody>
</Table>
}

export default OrdersTable;