/** @jsxImportSource @emotion/react */
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Container, Button } from 'react-bootstrap';
import ProductComment from '../../Components/FrontOffice/ProductComment.jsx';
import axios from 'axios';
import { UserContext } from '../../Components/Context/UserContext.jsx';
import RedirectModal from '../../Components/All/RedirectModal.jsx';
import { Link, useParams } from "react-router-dom";
import { css } from '@emotion/react';
import ProductFormComment from '../../Components/FrontOffice/ProductFormComment.jsx';
import ProductInformations from "../../Components/FrontOffice/ProductInformations.jsx";
import UserAlert from "../../Components/All/UserAlert.jsx";

function Product() {

    const { token, email } = useContext(UserContext);
    const currentUserIsConnected = email !== null && token !== null;
    const [data, setData] = useState({ status: false })
    let { id } = useParams();

    // state pour la modal
    const [isOpen, setIsOpen] = useState(false);
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
    const handleClose = () => setIsOpen(false);
    const displayModal = () => setIsOpen(true)

    const getProduct = useCallback(
        () => {
            axios.get(`https://protected-taiga-91617.herokuapp.com/product/${id}`)
                .then(function (res) {
                    setData({
                        status: true,
                        product: res.data.product,
                        comments: res.data.comments,
                        averaging: res.data.arrayAveraging,
                        rateNumber: res.data.rateNumber,
                        stock: res.data.product.stock
                    })
                })
                .catch(function (error) {
                    console.warn(error)
                    setAlertState({
                        isOpen: true,
                        text: "Une erreur est survenue lors de la récuperation des informations du produit.",
                        variant: "danger"
                    });
                })
        },[id]
    )

    

    useEffect(() => {
        getProduct()
    }, [getProduct]);

    const handleReport = useCallback(
        (e) => {
            axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
            axios.put(`https://protected-taiga-91617.herokuapp.com/api/comment/${e.target.id}`)
                .then(() => {
                    setAlertState({
                        isOpen: true,
                        text: "Commentaire signalé.",
                        variant: "success"
                    });
                    closeAlert();
                    
                })
                .catch(function (error) {
                    console.warn(error);
                    setAlertState({
                        isOpen: true,
                        text: "Une erreur est survenue lors du signalement.",
                        variant: "danger"
                    });
                });
        },
        [token, closeAlert])

    return<>
    <UserAlert
        variant={alertState.variant}
        isOpen={alertState.isOpen}
    >
        {alertState.text}
    </UserAlert>
    <Container className="d-flex flex-column justify-content-around"
        css={css`
            min-height: 90vh;
        `}
    >

        <ProductInformations 
            content={"Description de l'objet"} 
            price={10} 
            name={"Nom de l'objet"} 
            data={data} 
            setAlertState={setAlertState}
            closeAlert={closeAlert}
        ></ProductInformations>

        {currentUserIsConnected &&
            <>
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <h2
                        css={css`
                            white-space: nowrap;
                        `}
                    > Ecrire un commentaire :</h2>
                </div>
                <ProductFormComment 
                    closeAlert={closeAlert}
                    setAlertState={setAlertState}
                    reFetch={getProduct}
                ></ProductFormComment>
            </>
        }


        <div className="d-flex justify-content-center mt-5 mb-5">
            <h2 className="text-center">Les commentaires postés : </h2>
        </div>

        <RedirectModal
            show={isOpen}
            onHide={handleClose}
            firstButton={<Link to="/Login"><Button variant="success">Connectez-vous à votre compte</Button></Link>}
            secondButton={<Link to="/Register"><Button variant="warning">Inscrivez-vous maintenant</Button></Link>}
        >
            Vous devez être connecté pour effectuer cette action.
        </RedirectModal>

        {data.status && data.comments.length > 0?
            data.comments.map(comment => <ProductComment key={comment.id} buttons={token != null ? <Button className="w-100" id={comment.id} variant="primary" onClick={handleReport}>Signaler</Button> : <Button className="w-100" variant="primary" onClick={displayModal}>Signaler</Button>} title={comment.title} pseudo={comment.username} content={comment.content} note={comment.note} date={comment.date}></ProductComment>)
            :
            <div className="text-center mb-4">Aucun commentaire posté.</div>
        }

    </Container>
    </>
}

export default Product;