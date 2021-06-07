import React from "react";
import {Table,Row,Col,Button} from "react-bootstrap";
import SortDateButtons from './SortDateButtons.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';


function UserOrdersTable ({data}) {
    const zoomItem = <FontAwesomeIcon icon={faSearchPlus}/>;

    return <Table className="text-center" responsive hover>
    <thead>
        <tr>
            <th>N° </th>
            <th>
                <Row >
                    <Col className="d-flex justify-content-center align-items-center">
                        Commande éffectuée le<SortDateButtons></SortDateButtons>
                    </Col>
                </Row>
            </th>
            <th>Total</th>
            <th>Détails de la commande</th>
        </tr>
    </thead>
    <tbody>
        {data.status ?
            data.orders ? 
                data.orders.map(order => 
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.createdDate}</td>
                    <td>{order.amount}€</td>
                    <td><Link to={`/api/order/${order.id}/details`}><Button>{zoomItem}</Button></Link></td>
                </tr>)
            :
                <p>Aucune commande trouvée</p>
        :  
            <tr>
                <th>Chargement ...</th>
            </tr>
        }
    </tbody>
</Table>
}

UserOrdersTable.propTypes = {
    data : PropTypes.object.isRequired
}

export default UserOrdersTable;