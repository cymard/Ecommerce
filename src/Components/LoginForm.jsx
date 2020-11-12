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
    {({ handleSubmit, errors, values, touched}) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control 
                    className="mt-2 mb-5"
                    type="email" 
                    placeholder="Entrez votre adresse email ..."
                    value={values.formBasicEmail} 
                    isValid={touched.formBasicEmail && !errors.formBasicEmail}
                    isInvalid={errors.formBasicEmail}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de Passe</Form.Label>
                <Form.Control 
                    className="mt-2 mb-5"
                    type="password" 
                    placeholder="Entrez votre mot de passe ..." 
                    value={values.formBasicPassword} 
                    isValid={touched.formBasicPassword && !errors.formBasicPassword}
                    isInvalid={errors.formBasicPassword}
                />
            </Form.Group>

            <Button className="mb-3" style={{width: "100%"}} variant="primary" type="submit">
                Valider
            </Button>
        </Form>
    )}
</Formik>
}

export default LoginForm;