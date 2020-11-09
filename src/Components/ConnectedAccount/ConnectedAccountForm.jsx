import React from 'react';
import { Form, Button, Col } from "react-bootstrap";
import { Formik } from 'formik';
let yup = require('yup');


function ConnectedAccountForm () {

    let schema = yup.object({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        Password: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
        email: yup.string().email().required(),
        paymentMethod: yup.string().required(),
        cardName: yup.string().required(),
        cardNumber: yup.number().required().positive(),
        cardExpirationDate: yup.date().required(),
        cryptogram: yup.number().required().positive().max(3).min(3)
      });


    return<Formik
        initialValues={{ 
            firstName: 'firstName', 
            lastName: 'lastName', 
            Password: 'Password', 
            address: 'address', 
            email: 'email@email.com', 
            paymentMethod: 'VISA', 
            cardName: 'cardName', 
            cardNumber: '000000', 
            cardExpirationDate: 'MM/JJ', 
            cryptogram: '123'
        }}
        validationSchema={schema}
        onSubmit={values => {
            console.log(values);
        }}

    >
        {({handleChange, handleSubmit, values, errors, touched }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} controlId="firstName">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Entrez votre Prénom"
                            value={values.firstName}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={errors.lastName}
                        />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="Password">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Entrez votre mot de passe ..." 
                        value={values.Password}
                        onChange={handleChange}
                        isValid={touched.Password && !errors.Password}
                        isInvalid={errors.Password}
                    />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="city">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter votre Ville" 
                            value={values.city}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            value={values.paymentMethod}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            isValid={touched.cryptogram && !errors.cryptogram}
                            isInvalid={errors.cryptogram}
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
        )}
    </Formik>
}

export default ConnectedAccountForm;
