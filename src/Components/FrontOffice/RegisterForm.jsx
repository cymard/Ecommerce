/** @jsxImportSource @emotion/react */
import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import {css} from '@emotion/react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
let yup = require('yup');


function RegisterForm ({setAlertState, closeAlert}) {

    let history = useHistory();

    let schema = yup.object().shape({
        email: yup.string().max(255, "Nombre de caractères trop important.").email().required(),
        password: yup.string().max(255, "Nombre de caractères trop important.").required(),
        confirmPassword: yup.string().max(255, "Nombre de caractères trop important.").required()
    });

    const handleOnSubmit = async (values) => {
        axios.post('https://protected-taiga-91617.herokuapp.com/register', {
            "email": values.email,
            "password": values.password
        })
        .then(function (response) {
            setAlertState({
                isOpen: true,
                text: "Compte créé.",
                variant: "success"
            });
            closeAlert();
            history.push('/login');
        })
        .catch(function (error) {
            console.warn(error);
            setAlertState({
                isOpen: true,
                text: "Une erreur est survenue, impossible de creer le compte.",
                variant: "danger"
            });
            if(error.response){
                setAlertState({
                    isOpen: true,
                    text: error.response.data.violations[0].title,
                    variant: "danger"
                });
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

RegisterForm.propTypes = {
    setAlertState : PropTypes.func,
    closeAlert : PropTypes.func
}

export default RegisterForm;