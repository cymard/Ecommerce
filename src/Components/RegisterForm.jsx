import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
let yup = require('yup');



function RegisterForm () {

    let schema = yup.object().shape({
        formBasicEmail: yup.string().email().required(),
        RegisterForm: yup.string().required()
    });


    return <Formik
        initialValues={{}}
        validationSchema={schema}
        onSubmit={values=>{
            console.log(values)
        }}
    >
        {({handleChange, handleSubmit, errors, values, touched})=>(
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
                    <Form.Text className="text-muted">
                        Nous ne communiquerons pas votre email
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="RegisterForm">
                    <Form.Label>Mot de Passe</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Entrez votre mot de passe ..." 
                        value={values.RegisterForm}
                        onChange={handleChange}
                        isValid={touched.RegisterForm && !errors.RegisterForm}
                        isInvalid={errors.RegisterForm}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Valider
                </Button>
            </Form>
        )}

    </Formik>
}

export default RegisterForm;