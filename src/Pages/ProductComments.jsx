/** @jsxImportSource @emotion/react */
import React, {useEffect, useState, useContext, useCallback} from 'react'
import TitleH1 from '../Components/TitleH1.jsx'
import AdminNavBar from '../Components/AdminNavBar.jsx'
import {Container, Button} from 'react-bootstrap';
import axios from 'axios'
import {css} from '@emotion/react';
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import ProductComment from '../Components/ProductComment.jsx';
import {
    useLocation,
    useHistory
} from "react-router-dom";


function ProductComments () {

    const [data, setData] = useState({status: false})

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    let history = useHistory();
    const location = useLocation();

    const displayComments = useCallback(
        () => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.get(`https://127.0.0.1:8000${location.pathname}`)
            .then(function (response){
                setData({status: true, comments : response.data})
            })
            .catch(function (error) {
                console.log(error); 
                history.push("/admin/home")
            })
        },
        [token, location,history]
    )

    useEffect(() => {
        displayComments()
    }, [displayComments])


    const handleRemove = useCallback(
        (e) => {
            // supprimer le commentaire
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.delete(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response){
                displayComments()
            })
            .catch(function (error) {
                console.log(error); 
    
            });
        
        },
        [token, displayComments]
    )
    

    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>
        <Container fluid>
            <TitleH1>Commentaires</TitleH1>
            {data.status === false ? <div>Chargement ...</div> : data.comments.map( comment => 
                <ProductComment
                    key={comment.id}
                    pseudo={comment.username} 
                    content={comment.content} 
                    note={comment.note} 
                    date={comment.date} 
                    title={comment.title}
                    buttons={<Button className="w-100" id={comment.id} variant="danger" onClick={handleRemove}>Supprimer</Button>}
                ></ProductComment>
            )}
        </Container> 
    </div>
}

export default ProductComments;