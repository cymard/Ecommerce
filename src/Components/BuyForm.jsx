import React from 'react';
import {Form, Button, Col} from 'react-bootstrap';

import { Formik } from 'formik';

let yup = require('yup');

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().email().required(),
    paymentMethod: yup.string().required(),
    cardName: yup.string().required(),
    cardNumber: yup.number().positive().required(),
    cardExpirationDate: yup.date().required(),
    cryptogram: yup.number().positive().required().max(3).min(3),
    bankData: yup.boolean(),
    termsAndConditions: yup.boolean().required()
});

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
        <Formik 
            validationSchema={schema}
            onSubmit={values => {
                // same shape as initial values
                console.log(values);
            }}
            initialValues={{
                paymentMethod : "VISA"
            }}
        >
            {({handleSubmit,values,touched,errors}) => (

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control 

                                type="text" 
                                placeholder="Entrez votre Prénom"

                                
                                value={values.firstName}

                                isValid={touched.firstName && !errors.firstName}
                                isInvalid={errors.firstName}
                            />
                            <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
                        </Form.Group>

                        

                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Entrez votre Nom" 

                                
                                value={values.lastName}

                                isValid={touched.lastName && !errors.lastName}
                                isInvalid={errors.lastName}
                            />
                        </Form.Group>
                    </Form.Row>
            
                    <Form.Row>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Ville" 

                                value={values.city}

                                isValid={touched.city && !errors.city}
                                isInvalid={errors.city}
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="address">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Adresse" 

                                value={values.address}

                                isValid={touched.address && !errors.address}
                                isInvalid={errors.address}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter votre Email" 

                                value={values.email}

                                isValid={touched.email && !errors.email}
                                isInvalid={errors.email}
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="paymentMethod">
                            <Form.Label>Mode de Paiement</Form.Label>
                            <Form.Control 
                                as="select" 
                                defaultValue="Choisissez votre mode de Paiement"

                                value={values.paymentMethod}

                                isValid={touched.paymentMethod && !errors.paymentMethod}
                                isInvalid={errors.paymentMethod}
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

                                value={values.cardName}

                                isValid={touched.cardName && !errors.cardName}
                                isInvalid={errors.cardName}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardNumber">
                            <Form.Label>Numero de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter le numero de la Carte" 

                                value={values.cardNumber}

                                isValid={touched.cardNumber && !errors.cardNumber}
                                isInvalid={errors.cardNumber}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardExpirationDate">
                            <Form.Label>Date d'expiration de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="MM/YY" 

                                value={values.cardExpirationDate}

                                isValid={touched.cardExpirationDate && !errors.cardExpirationDate}
                                isInvalid={errors.cardExpirationDate}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cryptogram">
                            <Form.Label>Cryptogramme</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter les 3 chiffres au dos de votre carte" 

                                value={values.cryptogram}

                                isValid={touched.cryptogram && !errors.cryptogram}
                                isInvalid={errors.cryptogram}
                            />
                            <Form.Text className="text-muted">
                                Exemple : 725
                            </Form.Text>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="bankData">
                        <Form.Check 
                            type="checkbox" 
                            label="Se souvenir de mes coordonnées bancaires pour les prochaines utilisations."
                            value={values.bankData}

                            isValid={touched.bankData && !errors.bankData}
                            isInvalid={errors.bankData}
                        />

                    </Form.Group>

                    <Form.Group controlId="termsAndConditions">
                        <Form.Check 
                            required
                            type="checkbox" 
                            label="En cliquant sur Payer, vous déclarez avoir pris connaissance des conditions générales d'utilisation de notre service de paiement et être en accord avec celle-ci." 
                        
                            value={values.termsAndConditions}

                            isValid={touched.termsAndConditions && !errors.termsAndConditions}
                            isInvalid={errors.termsAndConditions}
                        />
                    </Form.Group>

                    <Button className="mt-3 mb-5" style={{width: "100%"}} variant="primary" type="submit">
                        Payer
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
}

export default BuyForm