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
    let history = useHistory();
    const location = useLocation();
    console.log(location.pathname)

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    useEffect(() => {
        // vérification si ROLE_ADMIN
        if(token === undefined){
            history.push("/login/admin")
        }else {
            if(location.pathname === "/admin/home"){
                history.push("/admin/home/all/1/default");
            }else{
                axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
                axios.get(`https://127.0.0.1:8000${location.pathname}`)
                .then(function (response){
                    // handle success
                    setData({status: true, data: response.data.pageContent, filter: response.data.category, totalPageNumber: response.data.totalPageNumber,  allProductsNumber: response.data.allProductsNumber})
                    console.log(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error); // erreur 401 unauthorized
                    console.log(token)
                    // history.push("/login/admin")
                    // history.push("/admin/home/all/1/default");
                })
    
            }
        }
        
    }, [history,location,token])


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
                        <ProductAdminHome data={data}></ProductAdminHome>
                    </tbody>
                    <Button variant="danger">Supprimer</Button>
                </Table>
                <PaginationProductsAdmin setData={setData} data={data} ></PaginationProductsAdmin>
            </Container>
        </div>
    }else {
        return <div>Patientez...</div>
    }
}

export default AdminHome;