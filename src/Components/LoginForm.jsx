import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
let yup = require('yup');

function LoginForm () {

    let schema = yup.object({
        formBasicEmail: yup.string().email().required(),
        formBasicPassword: yup.string().required(),
    });

    return <Formik
        initialValues={{}}
        validationSchema={schema}
        onSubmit={values => {console.log(values)}}
    >
    {({handleChange, handleSubmit, errors, values, touched}) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Entrez votre adresse email ..."
                    value={values.formBasicEmail} 
                    onChange={handleChange}
                    isValid={touched.formBasicEmail && !errors.formBasicEmail}
                    isInvalid={errors.formBasicEmail}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de Passe</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Entrez votre mot de passe ..." 
                    value={values.formBasicPassword} 
                    onChange={handleChange}
                    isValid={touched.formBasicPassword && !errors.formBasicPassword}
                    isInvalid={errors.formBasicPassword}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Valider
            </Button>
        </Form>
    )}
</Formik>
}

export default LoginForm;