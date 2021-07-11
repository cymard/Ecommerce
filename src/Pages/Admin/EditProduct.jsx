/** @jsxImportSource @emotion/react */
import React,{useState, useCallback, useContext, useEffect} from 'react';
import {css} from '@emotion/react';
import {useParams} from "react-router-dom";
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import Title from "../../Components/All/Title.jsx";
import {Container} from 'react-bootstrap';
import axios from 'axios';
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import EditProductForm from '../../Components/BackOffice/EditProductForm.jsx';
import { useHistory } from "react-router-dom";
import UserAlert from '../../Components/All/UserAlert.jsx';


function EditProduct () {
    let { id } = useParams();
    let history = useHistory();
    
    const [dataProduct, setDataProduct] = useState({}) 

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

    const getProductInformation = useCallback(
        () => {
            axios.get(`https://relaxed-sammet-0deed4.netlify.app/product/${id}`)
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
                    console.warn(error);
                    setAlertState({
                        isOpen: true,
                        text: "Une erreur est survenue lors de la récupération des informations du produit.",
                        variant: "danger"
                    });
                })
        },[id]
    )

    useEffect(() => {
        getProductInformation()
    }, [getProductInformation])



    const submitForm = async (data) => {

        try {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://relaxed-sammet-0deed4.netlify.app/admin/product/${id}/edit`,data)
                .then(function(response){
                    setAlertState({
                        isOpen: true,
                        text: "Formulaire envoyé.",
                        variant: "success"
                    });
                    closeAlert();
                    history.push("/admin/home?category=all&page=1&sorting=default");
                })
                .catch(function(error){
                    console.warn(error);
                    setAlertState({
                        isOpen: true,
                        text: "Une erreur est survenue lors de la soumission du formulaire.",
                        variant: "danger"
                    });
                })
        } catch (err) {
            console.error(err.message);
        }
    };



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
            <Title>Modification du produit {id}</Title>
            <EditProductForm dataProduct={dataProduct} submitForm={submitForm}></EditProductForm>
        </Container>

    </div>
    </>
}

export default EditProduct;