/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { Form, Button, Col, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { css} from '@emotion/react'
import TitleH1 from '../Components/TitleH1.jsx';
let yup = require('yup');


function ChangePasswordForm ({request, changePassword}) {


    // schema verif mdp
    let schema = yup.object({
        oldPassword: yup.string().required(),
        newPasswordOne: yup.string().min(2).max(30).required(),
        newPasswordTwo: yup.string().min(2).max(30).required(),
    });

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
        request({
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
        `}
        className="d-flex flex-column align-items-center"
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
                            {/* <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback> */}
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
                            {/* <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback> */}
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="newPasswordTwo">
                            <Form.Label>Confirmer le mot de passe : </Form.Label>
                            <Form.Control 
                                type="password" 
                                onChange={handleChange}
                                // placeholder="Entrez votre nouveau mot de passe"
                                value={values.newPasswordTwo}
                                isValid={touched.newPasswordTwo && !errors.newPasswordTwo && values.newPasswordOne === values.newPasswordTwo}
                                isInvalid={touched.newPasswordTwo &&  errors.newPasswordTwo || values.newPasswordOne !== values.newPasswordTwo}
                            />
                            {/* <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback> */}
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

export default ChangePasswordForm;