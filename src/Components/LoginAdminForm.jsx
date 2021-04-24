/** @jsxImportSource @emotion/react */
import React, {useContext, useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import { Formik } from 'formik';
import { css} from '@emotion/react';
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { UserAdminContext } from './UserAdminContext.jsx'

let yup = require('yup');

function LoginAdminForm () {

    let history = useHistory();

    const userAdminInformation = useContext(UserAdminContext);

    const [response, setResponse] = useState("");

    let schema = yup.object({
        formBasicEmail: yup.string().email().required(),
        formBasicPassword: yup.string().required(),
    });


    const submitForm = async (values) => {

        try {
            const response = await axios.post('https://127.0.0.1:8000/admin/login_admin_check', {
                email: values.formBasicEmail,
                password: values.formBasicPassword
            });

            if(response.status === 200){

                setResponse("connexion au compte ...");
            
                // mise à jour du context
                userAdminInformation.setUserAdminInformation({
                    email: values.formBasicEmail,
                    token: response.data.token
                }); 
                
                history.push('/admin/home?category=all&page=1&sorting=default')

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

export default LoginAdminForm;