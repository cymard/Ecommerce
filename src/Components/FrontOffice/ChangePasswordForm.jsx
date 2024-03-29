/** @jsxImportSource @emotion/react */
import React from 'react';
import { Form, Button, Col, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { css} from '@emotion/react'
import Title from '../All/Title.jsx';
import PropTypes from 'prop-types';

let yup = require('yup');

function ChangePasswordForm ({request, changePassword}) {

    let schema = yup.object({
        oldPassword: yup.string().max(255, "Nombre de caractères trop important.").required(),
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
        <Title>Modifier votre mot de passe</Title>
        <Card>
            <Card.Body>
                <Form noValidate onSubmit={handleSubmit}>

                    <Form.Row>
                        <Form.Group as={Col} controlId="oldPassword">
                            <Form.Label>Mot de passe actuel : </Form.Label>
                            <Form.Control 
                                type="password" 
                                onChange={handleChange}
                                value={values.oldPassword}
                                isValid={touched.oldPassword && !errors.oldPassword}
                                isInvalid={touched.oldPassword &&  errors.oldPassword}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="newPasswordOne">
                            <Form.Label>Nouveau mot de passe : </Form.Label>
                            <Form.Control 
                                type="password" 
                                onChange={handleChange}
                                value={values.newPasswordOne}
                                isValid={touched.newPasswordOne && !errors.newPasswordOne && values.newPasswordOne === values.newPasswordTwo}
                                isInvalid={(touched.newPasswordOne &&  errors.newPasswordOne) || (values.newPasswordOne !== values.newPasswordTwo)}
                            />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="newPasswordTwo">
                            <Form.Label>Confirmer le mot de passe : </Form.Label>
                            <Form.Control 
                                type="password" 
                                onChange={handleChange}
                                value={values.newPasswordTwo}
                                isValid={touched.newPasswordTwo && !errors.newPasswordTwo && values.newPasswordOne === values.newPasswordTwo}
                                isInvalid={(touched.newPasswordTwo &&  errors.newPasswordTwo) || (values.newPasswordOne !== values.newPasswordTwo)}
                            />
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
           {changePassword.message}
        </p> 
    </div>
    
)}
</Formik>
}

ChangePasswordForm.propTypes = {
    request : PropTypes.func.isRequired,
    changePassword : PropTypes.object.isRequired
}

export default ChangePasswordForm;