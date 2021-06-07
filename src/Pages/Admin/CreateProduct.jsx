/** @jsxImportSource @emotion/react */
import React,{useContext, useCallback} from 'react';
import {css} from '@emotion/react';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import Title from "../../Components/All/Title.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import CreateProductForm from '../../Components/BackOffice/CreateProductForm.jsx';
import { useHistory } from "react-router-dom";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';

function CreateProduct(){
    let history = useHistory();

    const {token} = useContext(UserAdminContext);

    const submitForm = useCallback(
        (data) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.post('https://relaxed-sammet-0deed4.netlify.app/admin/products', data)
            .then(function (response) {
                history.push("/admin/home?category=all&page=1&sorting=default");
            })
            .catch(function (error) {
                console.warn(error);
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
            <Title>Création d'un produit</Title>
            <CreateProductForm submitForm={submitForm}></CreateProductForm>
        </Container>

    </div>
}

export default CreateProduct;