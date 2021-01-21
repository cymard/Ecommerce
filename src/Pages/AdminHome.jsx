/** @jsxImportSource @emotion/react */
import React,{useEffect,useState, useContext} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
import SortPriceButtons from '../Components/SortPriceButtons.jsx';
import ProductAdminHome from '../Components/ProductAdminHome.jsx';
import PaginationProducts from '../Components/PaginationProducts.jsx';
import {UserContext} from '../Components/UserContext.jsx';
import {useHistory} from "react-router-dom";


function AdminHome () {
    
    
    const [data, setData] = useState({status: false, data: null, filter: "all"});
    const userInformation = useContext(UserContext);
    let history = useHistory();
    useEffect(() => {
        
        // vérification si ROLE_ADMIN
        axios.post('https://127.0.0.1:8000/verification', {
            email: userInformation.email
        })
        .then(function (response) {
            if(response.data.role !== "ROLE_ADMIN"){
                history.push("/home");
            }else{

                axios.get('https://127.0.0.1:8000/products/all/1')
                .then(function (response){
                    // handle success
                    setData({status: true, data: response.data, filter: "all"})
                    console.log(response.data);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })

            }


        })
        .catch(function (error) {
            console.log(error);
        });


        
    }, [userInformation,history])
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

                <CategoryFilter setData={setData} data={data}></CategoryFilter>

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
                <PaginationProducts setData={setData} data={data} ></PaginationProducts>
            </Container>
        </div>
    }else {
        return <div>Patientez...</div>
    }
}

export default AdminHome;