/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { Form, Button, Col, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { css} from '@emotion/react'
import { UserContext } from '../Components/UserContext';
import axios from 'axios';
import TitleH1 from '../Components/TitleH1.jsx';
import {useHistory} from 'react-router-dom';
let yup = require('yup');


function ChangeEmail () {

    let history = useHistory();

    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    let schema = yup.object({
        password: yup.string().min(2).max(30).required(),
        newEmail: yup.string().email().min(2).max(30).required(),
    });

    const [changeEmail, setChangeEmail] = useState({})

    const modifyEmail = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.put('https://127.0.0.1:8000/api/modify/email',
                dataPassword 
            )
            .then(function(response) {
                setChangeEmail({
                    message: response.data.message
                })
                // se déconnecter du compte
                informationUser.setUserInformation({
                    email: null,
                    token: null
                });
                // redirection vers la page de connexion
                history.push('/login');

            })
            .catch(function(error) {
                console.log(error);
                setChangeEmail({
                    message: error.response.data.message
                })
            })
        },
        [token, history,informationUser]
    )



    return <Formik

    initialValues={{ 
        password: '',
        newEmail: ''
    }}

    validationSchema={schema}

    onSubmit={values => {
        modifyEmail({
            password: values.password,
            newEmail: values.newEmail,
        });
    }}
    >
    {({handleChange, handleSubmit, values, errors, touched }) => (
    <div
        css={css`
            width: 100%;
            padding: 0 2%;
        `}
        className="d-flex flex-column  align-items-center"
    >
        <TitleH1>Modifier votre email</TitleH1>
        <Card>
            <Card.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                       <Form.Group as={Col} controlId="password">
                            <Form.Label>Mot de passe actuel : </Form.Label>
                            <Form.Control 
                                type="password" 
                                onChange={handleChange}
                                value={values.password}
                                isValid={touched.password && !errors.password}
                                isInvalid={touched.password &&  errors.password}
                            />
                            <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="newEmail">
                            <Form.Label>Nouvel email : </Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={handleChange}
                                value={values.newEmail}
                                isValid={touched.newEmail && !errors.newEmail}
                                isInvalid={touched.newEmail &&  errors.newEmail}
                            />
                            <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    

                    <Button className="mt-3 mb-5" variant="primary" type="submit" 
                        css={css`
                            width: 100%;
                        `}
                    >
                        Valider
                    </Button>

                </Form>
            </Card.Body>
        </Card>
        <p 
            css={css`
                margin-top: 30px;
                color: red;
                font-size: 25px;
            `}
        >
           {changeEmail.message}
        </p> 
    </div>
    
)}
</Formik>
}


export default ChangeEmail; 