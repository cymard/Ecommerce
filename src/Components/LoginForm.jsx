import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
let yup = require('yup');

function LoginForm () {

    let schema = yup.object({
        formBasicEmail: yup.string().email().required(),
        formBasicPassword: yup.string().required(),
    });

    const handleOnSubmit = function(){
        localStorage.setItem('connexion', 'true');
        console.log(localStorage.getItem('connexion'));
        document.location.reload(true);
    }


    return <Formik
        initialValues={{
            formBasicEmail : "",
            formBasicPassword: ""
        }}
        validationSchema={schema}
        onSubmit={handleOnSubmit}
        
    >
    {({handleChange, handleSubmit, errors, values, touched}) => (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control 
                    className="mt-2 mb-5"
                    type="email"
                    placeholder="Entrez votre adresse email ..."
                    value={values.formBasicEmail} 
                    onChange={handleChange}
                    isValid={touched.formBasicEmail && !errors.formBasicEmail}
                    isInvalid={touched.formBasicEmail && errors.formBasicEmail}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de Passe</Form.Label>
                <Form.Control 
                    className="mt-2 mb-5"
                    type="password"
                    placeholder="Entrez votre mot de passe ..." 
                    value={values.formBasicPassword} 
                    onChange={handleChange}
                    isValid={touched.formBasicPassword && !errors.formBasicPassword}
                    isInvalid={touched.formBasicPassword && errors.formBasicPassword}
                />
            </Form.Group>

            <Button  className="mb-3" style={{width: "100%"}} variant="primary" type="submit">
                Valider
            </Button>
        </Form>
    )}
</Formik>
}

export default LoginForm;