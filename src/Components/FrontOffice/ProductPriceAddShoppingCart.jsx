/** @jsxImportSource @emotion/react */
import React, {useContext, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import {UserContext} from '../Context/UserContext.jsx';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';
import {Link,useParams} from "react-router-dom";
import RedirectModal from '../All/RedirectModal.jsx';
import axios from 'axios';
import PriceAddShoppingCartButton from './PriceAddShoppingCartButton.jsx';

function ProductPriceAddShoppingCart ({price, stock, setAlertState, closeAlert}){

    const {token, email} = useContext(UserContext);
    const isUserDisconnected = email === null && token === null;

    let { id } = useParams();

    // utiliser la modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const displayModal = () => setShow(true)


    // cacher le bouton add lorsque qu'il n'y a plus d'exemplaire du produit
    const [disabledAdd, setDisabledAdd] = useState(false);
    const [clickCount, setClickCount] = useState(1);
    
    const ClickCounter = () => {
        setClickCount(prevCount => prevCount + 1);

        // Ne pas commander plus de fois que d'exemplaire en stock
        if( clickCount >= stock ){
            setDisabledAdd(true);
        }
    }

    const handleClick = () => {
            ClickCounter()

            axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
            axios.post(`https://127.0.0.1:8000/api/cart/product/${id}`,{
                "quantity" : 1
            })
            .then(function (response) {
                setAlertState({
                    isOpen: true,
                    text: "Produit ajouté au panier.",
                    variant: "success"
                })
            })
            .catch(function (error) {
                console.warn(error);
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de l'ajout du produit au panier.",
                    variant: "danger"
                })
            });

        }

    return <>
    <RedirectModal 
        show={show} 
        onHide={handleClose} 
        firstButton={<Link to="/Login"><Button variant="success">Connectez-vous à votre compte</Button></Link>}
        secondButton={<Link to="/Register"><Button variant="warning">Inscrivez-vous maintenant</Button></Link>}
    >
        Vous devez être connecté pour effectuer cette action.
    </RedirectModal>
    
    <Card className="mt-5 mb-5">
        <Card.Body className="d-flex justify-content-center flex-column">
            <Card.Title 
                css={css`
                    margin: auto;
                    margin-bottom: 0.75em
                `}
            >
                Prix : {price} €
            </Card.Title>
        
                {isUserDisconnected ?
                    <>
                        <PriceAddShoppingCartButton clickEffect={displayModal} isDisabled={false}/>
                    </>
                :
                    disabledAdd ? 
                        <PriceAddShoppingCartButton clickEffect={handleClick} isDisabled={true}/>
                    :
                  
                    <PriceAddShoppingCartButton  clickEffect={handleClick} isDisabled={false}/>

                }
        </Card.Body>
    </Card>
</>
}

ProductPriceAddShoppingCart.propTypes = {
    price : PropTypes.number.isRequired,
    stock : PropTypes.number,
    setAlertState : PropTypes.func,
    closeAlert : PropTypes.func
}


export default ProductPriceAddShoppingCart;