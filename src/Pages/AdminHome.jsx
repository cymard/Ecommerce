/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
import SortPriceButtons from '../Components/SortPriceButtons.jsx';
import ProductAdminHome from '../Components/ProductAdminHome.jsx';
import PaginationProductsAdmin from '../Components/PaginationProductsAdmin.jsx';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";


function AdminHome () {
    
    
    const [data, setData] = useState({status: false, data: null, filter: "all"});
    const [selectedIdProduct, setSelectedIdProduct] = useState({array : []})
    let history = useHistory();
    const location = useLocation();
    console.log(location.pathname)

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    useEffect(() => {
        // vérification si ROLE_ADMIN
       
            if(location.pathname === "/admin/home" && location.search === "" ){ //redirection en cas de mauvaise url
                // history.push({
                //     pathname: '/admin/home',
                //     search: '?category=all&page=1&sort=default'
                //   })

                history.push('/admin/home?category=all&page=1&sort=default')
            }else{
                // console.log("location :"+location.pathname+ " category : "+ query.get('category'))
                console.log(`https://127.0.0.1:8000${location.pathname}${location.search}`)
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.get(`https://127.0.0.1:8000${location.pathname}${location.search}`)
                .then(function (response){
                    // handle success
                    setData({status: true, data: response.data.pageContent, filter: response.data.category, totalPageNumber: response.data.totalPageNumber,  allProductsNumber: response.data.allProductsNumber})
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
            console.log("selectionner tous")
            // selectionne tous les id des products de la page
            console.log(data.data)
            let arrayId = []

            data.data.map(product => arrayId.push(product.id))
            
            setSelectedIdProduct({status: true, array: arrayId})
            // console.log(selectedIdProduct)

        }else{
            let arrayId = []
            setSelectedIdProduct({array: arrayId})
        }
        
    }
    

    const handleRemove = () => {
        console.log(selectedIdProduct)
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


    if(data.status === true){
        
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
                        <ProductAdminHome selectedIdProduct={selectedIdProduct} setSelectedIdProduct={setSelectedIdProduct} data={data} setData={setData}></ProductAdminHome>
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
    }else {
        return <div>Patientez...</div>
    }
}

export default AdminHome;