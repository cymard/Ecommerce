import React from 'react';
import {Card} from 'react-bootstrap'
import InformationOrderLine from '../FrontOffice/InformationOrderLine';

function OrderIdentificationInformations({informationOrder}){
    return <div className="d-flex justify-content-center mb-5 ">
        <Card className="p-3">
            <InformationOrderLine informationOrder={informationOrder.data.createdDate}>Date de la Commande</InformationOrderLine>
            <InformationOrderLine informationOrder={informationOrder.data.amount}>Montant de la Commande</InformationOrderLine>
            <InformationOrderLine informationOrder={informationOrder.data.id}>Numéro de la Commande</InformationOrderLine>
        </Card>
    </div>
}

export default OrderIdentificationInformations;