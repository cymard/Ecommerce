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


function ChangePassword () {
    let history = useHistory();

    // Context
    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    // schema verif mdp
    let schema = yup.object({
        oldPassword: yup.string().required(),
        newPasswordOne: yup.string().min(2).max(30).required(),
        newPasswordTwo: yup.string().min(2).max(30).required(),
    });

    // state
    const [changePassword, setChangePassword] = useState({})


    // requete verif mdp
    const modifyPassword = useCallback(
        (dataPassword) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.post('https://127.0.0.1:8000/api/modify/password',
                dataPassword 
            )
            .then(function(response) {
                console.log(response);
                setChangePassword({
                    message: response.data.message
                })
                history.push('/home')

            })
            .catch(function(error) {
                console.log(error);
                setChangePassword({
                    message: error.response.data.message
                })
            })
        },
        [token]
    )


    return <Formik

        enableReinitialize={false}

        initialValues={{ 
            oldPassword: '',
            newPasswordOne: '',
            newPasswordTwo: '',
        }}

        validationSchema={schema}

        onSubmit={values => {
            console.log(values);
            modifyPassword({
                oldPassword: values.oldPassword,
                newPasswordOne: values.newPasswordOne,
                newPasswordTwo: values.newPasswordTwo,
            });
        }}

    >
    {({handleChange, handleSubmit, values, errors, touched }) => (
        <div
            css={css`
                width: 100%;
                height: calc(100vh - 184px);
            `}
            className="d-flex flex-column  align-items-center"
        >
            <TitleH1>Modifier votre mot de passe</TitleH1>
            <Card>
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>

                        <Form.Row>
                            <Form.Group as={Col} controlId="oldPassword">
                                <Form.Label>Mot de passe actuel : </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    onChange={handleChange}
                                    // placeholder="Entrez votre mot de passe actuel"
                                    value={values.oldPassword}
                                    isValid={touched.oldPassword && !errors.oldPassword}
                                    isInvalid={touched.oldPassword &&  errors.oldPassword}
                                />
                                <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="newPasswordOne">
                                <Form.Label>Nouveau mot de passe : </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    onChange={handleChange}
                                    // placeholder="Entrez votre nouveau mot de passe"
                                    value={values.newPasswordOne}
                                    isValid={touched.newPasswordOne && !errors.newPasswordOne && values.newPasswordOne === values.newPasswordTwo}
                                    isInvalid={touched.newPasswordOne &&  errors.newPasswordOne || values.newPasswordOne != values.newPasswordTwo}
                                />
                                <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="newPasswordTwo">
                                <Form.Label>Nouveau mot de passe : </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    onChange={handleChange}
                                    // placeholder="Entrez votre nouveau mot de passe"
                                    value={values.newPasswordTwo}
                                    isValid={touched.newPasswordTwo && !errors.newPasswordTwo && values.newPasswordOne === values.newPasswordTwo}
                                    isInvalid={touched.newPasswordTwo &&  errors.newPasswordTwo || values.newPasswordOne !== values.newPasswordTwo}
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
           >{changePassword.message}</p> 
        </div>
        
    )}
    </Formik>
}

export default ChangePassword;