/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useCallback} from 'react';
import { Form, Button, Col, Card } from "react-bootstrap";
import { Formik } from 'formik';
import { css} from '@emotion/react'
import { UserContext } from '../Components/UserContext';
import axios from 'axios';
let yup = require('yup');


function ChangePassword () {

    // Context
    const informationUser = useContext(UserContext);
    const token = informationUser.token;

    // schema verif mdp
    let schema = yup.object({
        actualPassword: yup.string().required()
    });

    // state
    const [changePassword, setChangePassword] = useState({status: false})


    // requete verif mdp
    const verifyActualPassword = useCallback(
        (password) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.post('https://127.0.0.1:8000/api/verify/actualpassword',{
                "actualPassword" : password 
            })
            .then(function(response) {
                console.log(response);
                setChangePassword({
                    status: true
                })
            })
            .catch(function(error) {
                console.log(error);
                setChangePassword({
                    status: false,
                    message: "Mauvais mot de passe"
                })
            })
        },
        [token],
    )

    // requete changement de mdp
    // const verifyActualPassword = useCallback(
    //     () => {
    //         axios.post('url',data)
    //         .then(function(response) {
    //             console.log(response);
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //         })
    //     },
    //     [input],
    // )


    return <>
    {changePassword.status === false ?
    <Formik
        enableReinitialize={true}
        initialValues={{ 
            actualPassword: ''
        }}
        validationSchema={schema}
        onSubmit={values => {
            console.log(values);
            verifyActualPassword(values.actualPassword);
        }}
    >
    {({handleChange, handleSubmit, values, errors, touched }) => (
        <div
            css={css`
                width: 100%;
                height: 100%;
            `}
            className="d-flex flex-column justify-content-center align-items-center"
        >
            <Card>
                <Card.Body>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="actualPassword">
                                <Form.Label>Entrez votre mot de passe actuel : </Form.Label>
                                <Form.Control 
                                    type="password" 
                                    onChange={handleChange}
                                    placeholder="Entrez votre mot de passe actuel"
                                    value={values.actualPassword}
                                    isValid={touched.actualPassword && !errors.actualPassword}
                                    isInvalid={touched.actualPassword &&  errors.actualPassword}
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
             `}
           >{changePassword.message}</p> 
        </div>
        
    )}
    </Formik>
    :
    // <Formik
    //     enableReinitialize={true}
    //     initialValues={{ 
    //         actualPassword: ''
    //     }}
    //     validationSchema={schema}
    //     onSubmit={values => {
    //         console.log(values);
    //         verifyActualPassword(values.actualPassword);
    //     }}
    // >
    // {({handleChange, handleSubmit, values, errors, touched }) => (
    //     <div
    //         css={css`
    //             width: 100%;
    //             height: 100%;
    //         `}
    //         className="d-flex flex-column justify-content-center align-items-center"
    //     >
    //         <Card>
    //             <Card.Body>
    //                 <Form noValidate onSubmit={handleSubmit}>
    //                     <Form.Row>
    //                         <Form.Group as={Col} controlId="actualPassword">
    //                             <Form.Label>Entrez votre mot de passe actuel : </Form.Label>
    //                             <Form.Control 
    //                                 type="password" 
    //                                 onChange={handleChange}
    //                                 placeholder="Entrez votre mot de passe actuel"
    //                                 value={values.actualPassword}
    //                                 isValid={touched.actualPassword && !errors.actualPassword}
    //                                 isInvalid={touched.actualPassword &&  errors.actualPassword}
    //                             />
    //                             <Form.Control.Feedback type="valid" tooltip>Looks good!</Form.Control.Feedback>
    //                             <Form.Control.Feedback type="invalid" tooltip>Looks bad!</Form.Control.Feedback>
    //                         </Form.Group>
    //                     </Form.Row>
    //                     <Button className="mt-3 mb-5" variant="primary" type="submit" 
    //                         css={css`
    //                             width: 100%;
    //                         `}
    //                     >
    //                         Valider
    //                     </Button>
    //                 </Form>
    //             </Card.Body>
    //         </Card>
    //        <p 
    //         css={css`
    //             margin-top: 30px;
    //             color: red;
    //          `}
    //        >{changePassword.message}</p> 
    //     </div>
        
    // )}
    // </Formik>
    <div>bon mot de passe !</div>
    }
    </>
}

export default ChangePassword;