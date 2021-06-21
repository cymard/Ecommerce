/** @jsxImportSource @emotion/react */
import React, {useContext} from 'react';
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from 'formik';
import { css} from '@emotion/react'
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import PropTypes from 'prop-types';


let yup = require('yup');

function ConnectedAccountForm ({userInformation, closeAlert, setAlertState}) {
    
    let schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().email().required(),
        paymentMethod: yup.string().required(),
        cardName: yup.string().required(),
        cardNumber: yup.number().required().positive(),
        cardExpirationDate: yup.string().matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/ , 'format incorrect').required(),   
        cryptogram: yup.number().positive().moreThan(99).lessThan(1000).required()
    });

    const {email, token} = useContext(UserContext);

    return userInformation.firstName !== undefined ? <Formik
        initialValues={{ 
            firstName:  userInformation.firstName, 
            lastName: userInformation.lastName, 
            city: userInformation.city , 
            address: userInformation.address, 
            email: email, 
            paymentMethod: userInformation.paymentMethod, 
            cardName: userInformation.cardName, 
            cardNumber: userInformation.cardNumber, 
            cardExpirationDate: userInformation.cardExpirationDate , 
            cryptogram: userInformation.cryptogram 
        }}


       
        validationSchema={schema}
        onSubmit={values => {
            // change tout sauf l'email et le password
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put('https://protected-taiga-91617.herokuapp.com/api/user/paymentInformations',{
                firstName: values.firstName,
                lastName: values.lastName,
                city: values.city,
                address: values.address,
                paymentMethod: values.paymentMethod,
                cardName: values.cardName,
                cardNumber: values.cardNumber,
                cryptogram: values.cryptogram,
                cardExpirationDate: values.cardExpirationDate
            })
            .then(function (response) {
                // alert
                setAlertState({
                    isOpen: true,
                    text: "Informations mises à jour.",
                    variant: "success"
                });
                closeAlert()
            })
            .catch(function (error) {
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue de la mise à jour des informations.",
                    variant: "danger"
                });
            });
        }}

    >
        {({handleChange, handleSubmit, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={handleChange}
                            placeholder="Entrez votre Prénom"
                            value={values.firstName}
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={touched.firstName &&  errors.firstName}
                        />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lastName">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={handleChange}
                            placeholder="Entrez votre Nom" 
                            value={values.lastName}
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={touched.lastName &&  errors.lastName}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="city">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={handleChange}
                            placeholder="Enter votre Ville" 
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
                            onChange={handleChange}
                            placeholder="Enter votre Adresse" 
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
                            onChange={handleChange}
                            placeholder="Enter votre Email" 
                            value={values.email}
                            isValid={touched.email && !errors.email}
                            isInvalid={touched.email && errors.email}
                            readOnly
                        />
                    </Form.Group>
                </Form.Row>


                <Form.Row>
                    <Form.Group as={Col} controlId="paymentMethod">
                        <Form.Label>Mode de Paiement</Form.Label>
                        <Form.Control 
                            as="select" 
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
                            onChange={handleChange}
                            placeholder="Enter le Prénom et Nom du propriétaire de la carte" 
                            value={values.cardName}
                            isValid={touched.cardName && !errors.cardName}
                            isInvalid={touched.cardName && errors.cardName}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="cardNumber">
                        <Form.Label>Numéro de la Carte</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={handleChange}
                            placeholder="Enter le numéro de la Carte" 
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
                            onChange={handleChange}
                            placeholder="MM/YY" 
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
                            onChange={handleChange}
                            placeholder="Enter les 3 chiffres au dos de votre carte" 
                            value={values.cryptogram}
                            isValid={touched.cryptogram && !errors.cryptogram}
                            isInvalid={touched.cryptogram && errors.cryptogram}
                        />
                        <Form.Text className="text-muted">
                            Exemple : 725
                        </Form.Text>
                    </Form.Group>
                </Form.Row>

                <Button className="mt-3 mb-5" variant="primary" type="submit" 
                    css={css`
                        width: 100%;
                    `}
                >
                    Modifier
                </Button>
            </Form>
        )}
    </Formik>
    :
    <div>Chargement ...</div>
}

ConnectedAccountForm.propTypes = {
    userInformation : PropTypes.object.isRequired,
    closeAlert : PropTypes.func,
    setAlertState : PropTypes.func
}

export default ConnectedAccountForm;
