/** @jsxImportSource @emotion/react */
import React,{useEffect, useState, useContext, useCallback} from 'react'
import {css} from '@emotion/react';
import {Container, Button, Spinner} from 'react-bootstrap'
import axios from 'axios';
import Title from "../../Components/All/Title.jsx";
import AdminNavBar from "../../Components/BackOffice/AdminNavBar.jsx";
import {UserAdminContext} from '../../Components/Context/UserAdminContext.jsx';
import ProductComment from '../../Components/FrontOffice/ProductComment.jsx'
import UserAlert from '../../Components/All/UserAlert.jsx';


function ReportedComments (){
   
    const [data, setData] = useState({status: false})

    const {token} = useContext(UserAdminContext);
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const [alertState, setAlertState] = useState({
        isOpen: false,
        text: undefined,
        variant: undefined
    })

    const closeAlert = useCallback(
        () => {
            setTimeout(()=>{
                setAlertState({
                    isOpen: false,
                    text: undefined,
                    variant: undefined
                });
            }, 3000)
        },[]
    )

    const getReportedComments = useCallback(() => {
        
        axios.get(`https://127.0.0.1:8000/admin/comments/reported`)
        .then(function (response) {
            setData({
                status: true,
                comments: response.data
            })
        })
        .catch(function (error) {
            console.log(error);
            setAlertState({
                isOpen: true,
                text: "  Une erreur est survenue lors de la récupèration des commentaires signalés.",
                variant: "danger"
            });
        })
    },[])

    useEffect(()=>{
        getReportedComments()
    },[getReportedComments])


    const handleDelete = useCallback(
        (e) => {
            axios.delete(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response) {
                getReportedComments()
                setAlertState({
                    isOpen: true,
                    text: "Suppression effectuée.",
                    variant: "success"
                });
                closeAlert();
            })
            .catch(function (error) {
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la suppression.",
                    variant: "danger"
                });
            })
        },[getReportedComments, closeAlert]
    )

    const handleIgnore =  useCallback(
        (e) => {
            axios.put(`https://127.0.0.1:8000/admin/comment/${e.target.id}`)
            .then(function (response) {
                getReportedComments()
                setAlertState({
                    isOpen: true,
                    text: "Signalement ignoré.",
                    variant: "success"
                });
                closeAlert();
            })
            .catch(function (error) {
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Impossible d'ignorer le signalement.",
                    variant: "danger"
                });
            })
        },[getReportedComments, closeAlert]
    )


    return <> 
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <div    
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
</>
}

export default ReportedComments