/** @jsxImportSource @emotion/react */
import React,{useState, useContext, useEffect} from 'react';
import {css} from '@emotion/react';
import {useParams} from "react-router-dom";
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import TitleH1 from "../../Components/All/TitleH1.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import EditProductForm from '../../Components/BackOffice/EditProductForm.jsx';
import { useHistory } from "react-router-dom";


function EditProduct () {
    let { id } = useParams();
    let history = useHistory();
    
    const [dataProduct, setDataProduct] = useState({}) 

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    useEffect(() => {
        axios.get(`https://127.0.0.1:8000/product/${id}`)
        .then(function (response) {

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
            console.log(error);
        })
    }, [id,setDataProduct])



    const submitForm = async (data) => {

        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/admin/product/${id}/edit`,data)
                .then(function(response){
                    history.push("/admin/home?category=all&page=1&sorting=default");
                })
                .catch(function(error){
                    console.log(error);
                })
            
        } catch (err) {
            console.error(err.message);
        }
    };



    return <div     
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