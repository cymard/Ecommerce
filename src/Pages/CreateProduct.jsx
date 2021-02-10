/** @jsxImportSource @emotion/react */
import React from 'react';
import {css} from '@emotion/react';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import TitleH1 from "../Components/TitleH1.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import CreateProductForm from '../Components/CreateProductForm.jsx';
import { useHistory } from "react-router-dom";

function CreateProduct(){
    let history = useHistory();
    // axios post 
    const submitForm = (data) => {
        axios.post('https://127.0.0.1:8000/admin/products', data)
            .then(function (response) {
            console.log(response);
            history.push("/admin/home?category=all&page=1&sort=default");
        })
            .catch(function (error) {
            console.log(error);
        });
    }
    

    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar></AdminNavBar>
        <Container fluid>
            <TitleH1>Création d'un produit </TitleH1>

            <CreateProductForm submitForm={submitForm}></CreateProductForm>
        </Container>

    </div>
}

export default CreateProduct;