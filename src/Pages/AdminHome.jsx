/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
import SortPriceButtons from '../Components/SortPriceButtons.jsx';
import ProductsListAdmin from '../Components/ProductsListAdmin.jsx';
import PaginationProductsAdmin from '../Components/PaginationProductsAdmin.jsx';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";


function AdminHome () {
    // envoie du data
    const [data, setData] = useState({status: false, productsList: [], filter: "all"});

    // selectionner ou pas le checkbox selectAll
    const [checkedSelectAll, setCheckedSelectAll] = useState();
    
    // tableau pour la suppression
    const [selectedProducts, setSelectedProducts] = useState([])

    // recuperer le pathname
    let history = useHistory();
    const location = useLocation();

    // Données pour la vérification du compte admin
    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    // changer

    useEffect(() => {
        // si les 9 sont selectionnés alors 
        setCheckedSelectAll(selectedProducts.length === 9);
    }, [selectedProducts])
    

    

    useEffect(() => {
        // vérification si ROLE_ADMIN

            if(location.pathname === "/admin/home" && location.search === "" ){ //redirection en cas de mauvaise url
                history.push('/admin/home?category=all&page=1&sorting=default')
            }else{

                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
                .then(function (response){
                    // handle success
                    setData({status: true, productsList: response.data.pageContent, filter: response.data.category, totalPageNumber: response.data.totalPageNumber,  allProductsNumber: response.data.allProductsNumber})
                    console.log(response.data);

                })
                .catch(function (error) {
                    // handle error
                    console.log(error); 
                    history.push("/admin/login")

                })
    
            }
        
        
    }, [history,location,token])

    const handleClickSelectAll = (e) => {
        if(e.target.checked === true){
            // si il y a deja des products selectionnés il faut les déselectionner
            // tous les products sont séléctionnés donc push tous les products
            setSelectedProducts(data.productsList.map(product => product.id));
            setCheckedSelectAll(true)


        }else{
            setSelectedProducts([]);
            setCheckedSelectAll(false)
            
        }
    }
    

    const handleRemove = () => {
        // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.delete(`https://127.0.0.1:8000/admin/product`,{
            headers:{'Authorization': `Bearer ${token}`},
            data:{data : selectedProducts}
        })
        .then(function (response){
            // handle success
            console.log(response.data);
            // déselectionner
            setSelectedProducts([])
            // redirection
            history.push(`${location.pathname}${location.search}`)
        })
        .catch(function (error) {
            // handle error
            console.log(error); 
        })
    }


    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>

        <Container fluid>
            <h1 className="text-center mt-4 mb-5">Administration</h1>

            <CategoryFilter></CategoryFilter>

            <Table className="text-center" hover>
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                type="checkbox"
                                id="selectAll"
                                onChange={handleClickSelectAll}
                                checked={checkedSelectAll || selectedProducts.length === 9}
                                label=""
                                custom
                            />        
                        </th>
                        <th>Nom du Produit</th>
                        <th>Stock</th>
                        <th>Catégorie</th>
                        <th>
                            <SortPriceButtons data={data} setData={setData}></SortPriceButtons>
                        </th>
                        <th>Commentaires</th>
                        <th>Modifier</th>
                    </tr>
                </thead>
                <tbody>
                    {data.productsList.length > 0 ?
                    
                    <ProductsListAdmin selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} data={data.productsList}></ProductsListAdmin>
                    :  <tr><th>Chargement ...</th></tr>
                    }
                </tbody>
            </Table>
            <Button 
                variant="danger"
                onClick={handleRemove}
            >Supprimer</Button>
            <PaginationProductsAdmin setData={setData}  data={data} ></PaginationProductsAdmin>
        </Container>
    </div>
   
}

export default AdminHome;