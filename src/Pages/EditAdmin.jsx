/** @jsxImportSource @emotion/react */
import React,{useState} from 'react';
import {css} from '@emotion/react';
import {useParams} from "react-router-dom";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import TitleH1 from "../Components/TitleH1.jsx";
import {Container,Form,Row,Col,Button} from 'react-bootstrap';
import { Formik } from 'formik';
// WYSIWYG
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function EditAdmin () {
    let { id } = useParams();
    const [value, setValue] = useState('');




    // requête axios dans useEffect pour afficher les infos liées au product
    // requête acios pour envoyer les données 


    const submitForm = async (values) => {
        console.log(values.title)
        console.log(values.image)
        console.log(value)
        console.log(values.category)
        console.log(values.price)
        console.log(values.stock)

        // try {
        //     console.log("--------------------------")
        //     const response = await axios.post('https://127.0.0.1:8000/api/login_check', {
        //         email: values.formBasicEmail,
        //         password: values.formBasicPassword
        //     });
        //     console.log(response);

        //     if(response.status === 200){

        //         setResponse("connection au compte ...");
            
        //         // mise à jour du context
        //         // prise en compte du token
        //         // prendre l'email depuis la requête envoyée
        //         userInformation.setUserInformation({
        //             email: values.formBasicEmail,
        //             token: response.data.token
        //         }); 
                
        //         return history.push('/');

        //     }else{
        //         setResponse("La connexion a échouée, merci de réessayer");
        //     }   
        
        // } catch (err) {
        //     setResponse("La connexion a échouée, merci de réessayer");
        //     console.log("erreur");
        //     console.error(err.message);
        // }
    };






    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar></AdminNavBar>
        <Container fluid>
            <TitleH1>Modification du produit {id}</TitleH1>

            <Formik
                initialValues={{ 
                    title: '', 
                    image: '',
                    // description: '',
                    category: '',
                    price: '',
                    stock: ''
                }}
                
                // validate={values => {
                // }}

                onSubmit={submitForm}
            >
                {({ 
                    handleChange,
                    handleSubmit,
                    errors,
                    values,
                    touched
                    }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        {/* titre du produit */}
                        <Form.Group as={Row} controlId="title">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    value={values.title} 
                                    onChange={handleChange}
                                    isValid={touched.title && !errors.title}
                                    isInvalid={touched.title && errors.title}
                                    type="email" placeholder="Email" 
                                />
                            </Col>
                        </Form.Group>

                        {/* ajouter une image */}
                        <Form.Group className="d-flex justify-content-center" controlId="image">
                            <Form.File id="exampleFormControlFile1" />
                        </Form.Group>
                        
                        {/* description du produit (WYSIWYG)*/}
                        <ReactQuill 
                            theme="snow" 
                            value={value} 
                            onChange={setValue} 
                            controlId="description"

                            // value={values.description} 
                            // onChange={handleChange}
                            // isValid={touched.description && !errors.description}
                            // isInvalid={touched.description && errors.description}
                        />

                        {/* choisir la catégorie */}
                        <Form.Group as={Row} controlId="category" 
                            
                        >
                            <Form.Label as="legend" column sm={2}>
                                Catégories : 
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    custom
                                    type="radio"
                                    label="Sports/vêtements"
                                    name="formHorizontalRadios"
                                    id="sports"
                                    onChange={handleChange}
                                    value={values.category}
                                    isValid={touched.title && !errors.title}
                                    isInvalid={touched.title && errors.title}
                                />
                                <Form.Check
                                    custom
                                    type="radio"
                                    label="Maison"
                                    name="formHorizontalRadios"
                                    id="maison"
                                />
                                <Form.Check
                                    custom  
                                    type="radio"
                                    label="Livres"
                                    name="formHorizontalRadios"
                                    id="livres"
                                />
                                <Form.Check
                                    custom
                                    type="radio"
                                    label="Informatique/High-Tech"
                                    name="formHorizontalRadios"
                                    id="informatique"
                                />
                            </Col>
                        </Form.Group>

                        {/* prix */}
                        <Form.Group as={Row} controlId="price">
                            <Form.Label column sm={2}>
                                Prix : 
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="price" 
                                    placeholder="price" 
                                    value={values.price} 
                                    onChange={handleChange}
                                    isValid={touched.price && !errors.price}
                                    isInvalid={touched.price && errors.price}
                                />
                            </Col>
                        </Form.Group>

                        {/* quantité */}
                        <Form.Group as={Row} controlId="stock">
                            <Form.Label column sm={2}>
                                Stock :
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control 
                                    type="stock" 
                                    placeholder="stock" 
                                    value={values.stock} 
                                    onChange={handleChange}
                                    isValid={touched.stock && !errors.stock}
                                    isInvalid={touched.stock && errors.stock}
                                />
                            </Col>
                        </Form.Group>
                        <Button 
                            css={css`
                                width: 100%;
                            `}
                        type="submit" onSubmit={handleSubmit}>Modifier</Button>
                    </Form>
                )}
            </Formik>
        </Container>

    </div>
}

export default EditAdmin;