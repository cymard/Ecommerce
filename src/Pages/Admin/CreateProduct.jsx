/** @jsxImportSource @emotion/react */
import React,{useContext, useCallback, useState} from 'react';
import {css} from '@emotion/react';
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import Title from "../../Components/All/Title.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import CreateProductForm from '../../Components/BackOffice/CreateProductForm.jsx';
import { useHistory } from "react-router-dom";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import UserAlert from '../../Components/All/UserAlert.jsx';

function CreateProduct(){
    let history = useHistory();

    const {token} = useContext(UserAdminContext);

    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )

    const submitForm = useCallback(
        (data) => {
            axios.defaults.headers.common = {'Authorization' : `Bearer ${token}`}
            axios.post('https://protected-taiga-91617.herokuapp.com/admin/products', data)
            .then(function (response) {
                history.push("/admin/home?category=all&page=1&sorting=default");
                setAlertState({
                    isOpen: true,
                    text: "Données du produit envoyées.",
                    variant: "success"
                });
                closeAlert();
            })
            .catch(function (error) {
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de l'envoie des données du produit.",
                    variant: "danger"
                });
            });
        },
        [token, history, closeAlert]
    )
    

    return<> 
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <div     
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
    </>
}


export default CreateProduct;