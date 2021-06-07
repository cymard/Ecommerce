/** @jsxImportSource @emotion/react */
import React, {useEffect, useState, useContext, useCallback} from 'react'
import Title from '../../Components/All/Title.jsx'
import AdminNavBar from '../../Components/BackOffice/AdminNavBar.jsx'
import {Container, Button} from 'react-bootstrap';
import axios from 'axios'
import {css} from '@emotion/react';
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import ProductComment from '../../Components/FrontOffice/ProductComment.jsx';
import {
    useHistory,
    useParams
} from "react-router-dom";


function ProductComments () {

    const [data, setData] = useState({status: false})
    let { id } = useParams();
    const {token} = useContext(UserAdminContext);
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    let history = useHistory();

    const getProductComments = useCallback(
        () => {
            axios.get(`https://127.0.0.1:8000/admin/product/${id}/comments`)
            .then(function (response){
                setData({
                    status: true, 
                    comments : response.data
                })
            })
            .catch(function (error) {
                console.warn(error); 
                history.push("/admin/home")
            })
        },
        [history, id]
    )

    useEffect(() => {
        getProductComments()
    }, [getProductComments])


    const handleRemove = useCallback(
        (e) => {
            // supprimer le commentaire
            axios.delete(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response){
                getProductComments()
            })
            .catch(function (error) {
                console.warn(error); 
    
            });
        
        },
        [getProductComments]
    )
    

    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>
        <Container fluid>
            <Title>Commentaires</Title>
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