import React from 'react';
import {Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function OrdersListUser ({orders}) {
    const zoomItem = <FontAwesomeIcon icon={faSearchPlus}/>;

    return <>
        {orders ? orders.map(order => 
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdDate}</td>
                <td>{order.amount}€</td>
                <td><Link to={`/api/order/${order.id}/details`}><Button>{zoomItem}</Button></Link></td>
            </tr>)
            :
            <p>aucun data</p>
        }
    </>

    
}

export default OrdersListUser