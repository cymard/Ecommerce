/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react'
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
    const [selectedIdProduct, setSelectedIdProduct] = useState([])

    // recuperer le pathname
    let history = useHistory();
    const location = useLocation();

    // Données pour la vérification du compte admin
    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    // changer
    
    const callBackSetSelectedIdProduct = useCallback((array) => {
        selectedIdProduct.length === 9 ? setCheckedSelectAll(true) : setCheckedSelectAll(false)
        setSelectedIdProduct(array)
        console.log("leloool")
    },[selectedIdProduct])

    // si les 9 sont selectionnés alors 

    

    useEffect(() => {
        // vérification si ROLE_ADMIN

            if(location.pathname === "/admin/home" && location.search === "" ){ //redirection en cas de mauvaise url
                history.push('/admin/home?category=all&page=1&sort=default')
            }else{

                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
                .then(function (response){
                    // handle success
                    setData({status: true, productsList: response.data.pageContent, filter: response.data.category, totalPageNumber: response.data.totalPageNumber,  allProductsNumber: response.data.allProductsNumber})
                    console.log(response.data);

                    // selectedIdProduct.length === 9 ? setCheckedSelectAll(true) : setCheckedSelectAll(false)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error); 
                    history.push("/admin/login")

                })
    
            }
        
        
    }, [history,location,token,selectedIdProduct,setSelectedIdProduct])

    const handleClickSelectAll = (e) => {
        let arrayId = selectedIdProduct
        if(e.target.checked === true){
            setCheckedSelectAll(true)
            // si il y a deja des products selectionnés il faut les déselectionner
            arrayId = []
            
            // tous les products sont séléctionnés donc push tous les products
            data.productsList.map(product => arrayId.push(product.id.toString()))
            
            // setSelectedIdProduct(arrayId)

        }else{
            arrayId = []
            setCheckedSelectAll(true)
            
            // setSelectedIdProduct(arrayId)
        }
        setSelectedIdProduct(arrayId)
        console.log(arrayId)
    }
    

    const handleRemove = () => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        selectedIdProduct.array.map(id => 
            axios.delete(`https://127.0.0.1:8000/admin/product/${id}`)
            .then(function (response){
                // handle success
                console.log(response.data);
                history.push("/admin/home/all/1/default");
            })
            .catch(function (error) {
                // handle error
                console.log(error); 

            })
            // console.log("supprime " + id)
        )
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

            <Table className="mb-5 text-center" hover>
                <thead>
                    <tr>
                        <th>
                            <Form.Check
                                type="checkbox"
                                id="selectAll"
                                onClick={handleClickSelectAll}
                                checked={checkedSelectAll}
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
                        <th>Paramètres</th>
                    </tr>
                </thead>
                <tbody>
                    {data.productsList.length > 0 ?
                    
                    <ProductsListAdmin selectedIdProduct={selectedIdProduct} setSelectedIdProduct={callBackSetSelectedIdProduct} data={data.productsList}></ProductsListAdmin>
                    : <div> Chargement ...</div>
                    }
                </tbody>
                <Button 
                    variant="danger"
                    onClick={handleRemove}

                    css={css`
                        margin-top: 20px;
                    `}
                >Supprimer</Button>
            </Table>
            <PaginationProductsAdmin setData={setData}  data={data} ></PaginationProductsAdmin>
        </Container>
    </div>
   
}

export default AdminHome;