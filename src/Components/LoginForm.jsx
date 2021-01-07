/** @jsxImportSource @emotion/react */
import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import { css} from '@emotion/react';
import {UserContext} from './UserContext';
import axios from 'axios';
import {useHistory} from "react-router-dom";

let yup = require('yup');

function LoginForm () {

    let history = useHistory();

    const userInformation = useContext(UserContext);

    const [response, setResponse] = useState("");

    let schema = yup.object({
        formBasicEmail: yup.string().email().required(),
        formBasicPassword: yup.string().required(),
    });


    const submitForm = async (values) => {

        try {
            console.log("--------------------------")
            const response = await axios.post('https://127.0.0.1:8000/api/login_check', {
                email: values.formBasicEmail,
                password: values.formBasicPassword
            });
            console.log(response);

            if(response.status === 200){

                setResponse("connection au compte ...");
            
                // mise à jour du context
                // prise en compte duu token
                // prendre l'email depuis la requête envoyée
                userInformation.setUserInformation({
                    email: values.formBasicEmail,
                    token: response.data.token
                }); 
                
                return history.push('/');

            }else{
                setResponse("La connexion a échouée, merci de réessayer");
            }   
        
        } catch (err) {
            setResponse("La connexion a échouée, merci de réessayer");
            console.log("erreur");
            console.error(err.message);
        }
    };



    return <Formik
        initialValues={{
            formBasicEmail : "",
            formBasicPassword: ""
        }}

        validationSchema={schema}

        onSubmit={submitForm}
        
    >
    {({handleChange, handleSubmit, errors, values, touched}) => (
        <Form noValidate onSubmit={handleSubmit}>
            {response}
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

            
            <Button className="mb-3" variant="primary" type="submit" 
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

export default LoginForm;