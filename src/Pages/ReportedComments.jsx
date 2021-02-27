/** @jsxImportSource @emotion/react */
import React,{useEffect,useState,useContext,useCallback} from 'react'
import {css} from '@emotion/react';
import {Container,Button} from 'react-bootstrap'
import axios from 'axios';
import TitleH1 from "../Components/TitleH1.jsx";
import AdminNavBar from "../Components/AdminNavBar.jsx";

import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import ProductCommentAdmin from '../Components/ProductCommentAdmin.jsx'


function ReportedComments (){

    const [data, setData] = useState({status: false})

    // Données pour la vérification du compte admin
    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    const displayReportedComments = useCallback(() => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`https://127.0.0.1:8000/admin/comments/reported`)
        .then(function (response) {
            // handle success

            setData({
                status: true,
                comments: response.data
            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    },[token])

    useEffect(()=>{
        displayReportedComments()
    },[displayReportedComments])


    const handleDelete = useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.delete(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response) {
                // handle success
                console.log(response)
                displayReportedComments()
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        },[token,displayReportedComments]
    )

    const handleIgnore =  useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response) {
                // handle success
                console.log(response)
                displayReportedComments()
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        },[displayReportedComments, token]
    )


    return <div     
    css={css`
        min-height: calc(100vh - 64px);
        display: flex;
    `}
    >
        <AdminNavBar/>

        <Container fluid>
            <TitleH1>Commentaires Signalés</TitleH1>
            {data.status === true ? 
                data.comments.map(comment => <ProductCommentAdmin key={comment.id} pseudo={comment.pseudo} content={comment.content} note={comment.note} date={comment.date} title={comment.title} ignoreButton={<Button id={comment.id} onClick={handleIgnore}>Ignorer</Button>} deleteButton={<Button className="ml-2" variant="danger" id={comment.id} onClick={handleDelete}>Supprimer</Button>}></ProductCommentAdmin>)
            :
                "chargement"
            }
        </Container>
</div>
}

export default ReportedComments