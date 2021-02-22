/** @jsxImportSource @emotion/react */
import React, {useEffect, useState, useContext} from 'react'
import TitleH1 from '../Components/TitleH1.jsx'
import AdminNavBar from '../Components/AdminNavBar.jsx'
import {Container, Button} from 'react-bootstrap';
import axios from 'axios'
import {css} from '@emotion/react';
import ProductComment from '../Components/ProductComment.jsx'
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";


function ProductComments () {

    const [data, setData] = useState({status: false})

    // Données pour la vérification du compte admin
    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    // recuperer le pathname
    let history = useHistory();
    const location = useLocation();

    useEffect(() => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`https://127.0.0.1:8000${location.pathname}`)
        .then(function (response){
            // handle success
            setData({status: true, comments : response.data})
            console.log(response.data);

        })
        .catch(function (error) {
            // handle error
            console.log(error); 
            history.push("/admin/home")

        })
    }, [location,token,history])

    const handleClick = () => {
        // supprimer le commentaire
        console.log("tu cliques la !!!")
    }

    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>
        <Container fluid>
            <TitleH1>Commentaires </TitleH1>
            {data.status === false ? <div>Chargement ...</div> : data.comments.map( comment => 
            <>
                <ProductComment
                    pseudo={comment.username} 
                    content={comment.content} 
                    note={comment.note} 
                    date={comment.date} 
                    title={comment.title}
                    button={<Button variant="danger" onClick={handleClick}>Supprimer</Button>}
                ></ProductComment>
                <div 
                    css={css`
                        height : 20px;
                    `}
                ></div>
            </>
            )}
        </Container> 
    </div>
}

export default ProductComments;