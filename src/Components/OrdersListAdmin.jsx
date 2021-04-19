import React from 'react';
import {Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus, faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

function OrdersListAdmin ({orders,setSelectedOrders,selectedOrders}) {
    const zoomItem = <FontAwesomeIcon icon={faSearchPlus}/>;
    const checkedItem = <FontAwesomeIcon icon={faCheckCircle}/>; 

    const handleChange = (e) => {
        const orderId = parseInt(e.target.id, 10);
        
        if (isNaN(orderId)) {
            return;
        }
        
        if(e.target.checked === true ){
            console.log(e.target.id)
            // on ajoute la valeur de l'id dans le tableau
            setSelectedOrders([...selectedOrders, orderId])
            

        }else{
            // on cherche son index et l'enleve du tableau
            const index = selectedOrders.indexOf(orderId);
            if (index > -1) {
                const newSelectedOrders = [...selectedOrders];
                newSelectedOrders.splice(index, 1);
                setSelectedOrders(newSelectedOrders);
                console.log(newSelectedOrders)

            }
        }

        // return le tableau avec tous les id des produits selectionnés
        console.log(selectedOrders)
    }

    return <>
        {orders ? orders.map(order => 
            <tr key={order.id}>
                <td>
                    <Form.Check
                        onChange={handleChange}
                        type="checkbox"
                        id={order.id}
                        checked={selectedOrders.indexOf(order.id) !== -1}
                        label=""
                        custom
                    />        
                </td>
                <td>{order.id}</td>
                <td>{checkedItem}</td>
                <td>{order.amount}€</td>
                <td>{order.lastName}</td>
                <td>{order.firstName}</td>
                <td>{order.email}</td>
                <td>{order.createdDate}</td>
                <td><Link to={`/admin/order/${order.id}/cart`}><Button>{zoomItem}</Button></Link></td>
            </tr>)
            :
            <p>aucun data</p>
        }
    </>

    
}

export default OrdersListAdmin