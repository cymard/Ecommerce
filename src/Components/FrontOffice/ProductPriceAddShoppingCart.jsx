/** @jsxImportSource @emotion/react */
import React, {useContext, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import {UserContext} from '../Context/UserContext.jsx';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';
import {Link,useParams} from "react-router-dom";
import RedirectModal from '../All/RedirectModal.jsx';
import axios from 'axios';

function ProductPriceAddShoppingCart ({price, stock, setAlertState, closeAlert}){

    const informationUser = useContext(UserContext);
    const token = informationUser.token;

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
            axios.post(`https://relaxed-sammet-0deed4.netlify.app/api/cart/product/${id}`,{
                "quantity" : 1
            })
            .then(function (response) {
                // alert
                setAlertState({
                    isOpen: true,
                    text: "Produit ajouté au panier.",
                    variant: "success"
                })
                closeAlert()
            })
            .catch(function (error) {
                console.warn(error);
                // alert
                setAlertState({
                    isOpen: true,
                    text: "Une erreur est survenue lors de l'ajout du produit au panier.",
                    variant: "danger"
                })
                closeAlert()
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
        
                {informationUser.email === null && informationUser.token === null ?
                    <>
                        <Button
                            css={css`
                                color: white;
                            `}
                            onClick={displayModal}
                            
                        >
                            Ajouter au panier
                        </Button>
                    </>
                :
                    disabledAdd ? 
                        <Button
                            css={css`
                                color: white;
                            `}
                            onClick={handleClick}
                            disabled
                        >
                            Ajouter au panier
                        </Button>
                    :
                  
                        <Button
                            css={css`
                                color: white;
                            `}
                            onClick={handleClick}
                            >
                            Ajouter au panier
                        </Button>
                }
        </Card.Body>
    </Card>
</>
}

ProductPriceAddShoppingCart.propTypes = {
    price : PropTypes.number.isRequired,
    stock : PropTypes.number
}

export default ProductPriceAddShoppingCart;