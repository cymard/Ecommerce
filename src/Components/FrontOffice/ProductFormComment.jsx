/** @jsxImportSource @emotion/react */
import React, {useContext, useState, useEffect} from 'react';
import {Form,Card,Container,Button, InputGroup} from 'react-bootstrap'
import {UserContext} from '../Context/UserContext.jsx';
import {Link, useParams} from "react-router-dom";
import { css} from '@emotion/react';
import { Formik } from 'formik';
import axios from 'axios'
import * as yup from 'yup';
import PropTypes from 'prop-types';


function ProductFormComment ({reFetch, setAlertState, closeAlert}) {

    const [pseudoEmail, setPseudoEmail] = useState('')

    let { id } = useParams();
    const informationUser = useContext(UserContext);
    const token = informationUser.token

    let schema = yup.object().shape({
        title: yup.string().min(2, 'Trop Court!').max(255, 'Trop Long!').required(),
        pseudo: yup.string().required(),
        note: yup.number().required(),
        content: yup.string().min(2, 'Trop Court!').required()
    });
      
    useEffect(()=>{
        if(informationUser.email !== null){
            setPseudoEmail(informationUser.email.split("@")[0]);
        }
    },[informationUser])


    return <Formik
        enableReinitialize={true}
        validationSchema={schema}
        initialValues={{ 
            title: '',
            pseudo: pseudoEmail,
            note: 0,
            content: ''
        }}

        onSubmit={(values, actions) => {

            setTimeout(() => {
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.post(`https://127.0.0.1:8000/api/product/${id}/comment`,  {
                    title: values.title,
                    username: values.pseudo,
                    note: parseInt(values.note),
                    content: values.content,
                    product: parseInt(id),
                    isReported: false
                })
                .then(function (response) {
                    setAlertState({
                        isOpen: true,
                        text: "Commentaire posté.",
                        variant: "success"
                    })
                    closeAlert()
                    actions.resetForm()
                    actions.setSubmitting(false);
                    reFetch()
                })
                .catch(function (error) {
                    console.warn(error);
                    setAlertState({
                        isOpen: true,
                        text: "Une erreur est survenue, impossible de poster le commentaire.",
                        variant: "danger"
                    })
                });
            }, 1000);
   
          }}
    >
    {({handleChange, handleSubmit, touched, values, errors }) => (    
    <Card border="primary" className="mb-5 pt-3 pb-3">
        <Container>
            <Form noValidate onSubmit={handleSubmit}>

                <Form.Group controlId="title">
                    <Form.Label>Titre du commentaire </Form.Label>
                    <Form.Control 
                        value={values.title}
                        onChange={handleChange}
                        isValid={touched.title &&  !errors.title}
                        isInvalid={touched.title &&  errors.title}
                        type="text" 
                        placeholder="Très bon article ..." 
                    />
                </Form.Group>

                <Form.Group controlId="pseudo">
                    <Form.Label>Pseudo </Form.Label>
                    <Form.Control 
                        value={values.pseudo}
                        onChange={handleChange}
                        isValid={touched.pseudo &&  !errors.pseudo}
                        isInvalid={touched.pseudo &&  errors.pseudo}
                        type="text" 
                    />
                </Form.Group>

                <Form.Group controlId="note">
                    <Form.Label>Note </Form.Label>
                    <InputGroup className="mb-2">
                        <Form.Control 
                            value={values.note}
                            onChange={handleChange}
                            as="select"
                        >
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                        <InputGroup.Append>
                            <InputGroup.Text>/5</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    
                </Form.Group>

                <Form.Group controlId="content">
                    <Form.Label>Commentaire </Form.Label>
                    <Form.Control 
                        value={values.content}
                        onChange={handleChange}
                        isValid={touched.content &&  !errors.content}
                        isInvalid={touched.content &&  errors.content}
                        type="text" 
                        as="textarea" 
                        rows={3} 
                    />
                </Form.Group>

                {informationUser.email === null && informationUser.token === null ?
                    <Link to="/login"><Button  variant="primary" size="lg"
                        css={css`
                            width: 100%; 
                        `}
                    >Poster</Button></Link>
                :
                    <Button type="submit" variant="primary" size="lg" block>Poster</Button>
                }
                
            </Form>
        </Container> 
    </Card>
)}
</Formik>     

}

ProductFormComment.propTypes = {
    reFetch : PropTypes.func.isRequired
}

export default ProductFormComment;