/** @jsxImportSource @emotion/react */
import React,{useContext, useCallback} from 'react';
import {css} from '@emotion/react';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import TitleH1 from "../../Components/All/TitleH1.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import CreateProductForm from '../../Components/BackOffice/CreateProductForm.jsx';
import { useHistory } from "react-router-dom";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';

function CreateProduct(){
    let history = useHistory();

    const informationAdmin = useContext(UserAdminContext);
    const token = informationAdmin.token;

    const submitForm = useCallback(
        (data) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.post('https://127.0.0.1:8000/admin/products', data)
                .then(function (response) {
                history.push("/admin/home?category=all&page=1&sorting=default");
            })
                .catch(function (error) {
                console.log(error);
            });
        },
        [token, history]
    )
    

    return <div     
        css={css`
            display: flex;
        `}
    >
        <AdminNavBar></AdminNavBar>
        <Container fluid>
            <TitleH1>Création d'un produit</TitleH1>
            <CreateProductForm submitForm={submitForm}></CreateProductForm>
        </Container>

    </div>
}

export default CreateProduct;