import React from 'react';
import {Card} from 'react-bootstrap';

function PersonalOrderInformations({informationOrder}){
    return  <Card>
        <Card.Body>
            <Card.Title className="font-weight-bold">Identité de l'acheteur</Card.Title>
            <Card.Text>
                Prénom : {informationOrder.data.firstName}
                <br/>
                Nom : {informationOrder.data.lastName}
                <br/>
                Email : {informationOrder.data.email}
                <br/>
                Ville : {informationOrder.data.city}
                <br/>
                Adresse : {informationOrder.data.address}

            </Card.Text>
            <Card.Title className="font-weight-bold mt-5">Mode de paiement</Card.Title>
            <Card.Text>
                Mode de Paiement : {informationOrder.data.paymentMethod}
                <br/>
                Numéro de la Carte :  {informationOrder.data.cardNumber}
                <br/>
                Propriétaire de la Carte :  {informationOrder.data.cardName}
                <br/>
                Date d'expiration de la Carte : {informationOrder.data.cardExpirationDate}
            </Card.Text>
        </Card.Body>
    </Card>
}

export default PersonalOrderInformations;