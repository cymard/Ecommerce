/** @jsxImportSource @emotion/react */
import React,{useState, useEffect, useRef} from 'react';
import {Form,Row,Col,Card,Button,Overlay, Image} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import {css} from '@emotion/react';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import screen from '../../images/screen.jpg';

function EditProductForm ({dataProduct,submitForm}) {
    let yup = require('yup');
    // value wysiwyg tinymce react
    const [descriptionValue, setDescriptionValue] = useState(null);

    // valider ou pas le form
    const [validated, setValidated] = useState(true);

    const [show, setShow] = useState(false);
    const target = useRef(null);

    const handleEditorChange = (content, editor) => {
        let schemaDescription =  yup.string().min(3).max(5000).required();

        schemaDescription.validate(content)
        .then(function (valid) {
            setValidated(true)
            setDescriptionValue(content);
        })
        .catch(function (err) {
            // ValidationError
            setValidated(false)
            setShow(true)
        });
        setDescriptionValue(content);
    }


    useEffect(() => {
        setDescriptionValue(dataProduct.description)
    }, [setDescriptionValue,dataProduct])


   
    
    let yupSchema = yup.object({
        title: yup.string()
            .max(255, `Votre nom de produit dépasse la limite de caractères.`)
            .min(2, 'Pas assez de caractères')
            .max(255, 'Trop de caractères')
            .trim("Trop d'espaces inutiles")
            .required('Champs requis'),
        category: yup.string()
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
        enableReinitialize={true}

        initialValues= {{
            title: dataProduct.name ? dataProduct.name : "" ,
            category: dataProduct.category ? dataProduct.category : "",
            price: dataProduct.price ? dataProduct.price : "",
            stock: dataProduct.stock ? dataProduct.stock : ""
        }}

        validationSchema={yupSchema}

        onSubmit={(values)=>{
        validated ? 
            submitForm({
                name: values.title,
                description: descriptionValue,
                category: values.category,
                image: imageId.status ? imageId.data : null ,
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
                    placeholder="Nom"
    
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && errors.title}
                />
            </Col>
        </Form.Group>
        <Col className="d-flex justify-content-around p-4 align-items-center">
            <Image 
                css={css`
                        max-height: 100px;
                    `}
                src={dataProduct.image === null ? screen : dataProduct.image} 
                rounded 
            />

            <Form.Group  controlId="formulary">
                <Form.File 
                    onChange={handleImageChange}
                />
            </Form.Group>
        </Col>
        
        
        
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
                outputFormat='text'  //html ou text
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:''
                    // undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help
                }}

                value={descriptionValue}
                onEditorChange={handleEditorChange}

            />
        </Card>
        {validated === false ? 
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
            
        : null }
        <Form.Group as={Row} controlId="category" >
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

        <Form.Group as={Row} controlId="price">
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
            </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="stock">
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
            </Col>
        </Form.Group>

        <Button 
            css={css`
                width: 100%;
            `}
            type="submit"
        >
            Modifier
        </Button>
    </Form>
)}
</Formik>
}

EditProductForm.propTypes = {
    dataProduct : PropTypes.object.isRequired,
    submitForm : PropTypes.func.isRequired
}

export default EditProductForm;