/** @jsxImportSource @emotion/react */
import React, {useContext, useState} from 'react';
import {Card, Button} from 'react-bootstrap';
import {UserContext} from './UserContext.jsx';
// import RedirectLoginRegister from './RedirectLoginRegister.jsx';
import {css} from '@emotion/react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import RedirectModal from './RedirectModal.jsx';

function ProductPriceAddShoppingCart ({price}){

    const informationUser = useContext(UserContext);


    // utiliser un usestate pour faire apparaite la div 
    // const [redirect, setRedirect] = useState();
    // const handleClickAddShoppingCart = () => {
    //     // console.log("clique")
    //     setRedirect(<RedirectLoginRegister>Pour ajouter le produit au panier, vous devez être connecté : </RedirectLoginRegister>)
    // }

    // utiliser la modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const displayModal = () => setShow(true)

    return <>
    <RedirectModal 
        show={show} 
        onHide={handleClose} 
        title="Action impossible"
        firstButton={<Link to="/Login"><Button variant="success">Connectez-vous à votre compte</Button></Link>}
        secondButton={<Link to="/Register"><Button variant="warning">Inscrivez-vous maintenant</Button></Link>}
    >Vous devez être connecté pour effectuer cette action.</RedirectModal>
    
    <Card className="mt-5 mb-5">
        <Card.Body className="d-flex justify-content-center flex-column">
            <Card.Title 
                css={css`
                    margin: auto;
                    margin-bottom: 0.75em
                `}
            >Prix : {price} €</Card.Title>
        
                {informationUser.email === null && informationUser.token === null ?
                    <>
                    {/* <Button
                        css={css`
                            color: white;
                        `}
                        onClick={handleClickAddShoppingCart}
                    >Ajouter au panier</Button> */}

                     <Button
                        css={css`
                            color: white;
                        `}
                        onClick={displayModal}
                    >Ajouter au panier</Button>
                    
                    
                    </>
                :
                
                    // <Card.Link href='#'
                    //     css={css`
                    //         color: white;
                    //     `}
                    // >Ajouter au panier</Card.Link>
                    <Button
                        css={css`
                            color: white;
                        `}
                        onClick={console.log("ajouter au panier")}
                    >Ajouter au panier</Button>
                }
        </Card.Body>
    </Card>
</>
}

ProductPriceAddShoppingCart.propTypes = {
    price : PropTypes.number
}

export default ProductPriceAddShoppingCart;