/** @jsxImportSource @emotion/react */
import React,{useState, useEffect} from 'react';
import {Form,Row,Col,Button,Alert} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import {css} from '@emotion/react';
import {Formik} from 'formik';

function EditProductForm ({dataProduct,submitForm}) {
    let yup = require('yup');

    // value wysiwyg tinymce react
    const [descriptionValue, setDescriptionValue] = useState(null);

     // valider ou pas le form
    const [validated, setValidated] = useState(true);

    const handleEditorChange = (content, editor) => {
            // controle du data
            let schemaDescription =  yup.string().min(3).max(5000).required();
 
            schemaDescription.validate(content)
            .then(function (valid) {
                setValidated(true)
                console.log(content)
                setDescriptionValue(content);
            })
            .catch(function (err) {
                setValidated(false)
                console.log(err.name); // => 'ValidationError'
            });
            console.log(validated)
            setDescriptionValue(content);
    }


    useEffect(() => {
        // valeur initiale de la description
        setDescriptionValue(dataProduct.description)
    }, [setDescriptionValue,dataProduct])


   
    
    let yupSchema = yup.object({
        // title: yup.string().max(255, `Votre nom de produit dépasse la limite de caractères.`),
        // category: yup.string(),
        // price: yup.number().positive(),
        // stock: yup.number().positive()
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
            image: null,
            price: parseInt(values.price),
            stock: parseInt(values.stock)
            })
        :
            console.log("erreur description")
    }}
    >
    {({ handleSubmit, handleChange, errors, touched, values }) => (
    <Form noValidate  onSubmit={handleSubmit}>

        {/* titre du produit */}
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

        {/* ajouter une image */}
        <Form.Group className="d-flex justify-content-center" controlId="image">
            <Form.File/>
        </Form.Group>
        
        {/* description du produit (WYSIWYG) */}
        <Editor
            apiKey="ryydk6te5fo3bx1ed2e0ecz8h338i23rnnyh24gf8izrwfd1"
            outputFormat='html'
            init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
            }}

            value={descriptionValue}
            onEditorChange={handleEditorChange}



        />
         {validated === false ? <Alert variant="danger"><Alert.Heading className="text-center">La description du produit n'est pas valide, le formulaire ne sera pas validé.</Alert.Heading></Alert> : null }

        {/* choisir la catégorie */}
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

        {/* prix */}
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

        {/* quantité */}
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
        >Modifier</Button>
    </Form>
)}
</Formik>
}
export default EditProductForm;