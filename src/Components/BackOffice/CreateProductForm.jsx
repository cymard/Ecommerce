/** @jsxImportSource @emotion/react */
import React,{useState,useRef} from 'react';
import {Form,Row,Col,Button,Card,Overlay} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import {css} from '@emotion/react';
import {Formik} from 'formik';
import PropTypes from 'prop-types';

function CreateProductForm ({submitForm}) {
    let yup = require('yup');

    // value wysiwyg tinymce react
    const [descriptionValue, setDescriptionValue] = useState(undefined);

    // valider ou pas le form
    const [validated, setValidated] = useState(null);

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleEditorChange = (content, editor) => {
        const schemaDescription =  yup.string().min(3).max(5000).required();
 
        schemaDescription.validate(content)
        .then(function (valid) {
            setValidated(true)
            setDescriptionValue(content);
        })
        .catch(function (err) {
            setValidated(false)
            setShow(true)
            console.log(err.name);
        });
        setDescriptionValue(content);
    }

    let yupSchema = yup.object({
        title: yup.string()
            .max(255, `Votre nom de produit dépasse la limite de caractères.`)
            .min(2, 'Pas assez de caractères')
            .max(255, 'Trop de caractères')
            .trim("Trop d'espaces inutiles")
            .required('Champs requis'),
        category: yup.string()
            .max(255, "Nombre de caractères trop important.")
            .required('Champs requis'),
        price: yup.string()
            .matches(/^\d+(.\d{1,2})?$/, "Le prix doit être sous la form pppp.pp")
            .trim("Trop d'espaces inutiles")
            .required('Champs requis'),
        stock: yup.number()
            .positive('Uniquement des nombres prositifs')
            .required('Champs requis')
    });


    const [imageId, setImageId] = useState({
        status: false
    })

    const handleImageChange= (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (e) => {
            const informationFile = e.target.result

            // on récupère uniquement la base64 de l'image
            const base64 = informationFile.split(',');
           
            setImageId({
                status: true,
                data: base64[1]
            })             

        }
    }

 
    return <Formik

        initialValues= {{
            title: "" ,
            category:  "sports/vetements",
            price:  "",
            stock: ""
        }}

        validationSchema={yupSchema}

        onSubmit={(values)=>{
        validated ? 
            submitForm({
                name: values.title,
                description: descriptionValue,
                category: values.category,
                image: imageId.status ? imageId.data : null,
                price: parseInt(values.price),
                stock: parseInt(values.stock)
            })

        :
            console.log("erreur description")
        }}
        
    >
    {({ handleSubmit, handleChange, errors, touched, values }) => (
    <Form noValidate  onSubmit={handleSubmit}>
        <Form.Group as={Row} >
            <Form.Label column sm={2}>Nom :</Form.Label>
            <Col sm={10}>
                <Form.Control 
                    id="title"
                    name="title"
                    onChange={handleChange}
                    value={values.title}
                    type="text"
                    placeholder="Nom "
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && errors.title}
                />
                {errors.title && touched.title ?  <Form.Control.Feedback type="invalid" tooltip>{errors.title}</Form.Control.Feedback> : null}
            </Col>
        </Form.Group>
        
                
        {/* ajouter une image */}
        <Form.Group className="d-flex justify-content-center" controlId="image">
            <Form.File
                onChange={handleImageChange}
            />
        </Form.Group>



        
        {/* description du produit (WYSIWYG) */}
        <Card 
            css={css`
                margin: auto;
                width: 90%;
            `}
            border={validated === false ? "danger" : "secondary" }
            ref={target}
        >
            <Editor
                apiKey="ryydk6te5fo3bx1ed2e0ecz8h338i23rnnyh24gf8izrwfd1"
                outputFormat='text'
                init={{
                    
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:''
                }}

                value={descriptionValue}
                onEditorChange={handleEditorChange}

            />
        </Card>

        {validated === false 
        ? 
        <Overlay target={target} show={show} placement="bottom-start">
            <div
                css={css`
                    background-color: #DF4857;
                    color: white;
                    padding: 5px 7px;
                    margin-top: 2px;
                    border-radius: 5px;
                `}
            >
                La description du produit n'est pas valide, le formulaire ne sera pas validé.
            </div>
        </Overlay>
        : 
        null }

        <Form.Group className="mt-5 mb-5" as={Row} controlId="category" >
            <Form.Label as="legend" column sm={2} value={values.category}>
                Catégories : 
            </Form.Label>
            <Col sm={10}>
                <Form.Check
                    custom
                    type="radio"
                    label="Sports/vêtements"
                    name="category"
                    id="sports/vetements"
                    value="sports/vetements"
                    onChange={handleChange}
                    checked={values.category === "sports/vetements"}
                />
                <Form.Check
                    custom
                    type="radio"
                    label="Maison"
                    name="category"
                    id="maison"
                    value="maison"
                    onChange={handleChange}
                    checked={values.category === "maison"}
                />
                <Form.Check
                    custom  
                    type="radio"
                    label="Livres"
                    name="category"
                    id="livres"
                    value="livres"
                    onChange={handleChange}
                    checked={values.category === "livres"}
                />
                <Form.Check
                    custom
                    type="radio"
                    label="Informatique/High-Tech"
                    name="category"
                    id="informatique/high-tech"
                    value="informatique/high-tech"
                    onChange={handleChange}
                    checked={values.category === "informatique/high-tech"}

                />
            </Col>
        </Form.Group>

        <Form.Group  as={Row} controlId="price">
            <Form.Label column sm={2}> Prix : </Form.Label>
            <Col sm={10}>
                <Form.Control 
                    name="price"
                    type="price" 
                    placeholder="price" 
                    onChange={handleChange}
                    value={values.price}

                    isValid={touched.price && !errors.price}
                    isInvalid={touched.price && errors.price}
                />
                {errors.price && touched.price ?  <Form.Control.Feedback type="invalid" tooltip>{errors.price}</Form.Control.Feedback> : null}
            </Col>
        </Form.Group>

        <Form.Group className="mb-5 mt-5"  as={Row} controlId="stock">
            <Form.Label column sm={2}> Stock :</Form.Label>
            <Col sm={10}>
                <Form.Control 
                    name="stock"
                    type="stock" 
                    placeholder="stock" 
                    onChange={handleChange}
                    value={values.stock}

                    isValid={touched.stock && !errors.stock}
                    isInvalid={touched.stock && errors.stock}
                />
                {errors.stock && touched.stock ?  <Form.Control.Feedback type="invalid" tooltip>{errors.stock}</Form.Control.Feedback> : null}
            </Col>
        </Form.Group>

        <Button 
            css={css`
                width: 100%;
                margin-bottom: 10px;
            `}
            type="submit"
        >
            Creer
        </Button>
    </Form>
)}
</Formik>
}

CreateProductForm.propTypes = {
    submitForm : PropTypes.func.isRequired
}
export default CreateProductForm;