import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";

function ConnectedAccount () {
    return <Container>

                <div className="d-flex justify-content-center mb-5 mt-5 ">
                    <h1> Vos Informations :</h1>
                </div>

                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control 

                                type="text" 
                                placeholder="Entrez votre Prénom"
                                value={"firstName"}

                            />
                            <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
                        </Form.Group>

                        

                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre Nom" 
                                value={"lastName"}
                               
                            />
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Group controlId="Password">
                        <Form.Label>Mot de Passe</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Entrez votre mot de passe ..." 
                            value={"mdp"}
                        />
                    </Form.Group>
                
                    <Form.Row>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Ville" 
                                value={"city"}
                               
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="address">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Adresse" 
                                value={"address"}
                                
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter votre Email" 
                                value={"email@gmail.com"}
                                
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
                                value={"cardName"}
                                
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardNumber">
                            <Form.Label>Numero de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter le numero de la Carte" 
                                value={"cardNumber"}
                               
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardExpirationDate">
                            <Form.Label>Date d'expiration de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="MM/YY" 
                                value={"cardExpirationDate"}
                              
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cryptogram">
                            <Form.Label>Cryptogramme</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter les 3 chiffres au dos de votre carte" 
                                value={"cryptogram"}
                               
                            />
                            <Form.Text className="text-muted">
                                Exemple : 725
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Button className="mt-3 mb-5" style={{width: "100%"}} variant="primary" type="submit">
                        Modifier
                    </Button>
                </Form>
    </Container>
}

export default ConnectedAccount