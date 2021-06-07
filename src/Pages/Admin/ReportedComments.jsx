/** @jsxImportSource @emotion/react */
import React,{useEffect, useState, useContext, useCallback} from 'react'
import {css} from '@emotion/react';
import {Container, Button, Spinner} from 'react-bootstrap'
import axios from 'axios';
import Title from "../../Components/All/Title.jsx";
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import ProductComment from '../../Components/FrontOffice/ProductComment.jsx'


function ReportedComments (){
   
    const [data, setData] = useState({status: false})

    const {token} = useContext(UserAdminContext);
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const getReportedComments = useCallback(() => {
        
        axios.get(`https://relaxed-sammet-0deed4.netlify.app/admin/comments/reported`)
        .then(function (response) {
            setData({
                status: true,
                comments: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    },[])

    useEffect(()=>{
        getReportedComments()
    },[getReportedComments])


    const handleDelete = useCallback(
        (e) => {
            axios.delete(`https://relaxed-sammet-0deed4.netlify.app/admin/comment/${e.target.id}`)
            .then(function (response) {
                getReportedComments()
            })
            .catch(function (error) {
                console.warn(error);
            })
        },[getReportedComments]
    )

    const handleIgnore =  useCallback(
        (e) => {
            axios.put(`https://relaxed-sammet-0deed4.netlify.app/admin/comment/${e.target.id}`)
            .then(function (response) {
                getReportedComments()
            })
            .catch(function (error) {
                console.warn(error);
            })
        },[getReportedComments]
    )


    return <div    
        css={css`
            display: flex;
        `}
    >
        <AdminNavBar/>

        <Container fluid>
            <Title>Commentaires Signalés</Title>
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