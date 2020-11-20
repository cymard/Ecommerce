/** @jsxImportSource @emotion/react */
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
let yup = require('yup');



function RegisterForm () {

    const buttonStyle = {
        width: "100%"
    }

    let schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required()
    });


    return <Formik
        initialValues={{
            email: "",
            password: "",
            confirmPassword: ""
        }}
        validationSchema={schema}
        onSubmit={values=>{
            console.log(values)
        }}
    >
        {({handleChange, handleSubmit, errors, values, touched})=>(
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Adresse Email</Form.Label>
                    <Form.Control
                        className="mt-2"
                        onChange={handleChange}
                        type="email"
                        placeholder="Entrez votre adresse email ..."
                        value={values.email}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && errors.email}
                    />
                    <Form.Text className="text-muted mb-5">
                        Nous ne communiquerons pas votre email
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control 
                        className="mt-2 mb-5"
                        onChange={handleChange}
                        type="password" 
                        placeholder="Entrez votre mot de passe ..." 
                        value={values.password}
                        isValid={touched.password && !errors.password}
                        isInvalid={touched.email && errors.password}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirmation Mot de Passe</Form.Label>
                    <Form.Control 
                        className="mt-2 mb-5"
                        onChange={handleChange}
                        type="password" 
                        placeholder="Confirmer votre mot de passe ..." 
                        value={values.confirmPassword}
                        isValid={touched.confirmPassword && !errors.confirmPassword}
                        isInvalid={touched.email && errors.confirmPassword}
                    />
                </Form.Group>

                <Button css={buttonStyle} variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        )}

    </Formik>
}

export default RegisterForm;