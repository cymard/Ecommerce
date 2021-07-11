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
import UserAlert from '../../Components/All/UserAlert.jsx';


function ProductComments () {

    const [data, setData] = useState({status: false})
    let { id } = useParams();
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
    let history = useHistory();

    const getProductComments = useCallback(
        () => {
            axios.get(`https://protected-taiga-91617.herokuapp.com/admin/product/${id}/comments`)
            .then(function (response){
                setData({
                    status: true, 
                    comments : response.data
                })
            })
            .catch(function (error) {
                console.warn(error); 
                history.push("/admin/home")
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de la récupèration des commentaires du produit.",
                    variant: "danger"
                });
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
            axios.delete(`https://protected-taiga-91617.herokuapp.com/admin/comment/${e.target.id}`)
            .then(function (response){
                getProductComments()
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
                    text: "une erreur est survenu lors de la suppression de produit.",
                    variant: "danger"
                });
            });
        
        },
        [getProductComments, closeAlert]
    )
    

    return<> 
        <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>

    <div     
        css={css`
            min-height: calc(100vh - 64px);
            display: flex;
        `}
    >
        <AdminNavBar/>
        <Container fluid>
            <Title>Commentaires</Title>
            {data.status === false ? 
                <div>Chargement ...</div> 
            : 
                (data.comments.length >0 ?
                    data.comments.map( comment => 
                        <ProductComment
                            key={comment.id}
                            pseudo={comment.username} 
                            content={comment.content} 
                            note={comment.note} 
                            date={comment.date} 
                            title={comment.title}
                            buttons={<Button className="w-100" id={comment.id} variant="danger" onClick={handleRemove}>Supprimer</Button>}
                        ></ProductComment>
                    )
                :
                    <p className="text-center">Aucun commentaire pour ce produit.</p>
                )
            }

        </Container> 
    </div>
</>
}

export default ProductComments;