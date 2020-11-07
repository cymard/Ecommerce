import React from 'react';
import {Form, Button, Col} from 'react-bootstrap';

function BuyForm () {
    // infos :
    // prenom 
    // nom
    // pays
    // adresse
    // code postal
    // email
    // Paiement : 
    // type de carte (VISA, MasterCArd, American Express)
    // nom carte
    // nombre carte
    // date d'expiration
    // cryptogramme (3 chiffres)
    // se souvenir des infos de paiment ?? (checkbox)
    // message en cliquant sur payer vous ...


    return <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre Prénom" 
                            />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre Nom" 
                            />
                        </Form.Group>
                    </Form.Row>
            
                    <Form.Row>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Ville" 
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="address">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Adresse" 
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter votre Email" 
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="paymentMethod">
                            <Form.Label>Mode de Paiement</Form.Label>
                            <Form.Control 
                                as="select" 
                                defaultValue="Choisissez votre mode de Paiement"
                            >
                                <option>VISA</option>
                                <option>MasterCard</option>
                                <option>American Express</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardName">
                            <Form.Label>Propriétaire de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter le Prénom et Nom du propriétaire de la carte" 
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardNumber">
                            <Form.Label>Numero de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter le numero de la Carte" 
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardExpirationDate">
                            <Form.Label>Date d'expiration de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="MM/YY" 
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cryptogram">
                            <Form.Label>Cryptogramme</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter les 3 chiffres au dos de votre carte" 
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Se souvenir de mes coordonnées bancaires pour les prochaines utilisations." />
                    </Form.Group>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="En cliquant sur Payer, vous déclarez avoir pris connaissance des conditions générales d'utilisation de notre service de paiement et être en accord avec celle-ci." />
                    </Form.Group>

                    <Button className="mt-3 mb-5" style={{width: "100%"}} variant="primary" type="submit">
                        Payer
                    </Button>

        </Form>
    </div>
}

export default BuyForm