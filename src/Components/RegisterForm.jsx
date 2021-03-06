/** @jsxImportSource @emotion/react */
import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import {css} from '@emotion/react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
let yup = require('yup');



function RegisterForm () {

    let history = useHistory();

    let schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required()
    });

    const [messageError, setMessageError] = useState("");

    const handleOnSubmit = async (values) => {
        await axios.post('https://127.0.0.1:8000/register', {
            "email": values.email,
            "password": values.password
        })
        .then(function (response) {
            console.log(response);
            return history.push('/login');
        })
        .catch(function (error) {
            console.log(error);
            if(error.response){
                console.log(error.response.data.violations[0].title); // => the response payload 
                setMessageError(error.response.data.violations[0].title);
            }
        });
    }


    return <Formik
        initialValues={{
            email: "",
            password: "",
            confirmPassword: ""
        }}
        validationSchema={schema}
        onSubmit={handleOnSubmit}
    >
        {({handleChange, handleSubmit, errors, values, touched})=>(
           
            <Form noValidate onSubmit={handleSubmit}>
                <p
                css={css`
                    color: red;
                `}
                >{messageError}</p>
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
                        isValid={(touched.password && values.confirmPassword===values.password) || (touched.password && !errors.password)}
                        isInvalid={(touched.password && values.confirmPassword!==values.password) || (touched.password && errors.password)}
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
                        isValid={ (touched.confirmPassword && values.confirmPassword===values.password) || (touched.confirmPassword && !errors.confirmPassword)}
                        isInvalid={ (touched.confirmPassword && values.confirmPassword!==values.password) || (touched.confirmPassword && errors.confirmPassword)}
                    />
                </Form.Group>

                <Button  variant="primary" type="submit"
                    css={css`
                        width: 100%;
                    `}
                >
                    Valider
                </Button>
            </Form>
        )}

    </Formik>
}

export default RegisterForm;