/** @jsxImportSource @emotion/react */
import React,{useContext, useEffect} from 'react';
import {Form, Button, Col} from 'react-bootstrap';
import { Formik } from 'formik';
import { css} from '@emotion/react'
import axios from 'axios'
import {UserAdminContext} from './UserAdminContext.jsx';

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
    cryptogram: yup.number().positive().required(),
    bankData: yup.boolean(),
    termsAndConditions: yup.boolean().required()
});

function BuyForm ({amount}) {

    const informationUser = useContext(UserAdminContext);
    const token = informationUser.token



    return <div>
        <Formik 
            validationSchema={schema}

            onSubmit={values => {
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.post('https://127.0.0.1:8000/admin/order', {
                    "firstName" :values.firstName,
                    "lastName" :values.lastName,
                    "city" :values.city,
                    "address" :values.address,
                    "email" :values.email,
                    "paymentMethod" :values.paymentMethod,
                    "cardName" :values.cardName,
                    "cardNumber" : parseInt(values.cardNumber),
                    "cardExpirationDate" :values.cardExpirationDate,
                    "cryptogram" :parseInt(values.cryptogram),
                    "amount" : amount
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }}

            initialValues={{
                firstName: "",
                lastName: "",
                city: "",
                address: "",
                email: "",
                paymentMethod: "VISA",
                cardName: "",
                cardNumber: "",
                cardExpirationDate: "",
                cryptogram: "",
                bankData: "",
                termsAndConditions: "",
            }}
        >
            {({handleChange, handleSubmit,values,touched,errors}) => (

                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control 
                                onChange={handleChange}
                                type="text" 
                                placeholder="Entrez votre Prénom"
                                value={values.firstName}
                                isValid={touched.firstName && !errors.firstName}
                                isInvalid={touched.firstName && errors.firstName}
                            />
                        </Form.Group>

                        

                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control

                                type="text" 
                                placeholder="Entrez votre Nom" 

                                onChange={handleChange}
                                value={values.lastName}

                                isValid={touched.lastName && !errors.lastName}
                                isInvalid={touched.lastName && errors.lastName}
                            />
                        </Form.Group>
                    </Form.Row>
            
                    <Form.Row>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label>Ville</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Ville" 
                                onChange={handleChange}
                                value={values.city}

                                isValid={touched.city && !errors.city}
                                isInvalid={touched.city && errors.city}
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="address">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter votre Adresse" 
                                onChange={handleChange}
                                value={values.address}

                                isValid={touched.address && !errors.address}
                                isInvalid={touched.address && errors.address}
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
                                onChange={handleChange}
                                isValid={touched.email && !errors.email}
                                isInvalid={touched.email && errors.email}
                            />
                        </Form.Group>
                    </Form.Row>


                    <Form.Row>
                        <Form.Group as={Col} controlId="paymentMethod">
                            <Form.Label>Mode de Paiement</Form.Label>
                            <Form.Control 
                                as="select" 
                                defaultValue="Choisissez votre mode de Paiement"
                                onChange={handleChange}
                                value={values.paymentMethod}

                                isValid={touched.paymentMethod && !errors.paymentMethod}
                                isInvalid={touched.paymentMethod && errors.paymentMethod}
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
                                onChange={handleChange}
                                value={values.cardName}

                                isValid={touched.cardName && !errors.cardName}
                                isInvalid={touched.cardName && errors.cardName}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardNumber">
                            <Form.Label>Numero de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter le numero de la Carte" 
                                onChange={handleChange}
                                value={values.cardNumber}

                                isValid={touched.cardNumber && !errors.cardNumber}
                                isInvalid={ touched.cardNumber && errors.cardNumber}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cardExpirationDate">
                            <Form.Label>Date d'expiration de la Carte</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="MMYY" 
                                onChange={handleChange}
                                value={values.cardExpirationDate}

                                isValid={touched.cardExpirationDate && !errors.cardExpirationDate}
                                isInvalid={touched.cardExpirationDate && errors.cardExpirationDate}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="cryptogram">
                            <Form.Label>Cryptogramme</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter les 3 chiffres au dos de votre carte" 
                                onChange={handleChange}
                                value={values.cryptogram}

                                isValid={touched.cryptogram && !errors.cryptogram}
                                isInvalid={ touched.cryptogram && errors.cryptogram}
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
                            onChange={handleChange}
                            isValid={touched.bankData && !errors.bankData}
                            isInvalid={touched.bankData && errors.bankData}
                        />

                    </Form.Group>

                    <Form.Group controlId="termsAndConditions">
                        <Form.Check 
                            required
                            type="checkbox" 
                            label="En cliquant sur Payer, vous déclarez avoir pris connaissance des conditions générales d'utilisation de notre service de paiement et être en accord avec celle-ci." 
                            onChange={handleChange}
                            value={values.termsAndConditions}

                            isValid={touched.termsAndConditions && !errors.termsAndConditions}
                            isInvalid={touched.termsAndConditions && errors.termsAndConditions}
                        />
                    </Form.Group>

                    <Button className="mt-3 mb-5" variant="primary" type="submit"
                        css={css`
                            width: 100%;
                        `}
                    >
                        Payer
                    </Button>
                </Form>
            )}
        </Formik>
    </div>
}

export default BuyForm