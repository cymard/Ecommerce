/** @jsxImportSource @emotion/react */
import React,{useEffect,useState} from 'react'
import {css} from '@emotion/react';
import {Table, Container, Button} from 'react-bootstrap'
import axios from 'axios'
import {Link} from "react-router-dom";
import ModifiedLinksRouter from '../Components/ModifiedLinksRouter'

function AdminHome () {

    const [data, setData] = useState({status : false, data : null});

    useEffect(() => {
        axios.get('https://127.0.0.1:8000/products')
        .then(function (response) {
          // handle success
          setData({status : true, data : response.data})
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
        `}
    >
    <Container fluid>
    <h1 className="text-center mt-4 mb-5">Administration</h1>
    <Table className="mb-5 text-center" bordered hover>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Prix</th>
                <th>Commentaires</th>
                <th>Modifier</th>
                <th>Supprimer</th>
            </tr>
        </thead>
        <tbody>
     
            {data.status ? 
            data.data.map(product => 
            <tr>
                
                <td><ModifiedLinksRouter color="black" to={`/product/${product.id}`}>{product.name}</ModifiedLinksRouter></td>
                <td>{product.price}</td>
                <td><Link to="#"><Button variant="secondary">Commentaires</Button></Link></td>
                <td><Link to="#"><Button variant="primary">Modifier</Button></Link></td>
                <td><Link to="#"><Button variant="danger">Supprimer</Button></Link></td>
            </tr>
            )
            : 
            <div></div>
            }      
        </tbody>
  </Table>
  </Container>
  </div>
}

export default AdminHome;