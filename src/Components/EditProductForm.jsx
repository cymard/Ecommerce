/** @jsxImportSource @emotion/react */
import React,{useState, useEffect} from 'react';
import {Form,Row,Col,Button} from 'react-bootstrap';
import { Editor } from '@tinymce/tinymce-react';
import {css} from '@emotion/react';
import { useFormik } from 'formik';

function EditProductForm ({dataProduct, setDataProduct,submitForm}) {


    // // value wysiwyg tinymce react
    const [descriptionValue, setDescriptionValue] = useState();

    const handleEditorChange = (content, editor) => {
        // controle
        setDescriptionValue(content);

    }

    const [data, setData] = useState({
        status: null,
        name: "",
        description:  "",
        category:  "",
        image:"",
        price:  "",
        stock:   ""
    })



    useEffect(() => {
        console.log(dataProduct.name)
        setData({
            status: 200,
            name: dataProduct.name,
            description:  dataProduct.description,
            category:  dataProduct.category,
            image: dataProduct.category,
            price:  dataProduct.price,
            stock:   dataProduct.stock 
        }) 

    }, [dataProduct])

    let yup = require('yup');

    let schema = yup.object({
        title: yup.string(),
        formHorizontalRadios: yup.string(),
        price: yup.number().positive(),
        stock: yup.number().positive()
    });



    const formik = useFormik({
        initialValues: {
            title: data.status === 200 ? data.name : data.name  ,
            formHorizontalRadios: data.category,
            price: data.price,
            stock: data.stock
        },
        validationSchema : schema,

        onSubmit: (values) => {
            console.log(values)
        }
    });

    return (
    <Form  onSubmit={formik.handleSubmit}>

        {/* titre du produit */}
        <Form.Group as={Row} >
            <Form.Label column sm={2}>
                Titre :
            </Form.Label>
            <Col sm={10}>
                <Form.Control 
                    id="title"
                    name="title"
                    // onChange={titleHandleChange}
                    // value={titleValue}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    type="titre" placeholder="titre" 
                    isValid={formik.touched.title && !formik.errors.title}
                    isInvalid={formik.touched.title && formik.errors.title}
                />
            </Col>
        </Form.Group>

        {/* ajouter une image */}
        <Form.Group className="d-flex justify-content-center" controlId="image">
            <Form.File id="exampleFormControlFile1" />
        </Form.Group>
        
        {/* description du produit (WYSIWYG)*/}
        <Editor
            apiKey="ryydk6te5fo3bx1ed2e0ecz8h338i23rnnyh24gf8izrwfd1"
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

            // value={formik.values.description}
            id="description"
            name="description"
        />

        {/* choisir la catégorie */}
        <Form.Group as={Row} controlId="category" 
        // onClick={HandleRadioClick} 
        >
            <Form.Label as="legend" column sm={2}
                value={formik.values.formHorizontalRadios}
                isValid={formik.touched.title && !formik.errors.formHorizontalRadios}
                isInvalid={formik.touched.title && formik.errors.formHorizontalRadios}
            >
                Catégories : 
            </Form.Label>
            <Col sm={10}>
                <Form.Check
                    custom
                    type="radio"
                    label="Sports/vêtements"
                    name="formHorizontalRadios"
                    id="sports/vetements"
                    value="sports/vetements"
                    onChange={formik.handleChange}
                    // checked={categoryName === "sports/vetements"}
                />
                <Form.Check
                    custom
                    type="radio"
                    label="Maison"
                    name="formHorizontalRadios"
                    id="maison"
                    value="maison"
                    onChange={formik.handleChange}
                    // checked={categoryName === "maison"}
                />
                <Form.Check
                    custom  
                    type="radio"
                    label="Livres"
                    name="formHorizontalRadios"
                    id="livres"
                    value="livres"
                    onChange={formik.handleChange}
                    // checked={categoryName === "livres"}
                />
                <Form.Check
                    custom
                    type="radio"
                    label="Informatique/High-Tech"
                    name="formHorizontalRadios"
                    id="informatique/high-tech"
                    value="informatique/high-tech"
                    onChange={formik.handleChange}
                    // checked={categoryName === "informatique/high-tech"}
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

                    name="price"
                    type="price" 
                    placeholder="price" 
                    onChange={formik.handleChange}
                    value={formik.values.price}
                    isValid={formik.touched.price && !formik.errors.price}
                    isInvalid={formik.touched.price && formik.errors.price}
                    // value={priceValue}
                    // onChange={priceHandleChange}
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
                    name="stock"
                    type="stock" 
                    placeholder="stock" 
                    onChange={formik.handleChange}
                    value={formik.values.stock}
                    isValid={formik.touched.stock && !formik.errors.stock}
                    isInvalid={formik.touched.stock && formik.errors.stock}
                    // value={stockValue}
                    // onChange={stockHandleChange}
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
)
}

export default EditProductForm;