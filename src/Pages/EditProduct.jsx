/** @jsxImportSource @emotion/react */
import React,{useState, useContext, useEffect} from 'react';
import {css} from '@emotion/react';
import {useParams} from "react-router-dom";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import TitleH1 from "../Components/TitleH1.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import EditProductForm from '../Components/EditProductForm.jsx';
import { useHistory } from "react-router-dom";


function EditProduct () {
    let { id } = useParams();
    let history = useHistory();
    
    //data
    const [dataProduct, setDataProduct] = useState({}) 


    // Données pour la vérification du compte admin
    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    // pré remplir les champs du produit
    useEffect(() => {
        axios.get(`https://127.0.0.1:8000/product/${id}`)
        .then(function (response) {
            // handle success
            console.log(response);

            setDataProduct({
                name: response.data.product.name,
                description: response.data.product.description,
                category: response.data.product.category,
                image: response.data.product.image,
                price: response.data.product.price,
                stock:  response.data.product.stock
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [id,setDataProduct])



    // requête axios put
    const submitForm = async (data) => {

        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            // const response = await axios.put(`https://127.0.0.1:8000/admin/product/${id}/edit`, data);
            // console.log(response);
            axios.put(`https://127.0.0.1:8000/admin/product/${id}/edit`,data)
                .then(function(response){
                    console.log(response);
                    history.push("/admin/home?category=all&page=1&sorting=default");
                })
                .catch(function(error){
                    console.log(error);
                })
            // if(response.status === 201){
            //     history.push("/admin/home?category=all&page=1&sorting=default");
            // }
            
        } catch (err) {
            console.error(err.message);
        }
    };



    return <div     
    // min-height: calc(100vh - 64px);
    css={css`
        display: flex;
    `}
    >
        <AdminNavBar></AdminNavBar>
        <Container fluid>
            <TitleH1>Modification du produit {id}</TitleH1>
            <EditProductForm dataProduct={dataProduct} submitForm={submitForm}></EditProductForm>
        </Container>

    </div>
}

export default EditProduct;