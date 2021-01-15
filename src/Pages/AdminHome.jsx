/** @jsxImportSource @emotion/react */
import React,{useEffect,useState} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Form, Button} from 'react-bootstrap'
import axios from 'axios';
import AdminNavBar from "../Components/AdminNavBar.jsx";
import CategoryFilter from '../Components/CategoryFilter.jsx';
import SortPriceButtons from '../Components/SortPriceButtons.jsx';
import ProductAdminHome from '../Components/ProductAdminHome.jsx';



function AdminHome () {
    
    const [data, setData] = useState({status : false, data : null, filter : null});

    // requête, pour récuperer l'ensemble des produits


    
    useEffect(() => {
        axios.get('https://127.0.0.1:8000/products')
        .then(function (response){
            // handle success
            setData({status : true, data : response.data, filter : response.data})
            console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }, [])


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
        </Container>
  </div>
}

export default AdminHome;