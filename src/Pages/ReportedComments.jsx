/** @jsxImportSource @emotion/react */
import React,{useEffect, useState, useContext, useCallback} from 'react'
import {css} from '@emotion/react';
import {Container, Button, Spinner} from 'react-bootstrap'
import axios from 'axios';
import TitleH1 from "../Components/TitleH1.jsx";
import AdminNavBar from "../Components/AdminNavBar.jsx";
import {UserAdminContext} from '../Components/UserAdminContext.jsx';
import ProductComment from '../Components/ProductComment.jsx'


function ReportedComments (){

    const [data, setData] = useState({status: false})

    const userAdminInformation = useContext(UserAdminContext);
    const token = userAdminInformation.token

    const displayReportedComments = useCallback(() => {
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`https://127.0.0.1:8000/admin/comments/reported`)
        .then(function (response) {
            setData({
                status: true,
                comments: response.data
            })
        })
        .catch(function (error) {
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
                displayReportedComments()
            })
            .catch(function (error) {
                console.log(error);
            })
        },[token,displayReportedComments]
    )

    const handleIgnore =  useCallback(
        (e) => {
            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.put(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response) {
                displayReportedComments()
            })
            .catch(function (error) {
                console.log(error);
            })
        },[displayReportedComments, token]
    )


    return <div    
        css={css`
            display: flex;
        `}
    >
        <AdminNavBar/>

        <Container fluid>
            <TitleH1>Commentaires Signalés</TitleH1>
            {data.status === true ? 
                data.comments.map(comment => <ProductComment key={comment.id} pseudo={comment.username} content={comment.content} note={comment.note} date={comment.date} title={comment.title}  buttons={<div><Button className="ml-2" variant="danger" id={comment.id} onClick={handleDelete}>Supprimer</Button> <Button id={comment.id} onClick={handleIgnore}>Ignorer</Button></div>}></ProductComment>)
            :
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
        </Container>
</div>
}

export default ReportedComments